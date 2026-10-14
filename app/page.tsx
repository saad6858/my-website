"use client";
import { CinematicOpening } from "@/components/animations/CinematicOpening";
import { PublicComposition } from "@/components/layouts/PublicComposition";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { isLayoutDesign } from "@/lib/design-catalog";
export default function Home() {
  const { settings, loading } = useSiteSettings();
  if (loading) return <div className="min-h-screen" aria-busy="true" />;
  const layout = isLayoutDesign(settings.appearance.layoutDesign) ? settings.appearance.layoutDesign : "cinema-index";
  const showOpening = (["cinema-index", "split-canvas", "launchpad-constellation"] as readonly string[]).includes(layout);
  return <>{showOpening ? <CinematicOpening /> : null}<PublicComposition settings={settings} layout={layout} /></>;
}
