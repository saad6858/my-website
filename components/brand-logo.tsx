'use client';

/**
 * Official SM Automations mark — multi-color SVG (cream + red on dark).
 * Loaded as <img> so fills stay exact (not CSS-masked to one color).
 */
export function BrandLogo({
  className = 'brand-symbol',
  title = 'SM Automations'
}: {
  className?: string;
  title?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand-logo.svg"
      alt={title}
      title={title}
      className={`brand-logo ${className}`}
      width={1536}
      height={1536}
      draggable={false}
      decoding="async"
    />
  );
}

/** Back-compat for existing imports */
export function Monogram(props: {className?: string}) {
  return <BrandLogo className={props.className || 'brand-symbol'} />;
}
