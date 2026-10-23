'use client';

/**
 * Official SM Automations mark — from the owner-supplied path-traced SVG.
 * Rendered via CSS mask so fill follows currentColor / theme tokens.
 */
export function BrandLogo({
  className = 'brand-symbol',
  title = 'SM Automations'
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`brand-logo ${className}`}
      role="img"
      aria-label={title}
      title={title}
    />
  );
}

/** Back-compat for existing imports */
export function Monogram(props: {className?: string}) {
  return <BrandLogo className={props.className || 'brand-symbol'} />;
}
