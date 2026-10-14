/**
 * Fresh layout catalog for the site. Layout is an independent axis from colorTheme.
 * Do not add legacy layout IDs here: settings saved with an unknown ID fall back to
 * cinema-index until the owner saves a current selection.
 */
export const layoutDesignCatalog = [
  { id: "cinema-index", label: "01 · Cinema Index", family: "Cinematic", description: "A film-title opening, wide negative space, strong focal hierarchy, and restrained scene changes." },
  { id: "editorial-asymmetric", label: "02 · Editorial Asymmetric", family: "Editorial", description: "Uneven columns, offset headings, editorial notes, and generous paper-like rhythm." },
  { id: "swiss-grid", label: "03 · Swiss Grid", family: "Grid", description: "Strict alignment, visible rules, disciplined typography, and a precise information hierarchy." },
  { id: "bento-studio", label: "04 · Bento Studio", family: "Modular", description: "Modular tiles, mixed card proportions, compact content groupings, and quick scanning." },
  { id: "split-canvas", label: "05 · Split Canvas", family: "Split screen", description: "A two-part hero with copy on one side and visual atmosphere on the other." },
  { id: "modern-brutalist", label: "06 · Modern Brutalist", family: "Graphic", description: "Hard edges, thick rules, decisive blocks, and intentionally graphic action elements." },
  { id: "monochrome-minimal", label: "07 · Monochrome Minimal", family: "Minimal", description: "Quiet surfaces, low ornament, sharp type, and a deliberate focus on the content." },
  { id: "terminal-builder", label: "08 · Terminal Builder", family: "Technical", description: "Console-inspired labels, code-like framing, monospaced headings, and utility-first structure." },
  { id: "horizontal-showcase", label: "09 · Horizontal Showcase", family: "Showcase", description: "Swipeable project rails and wide canvases that make selected work the main event." },
  { id: "story-timeline", label: "10 · Story Timeline", family: "Narrative", description: "A guided vertical journey that connects sections into a readable progression." },
  { id: "case-study-gallery", label: "11 · Case-Study Gallery", family: "Portfolio", description: "Large project frames, editorial project captions, and gallery-first visual pacing." },
  { id: "digital-magazine", label: "12 · Digital Magazine", family: "Magazine", description: "Feature-story proportions, serif accents, column shifts, and a publication-like rhythm." },
  { id: "service-first-studio", label: "13 · Service-First Studio", family: "Conversion", description: "Service cards lead the visual hierarchy, with clear deliverables and direct next steps." },
  { id: "visual-mosaic", label: "14 · Visual Mosaic", family: "Mosaic", description: "A varied visual grid with alternating emphasis and carefully controlled card scale." },
  { id: "launchpad-constellation", label: "15 · Launchpad Constellation", family: "Launchpad", description: "A confident central message, orbit-like visual cues, and clear paths into the work." },
] as const;

export type LayoutDesignId = (typeof layoutDesignCatalog)[number]["id"];

const layoutIds = new Set<string>(layoutDesignCatalog.map((design) => design.id));

export function isLayoutDesign(value: unknown): value is LayoutDesignId {
  return typeof value === "string" && layoutIds.has(value);
}

export const DEFAULT_LAYOUT_DESIGN: LayoutDesignId = "cinema-index";
