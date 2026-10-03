# Production Hardening Addendum

This small overlay applies two security hardening changes identified during the post-deployment QA review.

## 1. Firestore site-settings privacy

`firestore.rules` changes `site_settings/main` from public Firestore reads to admin-only Firestore reads.

The public site is not supposed to read this document directly. It already obtains sanitized public settings through `/api/settings`, so normal public-site behavior remains unchanged while internal settings are no longer directly readable through the Firestore client SDK.

## 2. Independent authorization for the `/seed` Server Action

`app/seed/page.tsx` now calls `requireAdmin()` inside the Server Action itself.

The page-level authorization remains, but the mutation now also protects its own execution boundary. This prevents the action from relying solely on the page that rendered its button.

## 3. Design-version behavior

No design scoping change is included in this pack.

The five administrator-selected design versions continue to apply through the existing root theme provider, including the administrator dashboard UI, as intended for this project.

## Installation

Upload `production-hardening.zip` to the repository root together with `.github/workflows/install-production-hardening.yml` in the same commit. The workflow extracts the overlay, removes the temporary ZIP and workflow, and commits the changes back to `main`.
