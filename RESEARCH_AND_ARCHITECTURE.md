# Research & Architecture Decisions

**Research date:** 2026-10-01

This document records the production-oriented decisions made while converting the original 14-chunk specification into a deployable project. The uploaded specification remains the source for product intent and feature scope; current platform constraints were researched separately and used to avoid known deployment/runtime problems.

## 1. Framework baseline

The original specification asked for Next.js 14. This implementation uses **Next.js 16.3.8** instead.

Reason: the original version is now an old target for a new production deployment. The current patched Next.js release line documented by the project is 16.3.8, and the current major also changes some conventions that matter to this repository.

The project therefore uses:

- Next.js 16.3.8
- React 19.3.0
- TypeScript 5.9.2
- Tailwind CSS 3.4.19
- Framer Motion 13.4.5
- Firebase Web SDK 12.19.0
- Firebase Admin SDK 14.5.0
- Lucide React 1.48.0
- Recharts 3.10.1
- react-markdown 10.1.0 + remark-gfm 4.0.1
- Node.js 24.x on Netlify

The package versions are intentionally pinned instead of using caret ranges. This makes the initial deployment more reproducible and reduces surprise upgrades.

## 2. `proxy.ts` instead of `middleware.ts`

The source specification requested `middleware.ts`. In current Next.js, the request-interception convention is `proxy.ts`.

The repository therefore contains `proxy.ts` for the lightweight redirect check on `/dashboard/*` and deliberately does **not** include a `middleware.ts` shim.

The proxy only performs a cheap presence check for the session cookie. It is not the authorization boundary.

## 3. Server-side authorization

Admin authorization is enforced on the server through `lib/server-auth.ts`.

Flow:

1. Firebase client authentication creates/signs in the Firebase user.
2. The client sends the Firebase ID token to `/api/auth/session`.
3. The server verifies the token with Firebase Admin.
4. If the Firebase email exactly matches `ADMIN_EMAIL`, the server grants the `admin` custom claim when needed.
5. The server creates an HttpOnly `my_platform_session` Firebase session cookie.
6. Server pages, server actions, and admin API routes call `requireAdmin()` / `requireAdminApi()`.

This means a user cannot become an admin merely because they know a public URL or can manipulate client-side state.

The original “first user becomes admin” idea was replaced. The **explicit `ADMIN_EMAIL`** is the authority source.

## 4. Firebase Storage was intentionally removed

The original specification used Firebase Storage. That is not the right default for this 2026 deployment because Firebase Cloud Storage now requires the Blaze billing plan for new/continuing storage usage.

The project therefore keeps **Firestore + Firebase Auth** but moves media storage to **Cloudinary**.

This gives the project:

- no dependency on Firebase Cloud Storage billing for initial operation;
- signed server-generated upload authorization;
- image/video/raw media support;
- CDN delivery;
- transformation support;
- a storage adapter that can be replaced later.

The browser never receives `CLOUDINARY_API_SECRET`.

## 5. Cloudinary is the media provider

The implementation uses signed uploads through `/api/files/signature` and direct browser upload to Cloudinary.

Firestore stores media metadata in `files` so the dashboard can search, sort, and manage uploaded media without treating Firestore as the binary store.

The current Cloudinary free tier is suitable for starting the project but should be watched carefully: Cloudinary currently advertises a $0 free plan with 25 monthly credits, where a credit can represent storage, bandwidth, or transformations depending on usage.

Large video libraries or high-traffic image transformation workloads can consume this allowance quickly. The architecture intentionally isolates the storage layer so the provider can be changed without redesigning the rest of the website.

## 6. Firestore remains the main application database

Firestore is used for:

- site settings;
- services;
- posts;
- leads;
- projects;
- transactions;
- content calendar;
- contacts;
- newsletter subscribers;
- page views;
- portfolio;
- media metadata;
- optional testimonials/notifications.

The project uses the Admin SDK for server-side operations so public visitors do not receive direct write access to the application database.

