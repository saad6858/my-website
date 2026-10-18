# CMS content model

## Page document
`title`, unique normalized `slug`, `kind`, `status` (`draft`, `published`, `archived`), `description`, `sections[]`, `seo{title,description,image}`, `schemaVersion`, timestamps, optional `draftData` and `hasDraftChanges`.

## Section block types
- `hero`: eyebrow, title, body, CTA and optional linked items.
- `cards`: responsive capability cards.
- `featured` / `showcase`: horizontal case-study cards with motion states.
- `split`: asymmetric editorial two-column story.
- `timeline`: numbered process or journey with staggered reveals.
- `gallery`: offset visual mosaic.
- `split`: two-column title and body with optional CTA.
- `cta`: focused contact call to action.
- `prose`: plain-text body blocks.

## Collections
- `pages`: standard pages and dynamic niche pages.
- `projects`: project/case-study cards and detail pages.
- `services`: reusable service records.
- `industries`: optional industry metadata; niche landing pages are also stored as `pages` with `industries/<slug>`.
- `posts`: manual insights/blog publishing.
- `faqs`: questions/answers, order and publication status.
- `leads`: contact enquiries and pipeline status/notes/follow-up date.
- `media`: Cloudinary asset metadata and alt text.
- `siteSettings/global`: global site copy, selected `layoutPreset`, selected `themeDefault`, optional accent override, SEO defaults and contact links. Layout presets are `cinema`, `editorial`, `swiss`, `split`, `terminal`, and `timeline`; palettes are `signal`, `cobalt`, `editorial`, `teal`, `terminal`, `blueprint`, and `paper` (a warm parchment light mode, not pure white). The administrator chooses the single global layout and palette; visitors have no theme switcher.
- `rateLimits`: hashed source-address counters with expiry timestamp.
- `analyticsDaily`: aggregate daily event counts, top-page counts and normalised campaign counters; no individual visitor identifiers or IP addresses.

## Publishing and revisions
When a published content record is edited, changed fields are staged in `draftData`. Public renderers continue using the published root fields until the admin explicitly publishes. Every content update stores a previous version under the record's `revisions` subcollection; publishing also records a snapshot. Undo restores a selected latest revision while first saving the current state for recovery.
