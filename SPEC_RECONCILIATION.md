# Source Specification Reconciliation

This document records the deliberate changes between `ULTIMATE_CHUNKS.txt` and the production implementation.

## Kept from the source specification

The project preserves the intended product identity and broad surface area: a dark luxury personal brand site that behaves like a SaaS product; animated public sections; portfolio; blog/CMS; contact capture; newsletter; admin dashboard; CRM lead tracker; project pipeline; analytics; content calendar; finance tracker; site settings; seed data; APIs; SEO; and reusable UI/animation primitives.

## Removed by explicit user instruction

The real-estate AI property-video generator/service was abandoned by the user and is absent from the implementation. Its service card, pricing model, workflow language, demo seed data, portfolio example, technology references, and public copy were removed.

## Technically modernized

### Runtime

The source specification targeted Next.js 14. The implementation uses Next.js 16.3.8 and supports the modern proxy convention through `proxy.ts`.

### Storage

The source specification used Firebase Storage. The implementation uses Cloudinary for media uploads and keeps Firebase Auth + Firestore for identity and application data.

### Authentication

The source specification relied on a cookie check in middleware. The implementation uses Firebase ID-token exchange plus a Firebase Admin-verified HttpOnly session cookie, with admin authorization anchored to `ADMIN_EMAIL` and the Firebase `admin` custom claim.

### SEO

The source referenced the legacy `next/head` API. The implementation uses App Router metadata generation and JSON-LD where appropriate.

### Maintainability

The service catalog is data-driven from Firestore and editable in Site Settings. This directly supports the user's requirement that future changes not require web-development knowledge.

### Deployment

The source's Codespaces/Gemini execution sequence was replaced with the user's desired GitHub website upload → Netlify deployment workflow, documented in `SETUP_AND_DEPLOYMENT.md`.

## Known verification boundary

Static parsing, internal import resolution, configuration JSON parsing, stale-feature scanning, and placeholder scanning were completed successfully. A real dependency install and production build were **not** completed inside this execution environment because npm registry access timed out. The setup guide therefore treats the first Netlify build as the authoritative environment-level dependency/build verification and lists the exact post-deploy checks.
