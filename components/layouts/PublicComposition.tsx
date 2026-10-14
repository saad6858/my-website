"use client";
import { Fragment, type ReactNode } from "react";
import type { SiteSettings } from "@/types";
import type { LayoutDesignId } from "@/lib/design-catalog";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Portfolio } from "@/components/sections/Portfolio";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABanner } from "@/components/sections/CTABanner";

type SectionKey = "hero" | "stats" | "about" | "services" | "process" | "pricing" | "portfolio" | "testimonials" | "blog" | "faq" | "cta" | "contact";

/** Newly authored public section JSX, arranged into one of fifteen independent compositions. */
const sectionOrder: Record<LayoutDesignId, SectionKey[]> = {
  "cinema-index": ["hero", "stats", "about", "services", "process", "pricing", "portfolio", "testimonials", "blog", "faq", "cta", "contact"],
  "editorial-asymmetric": ["hero", "about", "portfolio", "blog", "services", "stats", "process", "testimonials", "pricing", "faq", "cta", "contact"],
  "swiss-grid": ["hero", "stats", "services", "portfolio", "about", "process", "pricing", "testimonials", "faq", "blog", "cta", "contact"],
  "bento-studio": ["hero", "services", "portfolio", "about", "stats", "pricing", "process", "testimonials", "blog", "faq", "cta", "contact"],
  "split-canvas": ["hero", "about", "services", "portfolio", "stats", "process", "testimonials", "pricing", "blog", "faq", "cta", "contact"],
  "modern-brutalist": ["hero", "portfolio", "services", "about", "stats", "process", "pricing", "blog", "testimonials", "faq", "cta", "contact"],
  "monochrome-minimal": ["hero", "about", "stats", "portfolio", "services", "process", "blog", "testimonials", "pricing", "faq", "cta", "contact"],
  "terminal-builder": ["hero", "services", "process", "portfolio", "stats", "about", "pricing", "testimonials", "blog", "faq", "cta", "contact"],
  "horizontal-showcase": ["hero", "portfolio", "services", "stats", "about", "testimonials", "process", "pricing", "blog", "faq", "cta", "contact"],
  "story-timeline": ["hero", "about", "stats", "process", "services", "portfolio", "testimonials", "blog", "pricing", "faq", "cta", "contact"],
  "case-study-gallery": ["hero", "portfolio", "about", "services", "process", "testimonials", "stats", "blog", "pricing", "faq", "cta", "contact"],
  "digital-magazine": ["hero", "blog", "portfolio", "about", "stats", "services", "process", "testimonials", "pricing", "faq", "cta", "contact"],
  "service-first-studio": ["hero", "services", "process", "pricing", "portfolio", "testimonials", "about", "stats", "blog", "faq", "cta", "contact"],
  "visual-mosaic": ["hero", "portfolio", "services", "blog", "about", "stats", "testimonials", "process", "pricing", "faq", "cta", "contact"],
  "launchpad-constellation": ["hero", "stats", "services", "portfolio", "process", "about", "testimonials", "pricing", "blog", "faq", "cta", "contact"],
};

export function PublicComposition({ settings, layout }: { settings: SiteSettings; layout: LayoutDesignId }) {
  const sections: Record<SectionKey, ReactNode> = {
    hero: settings.sections.hero ? <Hero /> : null,
    stats: settings.sections.stats ? <Stats /> : null,
    about: settings.sections.about ? <About /> : null,
    services: settings.sections.services ? <Services /> : null,
    process: settings.sections.process ? <Process /> : null,
    pricing: settings.sections.pricing ? <Pricing /> : null,
    portfolio: settings.sections.portfolio ? <Portfolio /> : null,
    testimonials: settings.sections.testimonials ? <Testimonials /> : null,
    blog: settings.sections.blog ? <Blog /> : null,
    faq: settings.sections.faq ? <FAQ /> : null,
    cta: <CTABanner />,
    contact: settings.sections.contact ? <Contact /> : null,
  };
  return <main data-layout-composition="true" data-layout-design={layout} className={`layout-composition layout-composition--${layout}`}>
    {sectionOrder[layout].map((key) => sections[key] ? <Fragment key={key}>{sections[key]}</Fragment> : null)}
  </main>;
}
