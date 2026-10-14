# Reference implementation reuse and attribution

Reference repository: https://github.com/Sushmitadasari/Portfolio_series

The requester reports that the repository creator gave permission to reuse code via an Instagram post/reel. That permission was not independently verified from the GitHub repository. The public repository currently has no `LICENSE` file, so retain this attribution and the requester's permission record alongside any redistribution.

## Actual source code blocks reused and adapted into this Next.js application

- `src/components/Rail.tsx` — the `RailButtons` implementation block for measuring horizontal scroll position, attaching a passive scroll listener, updating left/right affordances, and paging by `dir * el.clientWidth * 0.8`. That executable logic is carried into `components/portfolio/ProjectRailControls.tsx`; the target version adds `ResizeObserver`, Lucide icons, disabled states, and reduced-motion-aware scrolling.
- `src/components/ProjectModal.tsx` — the modal implementation blocks for `role="dialog"` / `aria-modal`, `layoutId` shared-element transitions, previous-focus capture/restoration, Escape-to-close, and locking background scroll. These blocks are reused and adapted in `components/portfolio/ProjectModal.tsx` for the existing `PortfolioItem` shape, Next Image, gallery/video/technology fields, and this app’s CSS variables. The target additionally traps Tab focus and respects reduced-motion preferences.
- `src/hooks/smoothScroll.tsx` — the reference's Lenis animation loop and reduced-motion gate were reviewed as the source for smooth-scroll behavior. This patch does not transplant the entire context/provider because the current app has its own layout/provider lifecycle; native scrolling remains available and the new rail uses reduced-motion-aware scrolling.
- `src/components/OpeningSequence.tsx` — the cinematic sequence's reduced-motion/skip affordances were reviewed as a reference. The existing app's own `CinematicOpening` is retained and selectively invoked for three of the new compositions rather than copying the reference author's profile content or portrait.

No biography, photographs, resume, portfolio records, personal contact details, branding, or project-specific copy from the reference repository are used. All reference-specific content remains excluded.

## Adaptation boundary

The reference project is a Vite/Tailwind portfolio; this target is a Next.js app with Firestore-backed content and admin tools. Code has therefore been adapted to existing types and component APIs rather than copied wholesale in incompatible files. Attribution is not a substitute for permission; keep the creator's permission message available with the project records.
