import Link from 'next/link';
import {BrandLogo} from './brand-logo';

type FooterLink = {label: string; href: string};

const fallback: FooterLink[] = [
  {label: 'Services', href: '/services'},
  {label: 'Projects', href: '/projects'},
  {label: 'Industries', href: '/industries'},
  {label: 'Contact', href: '/contact'},
  {label: 'Privacy', href: '/privacy'}
];

function parseLinks(raw?: string): FooterLink[] {
  try {
    const x = JSON.parse(raw || '');
    if (Array.isArray(x)) {
      const valid = x
        .filter(
          (i: any) =>
            i &&
            typeof i.label === 'string' &&
            typeof i.href === 'string' &&
            i.href.startsWith('/') &&
            !i.href.startsWith('//')
        )
        .slice(0, 12)
        .map((i: any) => ({
          label: i.label.slice(0, 40),
          href: i.href.slice(0, 120)
        }));
      if (valid.length) return valid;
    }
  } catch {}
  return fallback;
}

export function SiteFooter({
  brandName = 'SM Automations',
  email = '',
  footerText = 'Automation with intention. Built around your real workflow.',
  whatsappNumber = '',
  whatsappMessage = 'Hi Saad, I would like to discuss an AI automation idea.',
  footerLinksJson = ''
}: {
  brandName?: string;
  email?: string;
  footerText?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
  footerLinksJson?: string;
}) {
  const links = parseLinks(footerLinksJson);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <Link className="brand footer-brand" href="/">
            <BrandLogo className="brand-symbol" />
            <span className="footer-brand-text">
              <strong>{brandName}</strong>
              <small>Intelligent systems / Automation</small>
            </span>
          </Link>
          <p className="footer-tagline">{footerText}</p>
        </div>

        <div className="footer-nav-col">
          <p className="footer-col-label">Explore</p>
          <div className="footer-links">
            {links.map((x) => (
              <Link key={`${x.label}-${x.href}`} href={x.href}>
                {x.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-contact-col">
          <p className="footer-col-label">Connect</p>
          <div className="footer-links">
            {email && <a href={`mailto:${email}`}>{email}</a>}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp ↗
              </a>
            )}
            <Link href="/contact">Start a conversation ↗</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} {brandName}. Built with care.</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}
