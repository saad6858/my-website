# Pre-deployment source check report

**Date:** 2026-10-18  
**Source:** `saad-maqbool-complete-website.zip` uploaded by the owner and `install-complete-website.yml`.  
**Build policy:** No `next build` was run, as requested.

## Findings fixed in the working source

The first available TypeScript parse/type attempt found a genuine blocker in `lib/content.ts`: six service page titles were split across physical lines inside single-quoted strings, producing unterminated string/syntax errors. Those six values now use escaped `\n` sequences. Strict checking also found that a home-hero navigation item omitted `body`; its content model now correctly makes item descriptions optional. The admin-managed settings object is now explicitly typed to allow settings such as `seoTitle`, `seoDescription`, and `socialImage`. Slug-redirect calls were moved outside `try/catch` blocks so Next.js redirect control-flow exceptions are not swallowed. Dynamic-page not-found guards now return `notFound()` for clearer narrowing.

## Checks that passed

- TypeScript/TSX parsing with the installed TypeScript compiler API: **46 files parsed, 0 syntax diagnostics**.
- Focused strict typecheck of dependency-free `lib/content.ts` and `lib/upload-limits.ts`: **passed**.
- TypeScript content-seed smoke check: **16 unique page slugs**, 1 project seed, internal links and supported CMS section types checked.
- JavaScript syntax checks (`node --check`) for both admin-claim scripts: **passed**.
- JSON parsing for project/config JSON: **passed**.
- CSS parser walk including nested at-rules and declarations: **no parser errors**.
- SVG XML parsing: **passed**.
- GitHub installer YAML syntax parsed and required job/permission keys verified.
- Upload-limit source check: video limit is **95,000,000 bytes (95 decimal MB)**; image limit remains **15,000,000 bytes**. Admin validation displays upload progress and rejects disallowed MIME types/sizes before starting an upload.
- Source-archive checks: archive integrity, expected files, no real `.env`/`.env.local`, and the workflow remains separate from the website ZIP.

## Checks not completed (important)

A **complete project typecheck has not passed or been verified**. This environment did not have project `node_modules`; attempting `npm install --ignore-scripts --no-audit --no-fund --prefer-offline` timed out while reaching the package registry. The subsequent full `tsc --noEmit` attempt therefore reported missing Next, React, Firebase, Lucide, Zod, and Node type declarations, plus cascading JSX/implicit-type diagnostics. Those diagnostics cannot reliably separate source-level type defects from absent dependency types. The full-project typecheck must be rerun after dependencies install in an environment with registry access.

The `npm run lint` command was attempted and failed immediately with `eslint: not found` because the project ESLint package is not installed. Dependency installation was unavailable. No browser tests, Firebase/Cloudinary API integration tests, Next.js build, or Vercel deployment were run.

No lockfile was present in the uploaded ZIP; one could not be generated without a successful package installation. This means Vercel will resolve the current compatible package versions from `package.json` at install time rather than using a committed lockfile.

## Recommended next step

Deploy only after running `npm install` (or allowing Vercel's package installation), then run `npm run typecheck` and `npm run lint` in a dependency-enabled environment. Do not treat the source-level checks in this report as a replacement for those commands. Continue with Vercel's deployment build only after the user is ready to deploy.
