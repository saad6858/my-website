# Saad Maqbool — AI & Automation Website

A complete new Next.js App Router application for Saad Maqbool's personal AI automation portfolio. This source is intended to replace the abandoned application code in the target repository; it does not copy or depend on the old `my-website` codebase.

## Included

- Responsive, editorial dark / warm-light / balanced themes; theme preference persists locally and defaults to the configured theme or device preference.
- Skippable, brief cinematic intro with reduced-motion support; custom vector SM monogram and favicon.
- Editable homepage, about, services, projects/case studies, industry directory and child pages, insights/blog, FAQ, contact and privacy pages.
- Firebase email/password and Google sign-in on the admin dashboard; server-side APIs verify Firebase ID tokens and require the protected `admin: true` custom claim.
- Firestore-backed page/content CMS, custom page and niche creation by slug, typed section rendering, private drafts, private in-dashboard previews, explicit publish/unpublish, revision snapshots and one-step restore.
- Global settings for brand, theme, footer, SEO defaults, email, LinkedIn and WhatsApp links.
- Projects, services, industries, posts, FAQs, media metadata and lead pipeline (`New`, `Contacted`, `Qualified`, `Won`, `Lost`).
- Aggregate daily analytics and UTM campaign counters without visitor IDs or IP storage. Contact endpoint with validation, honeypot, hashed-IP rate limit and optional Resend email delivery. Contact submissions require Firebase Admin server configuration and are saved as leads.
- Signed Cloudinary upload flow and required alt-text metadata.
- Dynamic metadata, canonical URLs, Open Graph defaults, sitemap, robots, noindex admin route, secure response headers, Firestore rules and admin-claim provisioning scripts.

## Installation workflow — IMPORTANT

The GitHub Actions installer is intentionally **not inside this ZIP**. Download `install-complete-website.yml` as a separate file from the delivery. Upload the website ZIP to the repository root as `saad-maqbool-complete-website.zip`. Upload the workflow file to `.github/workflows/install-complete-website.yml`. Run it manually from **Actions → Install complete website → Run workflow**.

That one-time workflow validates the archive, removes the old tracked codebase, extracts this ZIP at repository root, deletes the uploaded ZIP and deletes its own workflow file, then commits and pushes the resulting complete source to the branch where you ran it. It does not run npm, run a build, access Vercel secrets or deploy directly. A push to the configured Vercel-connected branch will trigger Vercel's normal deployment behavior.

## Vercel / Firebase setup

Keep all credentials in Vercel environment variables, not GitHub Actions and not the ZIP. Copy the variable names from `.env.example` into the existing Vercel project as needed. Existing Firebase web config variables can be reused if their names match. The server requires either `FIREBASE_SERVICE_ACCOUNT_JSON` or `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` (and project ID). Preserve valid existing production credentials; do not paste private keys into GitHub.

1. In Firebase Authentication, enable the providers you actually use: Email/Password and Google.
2. Confirm the server service account belongs to the same Firebase project as the public web config.
3. Create/sign in to the trusted admin account. Obtain its Firebase Auth UID from Firebase Console.
4. In a trusted local environment with `firebase-admin` installed, set `FIREBASE_SERVICE_ACCOUNT_JSON` and run `node scripts/set-admin-claim.mjs YOUR_AUTH_UID`. Sign out and back in so the refreshed ID token contains the claim. Never commit the service account or claim-setting credentials.
5. Sign in at `/admin`, choose **Initialize content** once. It creates missing starter pages, project and FAQs without overwriting existing documents.
6. For contact storage and email delivery, configure Firebase Admin credentials and optionally `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Without Resend, leads are stored but email notifications are not sent.
7. For media uploads, configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Upload signatures are generated server-side.
8. Configure Firestore TTL for `rateLimits.expiresAt` if you want automatic cleanup of hashed rate-limit records. The rules file denies all direct browser Firestore access because this app reads/writes Firestore only through server-side routes.

## Content authoring

In `/admin`, use **Pages & sections** for ordinary pages and niche landing pages. For a niche page inside the industry directory, use a slug such as `industries/dental-clinics` or `industries/physiotherapy`. Published child pages appear automatically in the Industry Solutions directory. Edit the industry directory page's section cards too if you want to control the introduction and featured order. The JSON editor exposes all page fields and section blocks; **Preview privately** shows the current editor contents in the authenticated dashboard. Save changes first, then explicitly publish. Existing published pages save edits as draft changes until Publish is clicked. Revision history and Undo are available on records.

Supported section types: `hero`, `cards`, `featured`, `split`, `cta`, `prose`. Section objects use `id`, `type`, `visible`, `eyebrow`, `title`, `body`, `items`, `ctaLabel`, and `ctaHref` as applicable. Use plain text; arbitrary HTML and script execution are not supported.

## Environment and delivery

- Node.js 22 LTS recommended. Vercel should use a compatible Node runtime.
- The source archive deliberately excludes secrets, old-repository code, the one-time installer workflow, and raw reference material.
- The installer does not build or deploy. Vercel performs the deployment build when it receives the commit.
- This delivery was not built in a local environment, by design, and no claim of successful Vercel deployment is made. Let Vercel perform the first deployment build and address any deployment log errors before calling it live-ready.
- Review `docs/SECURITY-AND-OPERATIONS.md` and complete `docs/POST-LAUNCH-QA.md` after launch.
