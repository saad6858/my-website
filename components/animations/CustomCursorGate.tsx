"use client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { CustomCursor } from "./CustomCursor";
export function CustomCursorGate(){const {settings}=useSiteSettings();return settings.appearance.enableCustomCursor?<CustomCursor/>:null}
