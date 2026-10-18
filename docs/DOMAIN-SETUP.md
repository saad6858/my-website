# Connect smautomations.tech to Vercel

The domain is registered through get.tech; it remains registered there. Vercel hosts the website. Do not change nameservers and add individual DNS records at the same time—choose one method.

## Recommended: keep DNS at get.tech

1. Open the Vercel dashboard and select the existing SM Automations website project.
2. Open **Settings → Domains → Add Domain**.
3. Add `smautomations.tech`. Follow Vercel's prompts, then also add `www.smautomations.tech`.
4. Vercel shows the exact DNS records needed for this project. Keep that page open; do not assume a generic IP or CNAME value if Vercel displays a project-specific value.
5. Sign in to the account where you registered `smautomations.tech` through get.tech. Open the domain's **DNS Management / Manage DNS / DNS Records** page (label may vary).
6. Add or update the apex/root record exactly as Vercel instructs—usually an `A` record with host/name `@` and the IP address shown by Vercel.
7. Add or update the `www` record exactly as Vercel instructs—usually a `CNAME` with host/name `www` and the target shown by Vercel.
8. Remove conflicting duplicate `A`, `AAAA`, or `CNAME` records for the same host only after checking that they are not used by email or another service. Do not delete MX/TXT email records unless you know they are unnecessary.
9. Return to **Vercel → Project → Settings → Domains** and click **Refresh / Verify** if shown. DNS changes may take time to propagate.
10. Once Vercel marks both domains valid and the certificate is issued, select `smautomations.tech` as the primary domain and set `www.smautomations.tech` to redirect to it (or use the reverse if you prefer `www`).
11. In `/admin → Site-wide settings`, confirm **Canonical website URL** is `https://smautomations.tech`, then save.
12. Test `https://smautomations.tech`, `https://www.smautomations.tech`, HTTP-to-HTTPS redirection, the `/admin` route, contact form, images, and sitemap at `https://smautomations.tech/sitemap.xml`.

## Alternative: delegate DNS to Vercel

If you prefer managing DNS in Vercel, Vercel will provide its authoritative nameservers. Copy the exact nameserver values from Vercel into the get.tech domain's nameserver settings. Before switching, inventory any existing MX/TXT records used for email and recreate them in Vercel DNS after delegation. Do not switch nameservers if you are not ready to migrate the domain's DNS records.

## Important notes

- Adding the domain to a Vercel project and pointing DNS are two separate steps; both must be complete.
- A valid DNS configuration is required before Vercel can issue the site's HTTPS certificate.
- Do not paste domain credentials, registrar passwords or private tokens into GitHub or the website ZIP.
- Vercel's current official guide: https://vercel.com/docs/domains/working-with-domains/add-a-domain
