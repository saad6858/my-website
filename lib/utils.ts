import { Timestamp } from "firebase/firestore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function toDate(value: Date | Timestamp | null | undefined): Date {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  return new Date(value as unknown as string);
}
export function formatDate(date: Date | Timestamp | null | undefined) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(toDate(date));
}
export function formatCurrency(amount: number, currency = "₨") {
  return `${currency}${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)}`;
}
export function formatRelativeTime(date: Date | Timestamp | null | undefined) {
  const d = toDate(date).getTime();
  const diff = Date.now() - d;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const mins = Math.round(diff / 60000);
  if (Math.abs(mins) < 60) return rtf.format(-mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) return rtf.format(-days, "day");
  return formatDate(toDate(date));
}
export function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
export function generateId() { return crypto.randomUUID(); }
export function truncate(text: string, length: number) { return text.length <= length ? text : `${text.slice(0, length - 1).trim()}…`; }
export function calculateReadTime(content: string) { return Math.max(1, Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 200)); }
export function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  return [headers.map(escape).join(","), ...rows.map(r => headers.map(h => escape(r[h])).join(","))].join("\n");
}
export function isSameDay(a: Date, b: Date) { return a.toDateString() === b.toDateString(); }
export function getGreeting(hour = new Date().getHours()) { return hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening"; }
