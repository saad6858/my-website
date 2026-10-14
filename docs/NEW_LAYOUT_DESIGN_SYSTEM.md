# Shared public website + admin dashboard design system

The public homepage section JSX is newly authored in this patch. The redesign does not simply wrap the previous section markup with a new composition component: each of the 11 homepage sections has a new implementation, and the composition stylesheet targets those new structures.

## Fifteen compositions

| # | Composition | Structural signature |
|---:|---|---|
| 01 | Cinema Series | Film-title pacing, cinematic console visual, generous section rhythm |
| 02 | Editorial Asymmetric | Serif display type, offset copy, uneven columns and lead service card |
| 03 | Swiss Grid | Flush grid cells, strict alignment, fine rules and disciplined spacing |
| 04 | Bento Studio | Modular card groupings, mixed proportions and compact density |
| 05 | Split-Screen Hero | Visual-first left canvas and text-first right canvas |
| 06 | Modern Brutalist | Heavy rules, all-caps display type, hard edges and offset shadows |
| 07 | Monochrome Minimal | Hero console removed, quieter surfaces and reduced ornament |
| 08 | Terminal / Builder | Monospaced headlines, console treatment and dashed technical panels |
| 09 | Horizontal Showcase | Wider horizontal portfolio rail and image-led project canvases |
| 10 | Story Timeline | Timeline spine and milestone-oriented section rhythm |
| 11 | Case-Study Gallery | Large project artwork and gallery-first portfolio hierarchy |
| 12 | Digital Magazine | Serif editorial display and publication-style article feature |
| 13 | Service-First Studio | Services lead the page hierarchy; conversion paths are prominent |
| 14 | Visual Mosaic | Unequal project widths, staggered cards and varied visual scale |
| 15 | Launchpad | Central launch statement, radial visual cues and clear action paths |

The compositions share accessible controls and content data contracts, but the actual layout changes: hero arrangement, type, section rhythm, grid geometry, card emphasis, image sizing, and the order of sections differ. CSS in `app/layout-designs.css` contains a dedicated selector group for every catalog ID. Small screens collapse to usable single-column layouts, native touch scrolling remains available, pointer-based magnetic/parallax movement is disabled for touch and reduced-motion users, and reduced-motion preferences disable ornamental animation.

## Fifteen independent palettes

1. Cinema Crimson — dark red
2. Obsidian Emerald — dark green
3. Midnight Sapphire — dark blue
4. Eclipse Violet — dark purple
5. Graphite Amber — dark amber
6. Deep Ocean — dark cyan
7. Noir Monochrome — dark neutral
8. Ivory & Forest — light green
9. Editorial Sand — light beige
10. Sage & Cream — light sage
11. Lavender Paper — light purple
12. Terracotta Sunset — light orange
13. Rose Quartz — light pink
14. Electric Pop — dark neon coral
15. Arctic Bloom — light ice blue

`lib/design-catalog.ts` and `lib/theme-catalog.ts` are separate sources of truth. Any of the 15 compositions can be paired with any of the 15 palettes (225 combinations). Layout structure never determines the selected palette.

## New public section implementations

- `Hero.tsx`: editorial hero and designed system-console visual, no fabricated portrait or external stock image dependency.
- `Stats.tsx`: compact numbered signal grid using saved stats when present and neutral process labels otherwise.
- `About.tsx`: new introduction, capability tiles, and four-stage timeline.
- `Services.tsx`: new service-card system connected to `/api/services`, with dedicated routes for chatbot, customer-support, appointment, workflow, and web-platform services.
- `Process.tsx`: four-step delivery model.
- `Pricing.tsx`: scope-led pricing cards using saved tiers when configured; fallback pricing is explicitly custom rather than fabricated amounts.
- `Portfolio.tsx`: data-backed horizontal rail, category filters, empty state, and project modal.
- `Testimonials.tsx`: shows only real entries from a published testimonial endpoint if available; never invents client quotes.
- `Blog.tsx`: editorial featured post and secondary article list connected to `/api/posts`.
- `FAQ.tsx`: accessible accordion with keyboard-operable buttons and reduced-motion support.
- `Contact.tsx`: new responsive enquiry form preserving the existing `/api/contact` contract.

The supplied monogram is applied to the existing site brand slots. Authentication, admin routes, Firestore data contracts, media upload code, blog editing, contact submission, SEO, and deployment runtime remain existing platform responsibilities.


## Admin dashboard integration

The admin dashboard uses the same selected `data-layout-design` and `data-color-theme` values as the public website. `app/admin-layout-designs.css` adds dashboard-specific styling for the authenticated shell, sidebar, top bar, form controls, data tables, cards, and all 15 composition variants. `DashboardFrame`, `Sidebar`, and `TopBar` receive styling hooks only; their authentication, navigation, data loading, and mutation logic is not replaced. The existing Appearance setting continues to control the site-wide visual system.
