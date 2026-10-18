# SM Automations — Frontend Redesign Record

Recorded: 2026-10-18

## Approved art direction

Integrate these six numbered concepts from the latest concept board: **1 Cinema Series, 2 Split-Screen Hero, 3 Horizontal Showcase, 5 Modern Minimal, 8 Monochrome, and 10 Eclipse Violet**. The older uploaded 15-design board has a separate numbering scheme; its liked references were 1, 5, 9, 10. Do not mix the two numbering schemes.

One coherent system, not six independent skins:
- Monochrome near-black base, cinematic red as the principal signal accent, carefully limited violet and ice-blue dimensional light.
- High-contrast editorial typography and restrained technical mono labels.
- Split hero with a purpose-built animated system diagram.
- Horizontal project showcase with accessible previous/next controls and native touch/trackpad scrolling.
- Modern-minimal navigation and strong whitespace to retain usability.
- Story-like process/timeline blocks and detailed project pages.
- Warm light alternative using stone/ivory surfaces and dark ink, not pure-white ecommerce/catalogue styling.

The initial selected identity is logo reference 5, a luxury lettermark. The owner said none of the logo studies was excellent; number 5 is only a starting reference and must be refined as a custom vector, not treated as final artwork. No further image generation is permitted.

## Only two owner-controlled theme options

- `dark` — Cinematic Obsidian, the default: near-black, monochrome, cinema red, restrained violet/blue light.
- `light` — Warm Editorial: warm stone/ivory, dark ink, muted red and violet details, nuanced layered surfaces.

The public site contains no theme chooser. Admin chooses the global `siteSettings/global.themeDefault`; public requests receive the selected theme. A visitor preference is not persisted. CMS-created pages inherit the selected global theme automatically.

## Motion requirements and current implementation

Shared primitives are located in `components/motion-system.tsx`: route transitions, scroll progress, reveal wrappers, staggered reveal items, and word-level heading reveals. `components/automation-art.tsx` provides a custom animated automation-system diagram. `components/section-renderer.tsx` applies the common motion language to hero, cards, featured/horizontal showcase, split, CTA, prose, process/steps, timeline, stats, FAQ, gallery/media, and video section types. Thus pages created by the CMS use the same renderer and are not a static, separately styled experience.

CSS supports the shared design language in `app/globals.css`, including responsive layouts, animated surfaces, hover states, the mobile navigation, and reduced-motion preferences. The `motion/react` package is added while preserving the existing app's backend dependencies. Motion's official Next.js guide describes App Router compatibility and imports from `motion/react`: https://motion.dev/docs/react-installation.

Accessibility/performance principles: reduced-motion support, no mandatory scroll hijacking, touch-compatible horizontal rails, visible keyboard focus, semantic links/buttons, and restrained continuously running effects. Verify the deployed experience on real desktop/mobile browsers after Vercel's build.

## Backend preservation boundary

The existing Firebase Admin/Auth APIs, Firestore collection contracts, content publishing/revisions, lead storage, analytics and Cloudinary integrations are retained. This update concentrates on presentation and the shared renderer. Small changes in the settings theme validation and media metadata/signature payload are limited to two valid theme options and upload-limit communication; no wholesale backend rewrite or data migration is introduced.

## Video upload size

- Frontend video limit: **95,000,000 bytes (95 MB decimal)**.
- Image limit remains: **15,000,000 bytes (15 MB decimal)**.
- Video MIME types: MP4, WebM, MOV/QuickTime.
- Image MIME types: JPEG, PNG, WebP, AVIF.
- Admin media UI checks type/size before upload, shows progress, sends the signed upload directly to Cloudinary, and records media metadata including resource type, duration and original filename.
- A single-request ceiling of 100,000,000 bytes is documented by Cloudinary; account-plan limits and upload presets can impose a lower limit. Therefore, 95 MB is the application-side limit but cannot override a stricter Cloudinary account restriction. See https://cloudinary.com/documentation/upload_images.

## Canonical domain

The desired production origin is `https://smautomations.tech`. Admin defaults, server-side SEO metadata, robots and sitemap use this canonical origin unless the owner sets a different valid URL. Refer to `docs/DOMAIN-SETUP.md` for the registrar/Vercel steps. DNS values must be copied from the current Vercel domain screen, never guessed.

## Static verification boundary

Per the owner's explicit instruction, do not run the framework build or dependency install in the local environment. Prepare a careful source archive and let Vercel run the build after the upload workflow commits it. Clearly distinguish any source-level checks from a successful production deployment.
