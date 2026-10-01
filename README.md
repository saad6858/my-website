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
- Netlify deployment

## Major capabilities

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
4. Import the repository into Netlify.
5. Add the environment variables in Netlify.
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

Use Netlify's normal Next.js deployment mode. Do not configure a static export. Netlify's current Next.js integration uses its OpenNext adapter and supports App Router, SSR, Route Handlers, Server Actions, and Middleware.

The Free plan is suitable for a small low-traffic commercial site, but it has a 300-credit monthly allowance; when the credits are exhausted, projects can pause until the next cycle. Keep an eye on usage as traffic grows.

## Contribution / future changes

Keep UI concerns in `components/`, browser state in `hooks/`, server/infrastructure code in `lib/`, and routing in `app/`.

Prefer adding or changing isolated modules instead of placing business logic directly inside large page components.

## License

MIT
