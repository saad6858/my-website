# Complete public website + admin dashboard redesign patch

This is a repository overlay for `saad6858/my-website`, not a standalone website. It is designed to be applied to the existing Next.js/Firebase/Cloudinary/Netlify repository so the admin, authentication, saved content, API contracts, and media upload pipeline remain intact.

## What is actually replaced

The patch redesigns both the public website and the authenticated admin dashboard. The dashboard uses the same selected layout and palette as the public site, with dedicated composition-aware styling for its shell, navigation, headers, cards, forms, tables, and responsive layouts. Dashboard data fetching, authentication, and CRUD behavior are retained.

The patch overwrites the JSX implementation for all 11 homepage sections: Hero, Stats, About, Services, Process, Pricing, Portfolio, Testimonials, Blog, FAQ, and Contact. It also replaces the public homepage assembly with a 15-layout composition system. The old JSX for those sections is not retained as a hidden alternate design. The standalone Services, Portfolio, Blog archive, Blog article, and Contact routes are also re-authored to use the same visual system; the dynamic service-detail route is rebuilt around the existing service data contract.

The 15 layouts are structurally distinct, with dedicated CSS composition rules, and the 15 palettes are independent. Pointer-responsive magnetic/parallax movement is limited to mouse pointers and disabled when reduced motion is requested. This provides 225 possible layout/palette combinations. The design board is included under `docs/reference/design-board.png`; the supplied monogram is installed at `public/saad-monogram.png`.

## Existing platform features preserved

- Firebase authentication and protected dashboard/admin (the dashboard visuals are redesigned, not the authorization logic)
- Existing Firestore data contracts and API routes
- Existing service and portfolio management
- Existing blog authoring and publishing, including inline media
- Existing Cloudinary upload/storage implementation
- Existing contact submission API and its server-side validation
- Existing SEO, routing, and Next.js server behavior prepared for Vercel
- Existing inline blog video limit of 95,000,000 bytes

## Reference implementation reuse

The portfolio rail and project-modal interaction code from `Sushmitadasari/Portfolio_series` is adapted into this repository's `ProjectRailControls.tsx` and `ProjectModal.tsx`. See `docs/REFERENCE_CODE_REUSE.md` for the exact source files, behavior carried over, and adaptation boundary. The requester reports that the creator gave permission via Instagram; keep that permission record with the project. The reference repository has no repository `LICENSE` file visible in the inspected tree, so attribution and the permission record should remain available.

## Deployment path

1. Keep `MY_WEBSITE_COMPLETE_REDESIGN.zip` at the repository root on the branch from which you will run the manual workflow.
2. In GitHub Actions, open **Apply and verify complete public + admin redesign** and run it with the explicit confirmation set to `yes` only when ready.
3. The workflow applies the ZIP to a fresh checkout of `main`, verifies the design catalogs and protected paths, then runs TypeScript, ESLint, and a production build. It only pushes to `main` if those checks pass; the assistant has not committed to the repository.
4. Connect/import this repository as a Next.js project in Vercel and configure the environment variables listed in `SETUP_AND_DEPLOYMENT.md`. Vercel will deploy commits to its configured production branch once the project is linked.
5. Disable or disconnect the old Netlify site/deploy integration in the Netlify account after the Vercel deployment is verified. A source ZIP cannot change external hosting-account settings.

The production build has not been run in this packaging environment. Treat the result as unverified until the actual GitHub Actions workflow and first Vercel deployment succeed. Do not infer deployment success from ZIP validation alone.
