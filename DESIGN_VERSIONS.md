# Website Design Versions

This pack adds five administrator-controlled website designs without creating five separate copies of the application.

## Versions

1. **Obsidian System** — the existing dark design. This is unchanged and remains the default.
2. **Editorial Paper** — warm ivory paper, serif display typography, editorial dividers, and restrained shadows.
3. **Swiss Clarity** — bright white canvas, grid structure, crisp borders, compact radii, and a clean product-studio feel.
4. **Soft Studio** — soft creative palette, generous rounded surfaces, and a warmer presentation.
5. **Blueprint Lab** — pale technical-blue canvas, blueprint grid, dashed section rules, and monospaced display typography.

The same content, routes, Firebase data, blog, CRM, dashboard, forms, SEO, analytics, and other application features remain shared.

## Admin control

Go to `/dashboard/settings` → **Appearance** → **Current website design**.

Select one design and press **Save Appearance**. The selected version is stored in the existing `site_settings/main` Firestore document.

Visitors do not get a design selector. The public website always uses the administrator's saved version.

## Included fixes from the mobile recording review

### Custom cursor mobile bug

The original custom cursor rendered its dot/ring even on touch devices. Its effect exited early, but the elements themselves remained mounted at `(0, 0)`, producing the visible green ring near the top-left corner in the recording.

The new implementation renders the cursor only after confirming a fine pointer and a viewport wider than 1024px.

### Featured pricing card rotation bug

The original `GlowBorder` applied the `spin` animation to the entire wrapper. That rotated the complete featured pricing card, including its text and buttons.

The new implementation keeps the card stationary and rotates only the oversized gradient border layer behind it.

## One-shot GitHub upload workflow

The repository can install this pack through a temporary GitHub Actions workflow.

1. Upload `website-design-versions.zip` to the repository root.
2. Upload `.github/workflows/install-design-versions.yml` to the repository.
3. Commit those uploads.
4. The workflow extracts the archive into the repository root, commits the changes, and then deletes both the uploaded ZIP and the one-shot workflow file.

If extraction fails, the workflow stops before deleting the archive, so the repository is not silently cleaned up after a failed installation.

## Important

The ZIP is a **repo-root overlay**, not a complete replacement application. It contains only the files that need to be added or replaced for the design-version system and the two visual bug fixes.
