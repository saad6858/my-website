# Firebase Admin production compatibility fix

This repo-root overlay changes only one application dependency:

- `firebase-admin` `14.5.0` → `13.10.0`

Reason: the production Netlify Functions runtime was failing while loading Firebase Admin authentication because the Firebase Admin v14 dependency chain reaches `jwks-rsa` 4.x, which currently requires ESM-only `jose` from a CommonJS path. The observed production error was `ERR_REQUIRE_ESM` from `jwks-rsa/src/utils.js` while loading Firebase Admin Auth.

Firebase Admin v13.10.0 uses `jwks-rsa` 3.1.x instead of the v14 dependency line, avoiding the specific `jwks-rsa@4` / `jose@6` incompatibility.

No Firebase environment variables, authentication data, UI components, theme files, dashboard files, Firestore rules, Cloudinary configuration, or application logic are changed by this patch.

After this overlay is installed and Netlify redeploys, test `/login` again before changing any other configuration.
