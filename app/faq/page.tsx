import type {Metadata} from 'next';
import {adminDb} from '@/lib/firebase-admin';
import {getPublishedPage} from '@/lib/public-data';
import {SectionRenderer} from '@/components/section-renderer';
import {Reveal} from '@/components/motion-system';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about AI assistants and automation.'
};

async function getFaqs() {
  try {
    const s = await adminDb().collection('faqs').where('status', '==', 'published').get();
    if (!s.empty) {
      return s.docs
        .map((d) => ({id: d.id, ...d.data()} as any))
        .sort((a: any, b: any) => (Number(a.order) || 0) - (Number(b.order) || 0));
    }
  } catch {}
  return [];
}

export default async function FAQ() {
  const [page, faqs] = await Promise.all([getPublishedPage('faq'), getFaqs()]);
  const sections = page?.sections || [];

  // If the CMS page already has a FAQ section, do NOT append collection/fallback FAQs
  // (that was putting the CTA in the middle of two FAQ lists).
  const cmsHasFaq = sections.some((s: any) => s && s.type === 'faq' && s.visible !== false);

  return (
    <main id="main">
      <SectionRenderer sections={sections} />
      {!cmsHasFaq && faqs.length > 0 ? (
        <section className="cms-faq-section section-wrap">
          <Reveal className="section-intro">
            <p className="eyebrow">COMMON QUESTIONS</p>
            <h2>More answers</h2>
          </Reveal>
          <div className="cms-faq-list">
            {faqs.map((f: any, i: number) => (
              <Reveal key={f.id || i} delay={Math.min(i * 0.04, 0.24)}>
                <details>
                  <summary>{f.question || f.title}</summary>
                  <p>{f.answer || f.body}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
