/** Independent color palettes. Keep this catalog separate from layout composition. */
export const colorThemeCatalog = [
  { id: "cinema-crimson", label: "Cinema Crimson", description: "Dark · red" },
  { id: "obsidian-emerald", label: "Obsidian Emerald", description: "Dark · green" },
  { id: "midnight-sapphire", label: "Midnight Sapphire", description: "Dark · blue" },
  { id: "eclipse-violet", label: "Eclipse Violet", description: "Dark · purple" },
  { id: "graphite-amber", label: "Graphite Amber", description: "Dark · amber" },
  { id: "deep-ocean", label: "Deep Ocean", description: "Dark · cyan" },
  { id: "noir-monochrome", label: "Noir Monochrome", description: "Dark · white" },
  { id: "ivory-forest", label: "Ivory & Forest", description: "Light · green" },
  { id: "editorial-sand", label: "Editorial Sand", description: "Light · beige" },
  { id: "sage-cream", label: "Sage & Cream", description: "Light · sage" },
  { id: "lavender-paper", label: "Lavender Paper", description: "Light · purple" },
  { id: "terracotta-sunset", label: "Terracotta Sunset", description: "Light · orange" },
  { id: "rose-quartz", label: "Rose Quartz", description: "Light · pink" },
  { id: "electric-pop", label: "Electric Pop", description: "Dark · neon coral" },
  { id: "arctic-bloom", label: "Arctic Bloom", description: "Light · ice blue" },
] as const;
export type ColorThemeId = (typeof colorThemeCatalog)[number]["id"];
const themeIds = new Set<string>(colorThemeCatalog.map((theme) => theme.id));
export function isColorTheme(value: unknown): value is ColorThemeId { return typeof value === "string" && themeIds.has(value); }
export const DEFAULT_COLOR_THEME: ColorThemeId = "cinema-crimson";
