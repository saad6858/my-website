"use client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { DesignSection } from "@/components/redesign/DesignFrame";
export function Stats() {
  const { settings } = useSiteSettings();
  const items = settings.stats.length ? settings.stats : [{ id: "focus", value: "01", label: "Clear problem first" }, { id: "build", value: "02", label: "Systems that connect" }, { id: "ship", value: "03", label: "Built to be maintained" }, { id: "human", value: "04", label: "Human control stays" }];
  return <DesignSection id="stats" className="redesign-stats"><div className="redesign-stats__grid grid grid-cols-2 border-y border-[var(--cine-border)] md:grid-cols-4">{items.slice(0, 4).map((item, i) => <article key={item.id || item.label} className="redesign-stat group relative min-h-36 border-[var(--cine-border)] p-5 sm:p-7 md:min-h-44 md:border-r md:last:border-r-0"><span className="font-mono text-[10px] tracking-[.2em] text-[var(--cine-muted)]">0{i + 1} / SIGNAL</span><div className="mt-5 text-3xl font-semibold tracking-[-.06em] text-[var(--cine-fg)] sm:text-4xl">{item.value}</div><p className="mt-2 text-xs leading-5 text-[var(--cine-muted)] sm:text-sm">{item.label}</p><span className="redesign-stat__accent absolute bottom-0 left-5 h-[2px] w-8 bg-[var(--cine-accent)] transition-all group-hover:w-16 sm:left-7"/></article>)}</div></DesignSection>;
}
