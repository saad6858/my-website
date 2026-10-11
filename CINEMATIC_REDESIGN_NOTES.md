# Cinematic redesign implementation notes

Reference inspected: https://github.com/Sushmitadasari/Portfolio_series (public `main` tree, README, package manifest, app entry, CSS, opening sequence, hero, smooth-scroll hook, custom cursor, project rail/cards/modal, and animation utilities).

The source uses React 18, Vite 6, Tailwind CSS 4, Framer Motion 11.18.2, and Lenis 1.1.20. This site uses Next.js 16 / React 19 / Tailwind 3, so the reference's Vite config, Tailwind v4 CSS entry, routes, source data, and React app root must not be transplanted. The adaptation reuses the design mechanics, not its personal assets or personal facts.

The video demonstrates a cinematic dark portfolio with bold title treatment, layered atmospheric lighting, a profile/series presentation, horizontal project storytelling, dense-but-structured resume/skill sections, and a strong closing CTA. This patch adds a skippable branded intro, independent theme/layout controls, Lenis scroll, a safer cursor, and visual-system foundations. It is a foundation pass; it does not claim every section is already a pixel-perfect port of the reference.