The client-side Firestore helpers are retained as reusable infrastructure, but the important public/admin mutations are routed through server-side code.

## 7. Public settings are sanitized

The browser loads `/api/settings` for public UI configuration. That endpoint deliberately returns only public fields.

Private notification settings and WhatsApp templates are not exposed to anonymous visitors.

This matters because the original “read the whole site settings document in the browser” design would have unnecessarily exposed private operational data.

## 8. No static export

The original specification mentioned static export compatibility. This application contains:

- API routes;
- server actions;
- Firebase Admin SDK usage;
- session-cookie verification;
- dynamic OG generation;
- dynamic sitemap/robots;
- protected admin routes.

A static export is therefore intentionally **not enabled**.

Netlify should run this as a normal Next.js server deployment through its current OpenNext integration.

## 9. Netlify runtime

The repository declares:

```json
"engines": {
  "node": "24.x"
}
```

This is intentional. Netlify currently builds on Ubuntu 24.04 with Node 24 as its default build version, and the repository pins Node 24 through `.nvmrc` / `engines`.

The project does not depend on Netlify-specific runtime APIs. Netlify handles the Next.js server through its OpenNext integration, so the application remains portable to another Node-capable host.

## 10. Netlify Free plan consideration

The website is personal-brand oriented, but it also contains business/CRM/admin functionality and is designed to attract and support clients.

Netlify's current Free plan is $0 and includes custom domains with SSL, Functions, Git-based deployment, and a 300-credit monthly allowance. Netlify's current documentation does not state a non-commercial-only restriction for the Free plan, and a Netlify staff response in May 2025 confirmed commercial projects were permitted on Free. The legal Free Usage Tier is discretionary and can be disabled or removed, so usage should remain modest and within the current credit budget.


## 10.1. Hosting comparison: Netlify vs Cloudflare Workers/Pages

**Netlify was selected for the current repository because it minimizes application changes.** Netlify's current Next.js integration uses the OpenNext adapter and documents full support for App Router, SSR, SSG, ISR, React Server Components, Server Actions, Route Handlers, image optimization, redirects/rewrites, and Middleware. The repository therefore needs only hosting configuration, not a Cloudflare-specific Next.js runtime adapter.

Cloudflare is an excellent future alternative. Its current Workers Free plan documents 100,000 requests/day, 128 MB memory, 10 ms CPU time per invocation, and free/unlimited static asset requests. However, Cloudflare currently recommends **vinext** for new Next.js applications on Workers; its OpenNext path remains supported but is explicitly described as a migration/maintenance path. A Cloudflare migration would therefore require a separate compatibility pass, especially around Node-oriented server dependencies such as Firebase Admin.

For this project, the practical hierarchy is:

- **Netlify Free:** lowest migration risk, easiest GitHub-to-deploy workflow, current Next.js integration, custom domains + SSL.
- **Cloudflare Workers Free:** potentially stronger cost/traffic headroom and global edge runtime, but more platform-specific adaptation work.
- **Vercel Hobby:** technically compatible with the application, but not the appropriate long-term plan for this commercial site because Hobby is restricted to personal/non-commercial use.

This is a portability choice, not a permanent lock-in decision. Runtime/provider concerns remain isolated in configuration and infrastructure code.

## 11. Optional email provider

The core website does not require an email provider.

The contact reply and newsletter broadcast routes support **Resend** as an optional integration. Without the Resend environment variables, those sending paths fail clearly rather than pretending an email was delivered.

This keeps the main deployment path simpler and lets email be enabled only when needed.

## 12. Rate limiting

Public endpoints include lightweight application-level rate limiting. It is intentionally conservative and designed for a low-volume personal site.

It should not be treated as a substitute for an enterprise-grade distributed anti-abuse service. If traffic grows substantially, the natural next step is a managed distributed rate limiter such as a Redis-based service.

## 13. Abandoned feature removed

