"use client";

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where, type DocumentData, type QueryConstraint, type Unsubscribe } from "firebase/firestore";
import { db } from "./firebase";

export const COLLECTIONS = {
  users: "users", siteSettings: "site_settings", posts: "posts", leads: "leads", projects: "projects", transactions: "transactions", content: "content_calendar", contacts: "contact_submissions", newsletter: "newsletter", pageViews: "page_views", portfolio: "portfolio", files: "files", testimonials: "testimonials", notifications: "notifications"
} as const;

export async function addDocument<T extends object>(collectionName: string, data: Omit<T, "id">) { const ref = await addDoc(collection(db, collectionName), data as DocumentData); return ref.id; }
export async function getDocuments<T>(collectionName: string, ...constraints: QueryConstraint[]) { const snap = await getDocs(query(collection(db, collectionName), ...constraints)); return snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as T)); }
export async function getDocument<T>(collectionName: string, id: string) { const snap = await getDoc(doc(db, collectionName, id)); return snap.exists() ? ({ id: snap.id, ...snap.data() } as unknown as T) : null; }
export async function updateDocument<T extends object>(collectionName: string, id: string, data: Partial<T>) { await updateDoc(doc(db, collectionName, id), data as DocumentData); }
export async function deleteDocument(collectionName: string, id: string) { await deleteDoc(doc(db, collectionName, id)); }
export async function queryDocuments<T>(collectionName: string, field: string, operator: "==" | "<" | "<=" | ">" | ">=", value: unknown) { return getDocuments<T>(collectionName, where(field, operator, value)); }
export function subscribeToCollection<T>(collectionName: string, callback: (data: T[]) => void, ...constraints: QueryConstraint[]): Unsubscribe { return onSnapshot(query(collection(db, collectionName), ...constraints), snap => callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as T)))); }
export function subscribeToDocument<T>(collectionName: string, id: string, callback: (data: T | null) => void) { return onSnapshot(doc(db, collectionName, id), snap => callback(snap.exists() ? ({ id: snap.id, ...snap.data() } as unknown as T) : null)); }
export const byUpdatedDesc = orderBy("updatedAt", "desc");
