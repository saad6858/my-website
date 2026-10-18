# Next-session handoff — SM Automations

- Read `DESIGN-SELECTIONS.md` and `FRONTEND-REDESIGN.md` before changing visuals. Website concepts selected: **1, 2, 3, 5, 8, 10**. Logo reference selected: **5**, not final; refine a bespoke SVG later. No further image generation.
- Brand: **SM Automations**. Desired canonical domain: `https://smautomations.tech`.
- Frontend work combines cinematic hero, split-screen, horizontal case-study rail, minimal navigation, monochrome layers and controlled violet accents. Motion is core, accessible and shared across all CMS-generated pages.
- Only owner-controlled admin theme options: dark Cinematic Obsidian and warm-light Editorial. No visitor-facing theme switch.
- Preserve Firebase Auth/Firestore, admin, lead/contact, analytics, revisions and Cloudinary backends. Do not regenerate backend from scratch.
- Video upload cap is 95,000,000 bytes, images 15,000,000 bytes. See `VIDEO-UPLOAD-LIMITS.md`.
- `PREDEPLOYMENT-CHECK-REPORT.md` contains exact checks and limitations. Full project typecheck and lint remain unverified because npm dependency installation timed out in the sandbox. Never describe them as passed. Do not run `next build` in the sandbox; Vercel handles deployment when the owner is ready.
- The pristine uploaded ZIP is preserved under `reference/source-materials/saad-maqbool-complete-website-original-upload.zip`. The installer workflow is separately preserved under `reference/source-materials/install-complete-website.yml`.
