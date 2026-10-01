"use client";
import { defaultSiteSettings } from "@/lib/site-defaults";
import { useSiteSettingsContext } from "@/components/providers/SiteSettingsProvider";

export { defaultSiteSettings };
export function useSiteSettings() {
  return useSiteSettingsContext();
}
