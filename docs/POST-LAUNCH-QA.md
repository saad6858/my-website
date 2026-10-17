# Production QA — complete after the first successful Vercel deployment

Record PASS / FAIL / BLOCKED / NOT RUN with evidence; do not mark an item passed without testing it.

## Public journeys
- [ ] Test Home, About, Services, Projects, project detail, Industry directory, dental example, FAQ, Insights, Contact and Privacy.
- [ ] Test all three theme presets and saved preference, fresh session, device preference and reload.
- [ ] Test intro skip, reduced motion, keyboard use and mobile viewport.
- [ ] Create a new industry page in Admin with an `industries/example` slug, publish, verify public URL and directory listing, edit, unpublish and republish.
- [ ] Check all links, favicon, canonical metadata, social metadata, sitemap and robots.

## Admin and content
- [ ] Email/password sign-in and Google sign-in; non-admin authenticated user denied by every admin API.
- [ ] Initialize starter content; verify it does not overwrite existing records.
- [ ] Create/edit/preview/save draft/publish/unpublish/archive/delete/undo and check revision restore.
- [ ] Verify draft changes never appear publicly until Publish; inspect direct URLs and sitemap.
- [ ] Edit sections, copy, SEO fields, global brand/theme/footer/contact settings, FAQs, projects, posts and industry pages.
- [ ] Verify contact lead statuses, notes, follow-up date, email notification and error handling.
- [ ] Upload a media file with alt text, confirm Cloudinary URL and metadata; test invalid files and upload failure.

## Security and privacy
- [ ] Check anonymous API access, ordinary signed-in user access, admin access, expired/revoked token handling.
- [ ] Confirm no service account values appear in client bundles, source maps, Git history, Actions logs or public environment variables.
- [ ] Test rate limit, honeypot, malformed input, oversized input and mail provider failure.
- [ ] Confirm patient/health data warning and review privacy disclosure/retention process.
- [ ] Confirm `/admin` and `/api` are not indexed and drafts are excluded from sitemap/public routes.

## Accessibility, performance and reliability
- [ ] Keyboard-only navigation, visible focus, screen-reader names, field errors and status announcements.
- [ ] Contrast review against WCAG 2.2 AA, zoom/reflow, touch targets and reduced motion.
- [ ] Lighthouse/PageSpeed mobile and desktop; record actual scores and Core Web Vitals, do not guess.
- [ ] Test 320, 360, 390, 430, tablet and desktop widths; current Safari/Chrome/Firefox/Edge.
- [ ] Check browser console, server logs, API failures, 404s, broken images, rate-limit collection TTL and Firebase/Cloudinary outage behavior.
- [ ] Confirm Vercel rollback procedure and retain the ZIP/workflow locally as recovery artifacts.
