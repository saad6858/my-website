'use client';

/**
 * Theme-aware brand mark.
 * Uses currentColor for the letterforms and var(--accent) for the underline
 * so every theme (and future themes) gets a coherent logo without forced colours.
 */
export function BrandLogo({
  className = 'brand-symbol',
  title = 'SM Automations'
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 58"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* S curve */}
      <path
        d="M31.8 8.3C26.6 3.5 17.6 4.1 12.9 8.9 7.7 14.2 11 20.2 19.7 23.4l11.2 4.1c9.2 3.4 10.7 9.4 5.5 15.1-5.6 6.1-15.8 6.1-22.5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* M */}
      <path
        d="M38.2 47.2V11.8l14.2 18.5L66 11.8v35.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Accent baseline — follows theme accent */}
      <path
        d="M5 54h62"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Back-compat alias used across the codebase */
export function Monogram(props: {className?: string}) {
  return <BrandLogo className={props.className || 'brand-symbol'} />;
}
