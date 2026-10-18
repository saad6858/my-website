# Connect smautomations.tech (get.tech) to Vercel

These steps configure the domain on the existing Vercel project. Do not change nameservers or delete existing DNS records until you have identified whether the domain is used for email or other services.

## 1. Add the domain to the Vercel project

1. Sign in to Vercel and select the project currently serving the website.
2. Open **Settings → Domains**.
3. Add `smautomations.tech` and continue.
4. Also add `www.smautomations.tech` as a separate domain if you want both forms to work; set a redirect from `www.smautomations.tech` to `smautomations.tech` (the apex domain) in Vercel's domain settings.
5. Vercel will show the DNS records required for this exact project/domain. Leave this screen open for the next step.

Official guide: https://vercel.com/docs/domains/working-with-domains/add-a-domain

## 2. Add the DNS records at get.tech

1. Sign in to the account where you purchased the domain at get.tech.
2. Open the domain management page for `smautomations.tech`, then find **DNS Management**, **Manage DNS**, or the DNS-record editor (the exact label may vary in the registrar UI).
3. Add the **exact record(s) Vercel shows**. Typically, the apex domain uses an `A` record and `www` uses a `CNAME`, but use Vercel's current displayed targets for your project because they can vary.
4. If a conflicting `A`, `AAAA`, or `CNAME` record already exists for the same hostname, change only the conflicting website record after confirming it does not support another service. Do not delete `MX`, email-related `TXT`, or domain-verification records by guesswork.
5. Save the changes. DNS can update quickly, but global propagation/caches can take up to 24 hours or occasionally longer.

Official Vercel DNS reference: https://vercel.com/docs/domains/working-with-dns and https://vercel.com/docs/domains/managing-dns-records.

**Do not blindly replace nameservers with Vercel nameservers.** If you intentionally choose a nameserver migration instead of editing DNS records, copy all existing DNS records needed for email and verification into the new DNS provider first.

## 3. Verify and choose the primary domain

1. Return to Vercel **Settings → Domains**.
2. Click **Refresh** or **Verify** if displayed and wait until Vercel marks `smautomations.tech` as configured.
3. Confirm both `https://smautomations.tech` and `https://www.smautomations.tech` work and the `www` URL redirects to the chosen primary domain.
4. Vercel provisions HTTPS/TLS after the DNS setup is valid. If it remains invalid, use Vercel's diagnostic details rather than guessing record values.

## 4. Set the canonical origin

In Vercel, open **Project → Settings → Environment Variables** and set these for **Production**:

- `NEXT_PUBLIC_SITE_URL` = `https://smautomations.tech`
- `NEXT_PUBLIC_APP_URL` = `https://smautomations.tech`

Save the variables. Redeploy the latest production commit so the new environment variables apply. The site's Admin → Site-wide settings also has a **Canonical website URL** field; set it to `https://smautomations.tech` and save. The frontend uses that setting for metadata and sitemap generation.

## 5. Verify after the deployment

Check the apex domain, `www` redirect, HTTPS lock, homepage, `/robots.txt`, `/sitemap.xml`, and canonical/meta URLs. Confirm previews or the old `.vercel.app` origin aren't being emitted as canonical links.

No DNS settings are changed by this project archive or installer; the domain must be connected from your accounts.
