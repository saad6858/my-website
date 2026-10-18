# Frontend redesign audit notes

## User-approved direction
- Brand: SM Automations; canonical domain default: `https://smautomations.tech`.
- Use a cohesive synthesis of selected visual directions 1, 2, 3, 5, 8 and 10 from the latest design board, with logo study 5 as a vector-redraw reference.
- The previous personal-brand site remains abandoned; this iteration updates the existing generated codebase's frontend and retains its backend/API behavior.
- The visitor cannot select a theme. The site administrator selects one global palette in Site-wide settings.
- Every public page and CMS-created page uses the shared section renderer, responsive tokens and motion system.
- Video uploads are limited to 95,000,000 bytes (95 decimal MB), intentionally below Cloudinary's 100,000,000-byte standard-upload threshold. Images are limited to 15,000,000 bytes.

## Supplied PageSpeed baseline (15 October 2026)
These are measurements of the previous live version, not the redesigned code and not a prediction of new scores.

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance score | 72 | 94 |
| Accessibility | 100 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.9 s | 0.3 s |
| Largest Contentful Paint | 5.7 s | 0.9 s |
| Total Blocking Time | 200 ms | 60 ms |
| Cumulative Layout Shift | 0.006 | 0.106 |
| Speed Index | 5.2 s | 1.5 s |

Mobile report called out render-blocking requests, unused JavaScript/CSS, long main-thread tasks and 22 non-composited animated elements. Desktop report called out CLS 0.106, unused JavaScript/CSS and 41 non-composited animated elements. The redesigned stylesheet therefore prefers transform/opacity for motion, uses IntersectionObserver reveals, provides reduced-motion behavior, avoids large hero image downloads and uses `next/font` for build-time font optimization. Actual post-deployment PageSpeed scores remain unverified.

## Current verification status
- TypeScript/TSX parser pass: all source files parsed with TypeScript `transpileModule` and no syntax diagnostics.
- CSS parser pass in authoring environment: PostCSS parsed the full stylesheet successfully.
- Media boundary tests: 3/3 passed for 95,000,000-byte video limit, 15,000,000-byte image limit, unsupported MIME types and invalid sizes.
- JSON config parse: package.json, firebase.json and tsconfig.json parse.
- Full TypeScript typecheck: blocked because dependencies are not installed and the authoring environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`). It must be run after dependencies install.
- Next.js build and deployment: intentionally not run, per owner instruction.
- Browser/device QA and new PageSpeed run: not run in this environment.

## Source scope guardrail
The current generated codebase ZIP was extracted and modified in a separate working directory. The abandoned `my-website.zip` repository archive inside `allfiles.zip` was not extracted or read. The previous redesign archive is preserved but was not used to replace the current backend.