The original prompt contained a real-estate AI property-video business/service concept.

That feature was explicitly abandoned by the owner and is therefore removed from this implementation. It does not appear in:

- public service cards;
- pricing;
- process copy;
- contact service choices;
- portfolio seed data;
- blog seed data;
- site positioning;
- admin service catalog defaults.

Real-estate remains usable as a CRM source/audience context where it is relevant, but the abandoned property-video offering is not presented as an active capability.

## 14. Maintainability strategy

The codebase is intentionally divided into:

- `components/` for reusable UI;
- `hooks/` for browser state and settings;
- `lib/` for services, server actions, auth, analytics, storage, and helpers;
- `app/` for routing and server entry points;
- `types/` for shared contracts.

High-value site controls are editable through the dashboard:

- section visibility;
- brand settings;
- appearance;
- SEO defaults;
- contact details;
- pricing tiers;
- service catalog;
- WhatsApp templates;
- notification settings.

That is the mechanism intended to let the owner change the site without learning web development.

## 15. Verification status

Completed in this environment:

- full source-file read of the uploaded specification;
- project structure reconciliation against requested paths;
- TypeScript/TSX/JS syntax parsing across the codebase;
- relative/alias import existence check;
- abandoned-feature scan;
- package/version reconciliation against current researched constraints.

Not completed here:

- a successful full `npm install`/`next build` run in this execution environment.

The package registry connection available to the execution environment timed out during installation attempts. This is an environment limitation, not a reported application build error. The repository therefore includes pinned versions and a deployment guide, but no claim is made that a full Netlify production build was executed inside this environment.


## 12. Exact source-spec changes

The supplied 14-chunk specification remains the feature blueprint, but these changes are intentional production adjustments:

1. **Next.js 14 → Next.js 16.3.8.** The original request is an older target for a new deployment.
2. **`middleware.ts` → `proxy.ts`.** Next.js 16 uses the newer proxy convention for request interception.
3. **Firebase Storage → Cloudinary.** The application keeps Firebase Auth and Firestore, but application media uploads go directly to Cloudinary so the core site is not coupled to Firebase Cloud Storage billing.
4. **Property-video offering removed.** The real-estate AI property-video generator/service, its copy, pricing, portfolio examples, seed data, and references have been removed completely at the user's request.
5. **Services are now editable.** The public service catalog is backed by Firestore and managed from Site Settings, so adding/removing offerings does not require editing React components.
6. **SEO uses the App Router Metadata API.** The legacy `next/head` approach from the source specification is not used.
7. **Admin authorization is server-authoritative.** The browser Firebase SDK establishes the session, while privileged reads/writes use Firebase Admin SDK and an HttpOnly session cookie.
8. **Contact/newsletter email delivery is explicit.** Without Resend credentials the application records the event and does not pretend an email was delivered.
9. **The original project/CRM schema was cleaned up.** Fields that existed only to support the abandoned property-video workflow were removed; general-purpose project, lead, content, finance, and portfolio models remain.
10. **The original Codespaces/Gemini execution instructions were not used.** The final workflow is GitHub repository upload plus Netlify deployment, matching the user's phone-only workflow.

## 16. Research sources (checked 2026-10-01)

- Netlify Next.js support: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify current pricing: https://www.netlify.com/pricing/
- Netlify environment variables: https://docs.netlify.com/build/configure-builds/environment-variables/
- Netlify custom domains: https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/
- Netlify external DNS: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/
- Netlify Free-tier commercial-use staff confirmation: https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545/2
- Cloudflare Workers pricing/limits: https://developers.cloudflare.com/workers/platform/pricing/ and https://developers.cloudflare.com/workers/platform/limits/
- Cloudflare current Next.js guidance: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Firebase Cloud Storage billing change: https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024
- Firebase Admin session cookies: https://firebase.google.com/docs/auth/admin/manage-cookies
- GitHub Student Developer Pack: https://education.github.com/pack
