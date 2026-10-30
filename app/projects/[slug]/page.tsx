import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {adminDb} from '@/lib/firebase-admin';
import {seedProjects} from '@/lib/content';
import Link from 'next/link';
import {Reveal, RevealItem} from '@/components/motion-system';
import {redirect} from 'next/navigation';
import {createHash} from 'node:crypto';
import {getPublishedPage} from '@/lib/public-data';
import {SectionRenderer} from '@/components/section-renderer';

async function getProject(slug: string) {
  let redirectTo: string | undefined;
  let hasConfiguredSettings = false;
  try {
    const db = adminDb();
    const s = await db.collection('projects').where('slug', '==', slug).limit(10).get();
    const d = s.docs.find((x) => x.get('status') === 'published');
    if (d) return {id: d.id, ...d.data()} as any;
    if (!s.empty) return undefined;
    const from = `projects/${slug}`;
    const key = createHash('sha256').update(from).digest('hex');
    const r = await db.collection('slugRedirects').doc(key).get();
    if (r.exists && r.get('status') === 'active') {
      redirectTo = '/' + String(r.get('to')).replace(/^\//, '');
    }
    const settings = await db.doc('siteSettings/global').get();
    hasConfiguredSettings = settings.exists;
  } catch {}
  if (redirectTo) redirect(redirectTo);
  if (hasConfiguredSettings) return undefined;
  return seedProjects.find((p) => p.slug === slug);
}

function isHttps(v: unknown): v is string {
  return typeof v === 'string' && v.startsWith('https://');
}

export async function generateMetadata({
  params
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const cms = await getPublishedPage(`projects/${slug}`);
  if (cms) {
    return {
      title: cms.seo?.title || cms.title,
      description: cms.seo?.description || cms.description
    };
  }
  const p = await getProject(slug);
  return p ? {title: p.title, description: p.summary} : {};
}

export default async function Project({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;

  // Prefer rich CMS page (gallery / video / sections) when published under projects/{slug}
  const cmsPage = await getPublishedPage(`projects/${slug}`);
  if (cmsPage && Array.isArray(cmsPage.sections) && cmsPage.sections.length > 0) {
    return (
      <main id="main">
        <SectionRenderer sections={cmsPage.sections} />
      </main>
    );
  }

  const p = await getProject(slug);
  if (!p) notFound();

  const thumb = isHttps(p.thumbnail) ? p.thumbnail : '';
  const thumbAlt =
    typeof p.thumbnailAlt === 'string' && p.thumbnailAlt.trim()
      ? p.thumbnailAlt
      : `${p.title} thumbnail`;

  const galleryRaw = Array.isArray(p.gallery)
    ? p.gallery
    : Array.isArray(p.galleryItems)
      ? p.galleryItems
      : [];
  const gallery = galleryRaw
    .map((g: any) => ({
      title: typeof g?.title === 'string' ? g.title : '',
      body: typeof g?.body === 'string' ? g.body : '',
      image: isHttps(g?.image) ? g.image : isHttps(g?.url) ? g.url : isHttps(g?.src) ? g.src : '',
      alt: typeof g?.alt === 'string' ? g.alt : typeof g?.title === 'string' ? g.title : 'Project media'
    }))
    .filter((g: any) => g.image);

  const videoUrl = isHttps(p.videoUrl) ? p.videoUrl : isHttps(p.video) ? p.video : '';
  const poster = isHttps(p.poster) ? p.poster : thumb;

  return (
    <main id="main">
      <Reveal>
        <header className="page-heading section-wrap" style={{paddingTop: 'clamp(48px,8vw,90px)'}}>
          <p className="eyebrow">PROJECT / CASE STUDY</p>
          <h1>{p.title}</h1>
          {p.summary && <p>{p.summary}</p>}
        </header>
      </Reveal>

      {thumb ? (
        <section className="cms-gallery-section section-wrap" style={{paddingTop: 24, borderTop: 'none'}}>
          <Reveal>
            <figure className="project-hero-media">
              <img src={thumb} alt={thumbAlt} loading="eager" decoding="async" />
            </figure>
          </Reveal>
        </section>
      ) : null}

      <section className="prose-section section-wrap">
        <Reveal>
          <h2>What it does</h2>
          <p>{p.body}</p>
        </Reveal>

        {typeof p.process === 'string' && p.process.trim() ? (
          <Reveal delay={0.06}>
            <h2>How it works</h2>
            <p>{p.process}</p>
          </Reveal>
        ) : null}

        {typeof p.outcome === 'string' && p.outcome.trim() ? (
          <Reveal delay={0.08}>
            <h2>What it demonstrates</h2>
            <p>{p.outcome}</p>
          </Reveal>
        ) : null}

        <Reveal delay={0.1}>
          <h2>Tools and approach</h2>
          <div className="card-grid">
            {(p.technologies || []).map((t: string, i: number) => (
              <article className="service-card" key={t} style={{animationDelay: `${i * 0.05}s`, minHeight: 120}}>
                <h3>{t}</h3>
              </article>
            ))}
          </div>
          <p className="form-note">
            This project was developed with AI-assisted tools as part of the learning and building process.
            Details describe the implementation; they are not claims of business outcomes.
          </p>
        </Reveal>
      </section>

      {gallery.length > 0 ? (
        <section className="cms-gallery-section section-wrap">
          <Reveal className="section-intro">
            <p className="eyebrow">SCREENS</p>
            <h2>Product views</h2>
          </Reveal>
          <div className="cms-gallery-grid">
            {gallery.map((g: any, i: number) => (
              <RevealItem key={`g-${i}`} index={i} className="cms-gallery-item">
                <figure>
                  <img src={g.image} alt={g.alt} loading="lazy" decoding="async" />
                  {(g.title || g.body) && (
                    <figcaption>
                      {g.title ? <strong>{g.title}</strong> : null}
                      {g.body ? <span>{g.body}</span> : null}
                    </figcaption>
                  )}
                </figure>
              </RevealItem>
            ))}
          </div>
        </section>
      ) : null}

      {videoUrl ? (
        <section className="cms-video-section section-wrap">
          <Reveal className="section-intro">
            <p className="eyebrow">WALKTHROUGH</p>
            <h2>See it in action</h2>
          </Reveal>
          <Reveal>
            <div className="cms-video-frame">
              <video src={videoUrl} controls playsInline preload="metadata" poster={poster || undefined} />
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="prose-section section-wrap" style={{paddingTop: 12}}>
        <Reveal>
          <div className="project-cta-row">
            {p.url ? (
              <a className="button button-primary" href={p.url} target="_blank" rel="noreferrer">
                View live project ↗
              </a>
            ) : null}
            <Link className="text-link" href="/projects">
              ← All projects
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
