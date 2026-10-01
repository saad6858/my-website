"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { establishSession, onAuthStateChanged, resetPassword, signInWithEmail, signInWithGoogle, signOut } from "@/lib/auth";

export interface AuthContextValue {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<FirebaseUser>;
  signInWithGoogle: () => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAdmin: false,
  signIn: async () => { throw new Error("Auth unavailable"); },
  signInWithGoogle: async () => { throw new Error("Auth unavailable"); },
  signOut: async () => undefined,
  resetPassword: async () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => onAuthStateChanged(async (nextUser) => {
    setUser(nextUser);
    if (!nextUser) { setIsAdmin(false); setLoading(false); return; }
    try {
      await establishSession(nextUser);
      const response = await fetch("/api/auth/me", { cache: "no-store" });
      setIsAdmin(response.ok && Boolean((await response.json()).isAdmin));
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }), []);

  const value = useMemo(() => ({ user, loading, isAdmin, signIn: signInWithEmail, signInWithGoogle, signOut, resetPassword }), [user, loading, isAdmin]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
