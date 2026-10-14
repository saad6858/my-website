# Install and run the redesign workflow

This repository's manual workflow applies the redesign to a fresh checkout of `main`. It does not commit anything until the archive has passed the design checks, TypeScript, ESLint, the protected-path check, and the production build.

## 1. Prepare the archive

1. Put `MY_WEBSITE_COMPLETE_REDESIGN.zip` in the repository root on the branch you will select when running the workflow.
2. Confirm the ZIP is the newly supplied version and not one of the earlier retries.
3. Do not unpack the ZIP into the repository manually. The workflow validates its exact manifest and applies it to a clean checkout of `main`.

## 2. Run the workflow

1. Open GitHub → **Actions** → **Apply and verify complete public + admin redesign**.
2. Choose **Run workflow** and select the branch containing the ZIP.
3. Set the explicit confirmation to `yes` only when you are ready for the workflow to update `main` if all checks pass.
4. Monitor each step. If a step fails, inspect its first red step; a failed check stops the workflow before it pushes changes to `main`.

The workflow's production-build step uses repository Actions secrets for Firebase configuration. Configure these secrets if they are not already present: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`. Those are separate from Vercel's project environment variables.

## 3. Vercel deployment setup

The overlay creates `vercel.json`, removes `netlify.toml`, and updates `.gitignore` for Vercel metadata. Then import the GitHub repository into Vercel as a Next.js project, configure Production and Preview environment variables, and verify the configured production branch is `main`. Add the final Vercel/custom domain to Firebase Authentication's authorized domains. See `SETUP_AND_DEPLOYMENT.md` for the complete variable list and domain steps.

A source change cannot connect/disconnect hosting accounts. Once the Vercel project is live and tested, disable the old Netlify Git deployment in Netlify's project settings to avoid duplicate deployments.

## 4. Verification after success

After the workflow succeeds, verify that the new commit appears on `main` and that Vercel deploys it. Test the homepage, `/services`, one `/services/[slug]`, blog, contact, dashboard overview, CRM, analytics, blog editor, media manager, and `/dashboard/settings` → Appearance with at least one dark and one light palette. Confirm that sign-in, Firestore operations, Cloudinary media upload/delete, blog publishing, and contact/newsletter handling still work. ZIP validation is not a substitute for these live integration checks.
