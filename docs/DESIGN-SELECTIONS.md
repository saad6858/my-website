# SM Automations — Approved Design Decisions

Recorded 2026-10-18. Current brand: **SM Automations**. Production domain: `smautomations.tech`.

## Selected concepts
From the latest board the owner selected website designs **1, 2, 3, 5, 8, 10**, and logo direction **5**. These refer to the latest 10-design board and do not share numbering with the older 15-design board.

1. Cinema Series — cinematic hero storytelling.
2. Split-Screen Hero — strong split image/content composition.
3. Horizontal Showcase — immersive horizontal project rails.
5. Modern Minimal — strong negative space and clean information hierarchy.
8. Monochrome — tonal contrast and controlled ornament.
10. Eclipse Violet — restrained violet dimensional detail.

Integrate them as one cohesive design system, not six separate visual skins. Base is cinematic obsidian/near-black with monochrome structure, a restrained signal-red accent, selective violet/ice-blue light, editorial typography and purposeful negative space. A secondary Warm Editorial theme is allowed, but it shares the same design tokens and components.

Logo selection 5 is only a starting reference: the owner expressly said none of the generated marks was fully satisfactory. Refine the SVG from custom vector geometry and optical spacing later. Do not run image generation again; the owner said the image quota was reached.

## Motion / UX
Motion is a core design requirement. Public pages and CMS-created pages must share route transitions, page/section reveals, staggered cards, moving hero artwork, hover affordances, horizontal project rails, and animated process/timeline/media blocks. Respect `prefers-reduced-motion`, keyboard access and mobile behavior. Avoid generic stock-template layouts, meaningless particle effects, noisy motion, scroll hijacking, fake stats, fabricated testimonials, or claims unsupported by the owner's actual projects.

## Theme control
Only the owner controls the active theme in Admin. Visitors must not have a dark/light switch or persisted personal theme preference. Exactly two options are supported in the new design: `dark` (Cinematic Obsidian; default) and `light` (Warm Editorial). The light mode must not be pure-white e-commerce/catalogue styling.

## Backend and upload boundary
Preserve existing Firebase/Auth/Firestore APIs, published content and revisions, contacts/leads, analytics and Cloudinary. Frontend redesign may consume existing contracts; avoid a backend rewrite. The admin uploader must cap videos at **95,000,000 bytes (95 decimal MB)** and images at **15,000,000 bytes**, with progress and clear errors. The standard Cloudinary single-request upload ceiling is 100 MB, but lower account restrictions still apply. See `VIDEO-UPLOAD-LIMITS.md`.

## Domain
Use `https://smautomations.tech` for canonical URLs after the owner points the purchased get.tech domain to Vercel and verifies it. Do not guess DNS record targets; use the current values Vercel displays. See `DOMAIN-SETUP.md`.

## Current implementation source of truth
Read `FRONTEND-REDESIGN.md`, `NEXT-SESSION-HANDOFF.md` if present, and `PREDEPLOYMENT-CHECK-REPORT.md` before further changes. Preserve the exact original uploaded ZIP and installer in `reference/source-materials`. The deployable website ZIP and one-time installer remain separate artifacts.
