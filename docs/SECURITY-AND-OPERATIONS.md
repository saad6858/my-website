# Security, operations and known boundaries

## Authentication and authorization

The admin browser signs in through Firebase Auth. Every protected API verifies the ID token with revocation checking and requires the server-managed `admin: true` custom claim. A user-controlled Firestore field is never used as an authorization source. The app uses Firebase Admin SDK on the server; `firestore.rules` denies direct client database reads/writes. If other apps share this Firebase database, review the rule impact before applying the included rules to the project.

Provision the claim only for the single trusted admin. Store service-account credentials only in trusted environments / Vercel environment variables. Never expose them in `NEXT_PUBLIC_*`, commit them, or put them in GitHub Actions. Remove the claim with `scripts/remove-admin-claim.mjs` if access must be revoked.

## Content safety

- Only `published` page/project/service/post/FAQ/industry records are returned to public views.
- Published page edits are staged as draft changes and do not replace the public fields until Publish is used.
- Admin-only APIs and dashboard are noindex; robots rules disallow `/admin` and `/api/`.
- Slugs are validated and duplicate checks run before creation. Concurrent duplicate creation remains a low-probability race; if multiple administrators are ever enabled, replace the current check with a transactional slug registry before scaling authoring concurrency.
- Page section rendering is allowlisted and does not interpret stored HTML or JavaScript.
- Revisions store prior content to enable recovery. Treat revision data as private content and include it in your backup/retention plan.

## Contact and data

The public contact endpoint validates fields, rejects a hidden honeypot, hashes the source address for a five-per-hour rate limit and stores enquiries as leads. The hash is not a visitor analytics identifier, but its cleanup should be configured with Firestore TTL. Resend email delivery is optional and only activates when all three mail environment variables are present. A failed email delivery does not discard the saved lead. The form explicitly warns against sending patient/health data or credentials.

The privacy page is an implementation-level summary, not legal advice. Confirm actual provider configuration, data location, retention/deletion process and applicable legal obligations before production use.

## Cloudinary

The browser asks a server route for a short-lived upload signature. Only authenticated admins can request signatures. The media form requires alt text and stores media metadata after successful upload. Configure Cloudinary upload size/type limits in the account as well; the client-side accept list is not a security boundary. Never allow public arbitrary uploads.

## SEO, performance and accessibility

- Dynamic title and description, canonical URL, sitemap, robots and Open Graph defaults are included. Set `NEXT_PUBLIC_SITE_URL` to the real canonical origin.
- No external font stylesheet is required; system fonts avoid a render-blocking third-party font request.
- Responsive layouts, visible focus styles, skip link, semantic labels, reduced-motion support and noindex admin metadata are included.
- Run the post-launch mobile/desktop QA and PageSpeed checks on the actual deployed site. Do not claim performance scores until measured.

## Operational caveats

- Firebase composite indexes are avoided for core content list queries by sorting small result sets in memory. Admin lists are capped at 250 records per collection; add pagination before content grows beyond that scale.
- There is no public pricing, booking system, website chatbot, comment system or individual visitor tracking analytics.
- Email and Google providers must be enabled in Firebase Auth. The app does not enable providers or change Firebase settings automatically.
- Cloudinary upload and Resend mail are optional integrations controlled by Vercel env variables.
- The supplied one-time installer workflow intentionally deletes itself and the uploaded ZIP from the repository after a successful commit. Keep local copies of both delivery files.
