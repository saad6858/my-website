# My Platform

A premium, dark-luxury personal brand platform designed to feel closer to a polished SaaS product than a traditional portfolio.

The project combines a public personal site, portfolio, blog/CMS, CRM, project pipeline, analytics, finance tracker, content calendar, media manager, and a Firestore-backed admin control plane.

## Stack

- Next.js 16.3.8
- React 19.3.0
- TypeScript 5.9.2
- Tailwind CSS 3.4.19
- Framer Motion 13.4.5
- Firebase Web SDK 12.19.0
- Firebase Admin SDK 14.5.0
- Cloudinary for media storage
- Recharts 3.10.1
- Lucide React 1.48.0
- react-markdown + remark-gfm
- Optional Resend email integration
- Vercel deployment

## Major capabilities

## Current public redesign

The public homepage section JSX is newly implemented in `components/sections/`. Layout composition is managed in `lib/design-catalog.ts`; the 15 independent palettes are managed in `lib/theme-catalog.ts`. The authenticated dashboard now shares those same 15 composition choices and 15 palettes, with dashboard-specific styling in `app/admin-layout-designs.css`. Dashboard data/auth logic is preserved. See `docs/NEW_LAYOUT_DESIGN_SYSTEM.md` and `docs/REFERENCE_CODE_REUSE.md`.


### Public

- Premium hero and animated sections
- About / journey / skills
- Services catalog
- Process
- Editable pricing
- Portfolio
- Blog listing and detail pages
- Search and categories
- Contact form
- FAQ
- Testimonials area
- Newsletter signup
- Dynamic SEO / OG image / sitemap / robots

### Admin

- Secure email/Google sign-in
- HttpOnly Firebase session cookie
- Lead tracker
- Project pipeline
- Analytics
- Content calendar
- Finance tracker
- Blog CMS
- File manager
- Site settings
- Service catalog editor
- Contact inbox
- Newsletter subscriber management

## Important architecture choices

The uploaded 14-chunk source specification was retained as the product baseline, but several obsolete implementation instructions were replaced with current production-safe architecture. See `RESEARCH_AND_ARCHITECTURE.md` for the full reasoning.

Key changes:

- Next.js 14 → Next.js 16.3.8
- `middleware.ts` → `proxy.ts`
- static export removed
- Firebase Storage replaced with Cloudinary
- server-side auth/session verification added
- public settings endpoint sanitized
- exact `ADMIN_EMAIL` controls admin access
- abandoned real-estate property-video offering removed

## Setup

Read `SETUP_AND_DEPLOYMENT.md` before deployment.

The intended setup path does not require Codespaces or a local computer.

1. Upload this repository to GitHub.
2. Create/configure Firebase.
3. Create Cloudinary.
4. Import the repository into Vercel.
5. Add the environment variables in Vercel Project Settings.
6. Create the Firebase admin account matching `ADMIN_EMAIL`.
7. Deploy.
8. Sign in at `/login`.
9. Run `/seed` once.
10. Configure the live site from `/dashboard/settings`.

## Environment variables

See `.env.example` for the full template.

### Public Firebase

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Server secrets

- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_EMAIL`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY` (optional)

### Public app settings

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_SITE_TAGLINE`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_UPLOAD_FOLDER`

## Folder structure

```text
app/
  about/
  api/
  blog/
  contact/
  dashboard/
  login/
  portfolio/
  services/
  globals.css
  layout.tsx
  page.tsx
components/
  analytics/
  animations/
  blog/
  dashboard/
  layout/
  portfolio/
  providers/
  sections/
  ui/
hooks/
lib/
public/
types/
proxy.ts
firestore.rules
firestore.indexes.json
```

## Security model

Anonymous visitors can read the public website. Important writes are handled by server-side code using Firebase Admin.

Admin access is controlled by the `ADMIN_EMAIL` server environment variable plus Firebase's `admin` custom claim.

Cloudinary secrets are server-side only.

## Deployment

Deploy this as a normal dynamic Next.js application on Vercel. Let Vercel detect the Next.js framework; do not configure a static export or a custom output directory. Configure all required public and server environment variables in Vercel Project Settings before deploying.

Choose a Vercel plan that fits the site's actual business use and expected traffic. Verify the current plan terms and usage limits in Vercel before production deployment; do not assume a free tier permits commercial use.

## Contribution / future changes

Keep UI concerns in `components/`, browser state in `hooks/`, server/infrastructure code in `lib/`, and routing in `app/`.

Prefer adding or changing isolated modules instead of placing business logic directly inside large page components.

## License

MIT
