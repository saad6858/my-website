"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { SiteSettings } from "@/types";
import { defaultSiteSettings } from "@/lib/site-defaults";

type SiteSettingsContextValue={settings:SiteSettings;loading:boolean;refresh:()=>Promise<void>;updateSettings:(patch:Partial<SiteSettings>)=>Promise<void>};
const SiteSettingsContext=createContext<SiteSettingsContextValue|null>(null);
const merge=(data:Partial<SiteSettings>):SiteSettings=>({
  ...defaultSiteSettings,
  ...data,
  siteVersion:data.siteVersion??defaultSiteSettings.siteVersion,
  brand:{...defaultSiteSettings.brand,...data.brand},
  sections:{...defaultSiteSettings.sections,...data.sections},
  appearance:{...defaultSiteSettings.appearance,...data.appearance},
  announcement:{...defaultSiteSettings.announcement,...data.announcement},
  seo:{...defaultSiteSettings.seo,...data.seo},
  pricing:{...defaultSiteSettings.pricing,...data.pricing},
  contact:{...defaultSiteSettings.contact,...data.contact},
  notifications:{...defaultSiteSettings.notifications,...data.notifications},
  whatsappTemplates:{...defaultSiteSettings.whatsappTemplates,...data.whatsappTemplates},
  stats:data.stats?.length?data.stats:defaultSiteSettings.stats,
});
export function SiteSettingsProvider({children}:{children:React.ReactNode}){const [settings,setSettings]=useState(defaultSiteSettings);const [loading,setLoading]=useState(true);const refresh=useCallback(async()=>{try{const r=await fetch("/api/settings",{cache:"no-store"});if(r.ok)setSettings(merge(await r.json()))}catch{}finally{setLoading(false)}},[]);useEffect(()=>{void refresh()},[refresh]);const updateSettings=useCallback(async(patch:Partial<SiteSettings>)=>{const next=merge({...settings,...patch});setSettings(next);const r=await fetch("/api/settings",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(patch)});if(!r.ok){await refresh();throw new Error((await r.json().catch(()=>({}))).error||"Unable to save settings")}},[refresh,settings]);const value=useMemo(()=>({settings,loading,refresh,updateSettings}),[settings,loading,refresh,updateSettings]);return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>}
export function useSiteSettingsContext(){const ctx=useContext(SiteSettingsContext);if(!ctx)throw new Error("useSiteSettingsContext must be used inside SiteSettingsProvider");return ctx;}
