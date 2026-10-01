"use client";
import { GoogleAuthProvider, browserLocalPersistence, onAuthStateChanged as firebaseOnAuthStateChanged, sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut, updateProfile, type User as FirebaseUser } from "firebase/auth";
import { auth } from "./firebase";

async function postSession(idToken: string) {
  const response = await fetch("/api/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ idToken }) });
  if (!response.ok) throw new Error((await response.json().catch(() => ({}))).error || "Unable to establish session");
}

export async function establishSession(user: FirebaseUser) { await postSession(await user.getIdToken(true)); }
export async function signInWithEmail(email: string, password: string) { await setPersistence(auth, browserLocalPersistence); const result = await signInWithEmailAndPassword(auth, email, password); await establishSession(result.user); return result.user; }
export async function signInWithGoogle() { await setPersistence(auth, browserLocalPersistence); const result = await signInWithPopup(auth, new GoogleAuthProvider()); await establishSession(result.user); return result.user; }
export async function signOut() { await fetch("/api/auth/logout", { method: "POST" }); await firebaseSignOut(auth); }
export function getCurrentUser() { return auth.currentUser; }
export function onAuthStateChanged(callback: (user: FirebaseUser | null) => void) { return firebaseOnAuthStateChanged(auth, callback); }
export async function resetPassword(email: string) { await sendPasswordResetEmail(auth, email); }
export async function updateUserProfile(displayName: string, photoURL?: string) { if (!auth.currentUser) throw new Error("Not authenticated"); await updateProfile(auth.currentUser, { displayName, photoURL: photoURL || null }); }
export async function isAdmin(user: FirebaseUser | null) { if (!user) return false; const token = await user.getIdTokenResult(); return token.claims.admin === true; }
