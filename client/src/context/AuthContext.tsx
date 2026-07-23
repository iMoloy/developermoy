'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createAuthClient } from 'better-auth/react';

// ── Better Auth client ─────────────────────────────────────────
// Communicates with the Better Auth handler at /api/auth/*
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
});

// ── Types ──────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

export interface AuthContextValue {
  /** Currently authenticated user, or null if signed out */
  user: AuthUser | null;
  /** True while the initial session is being loaded */
  isLoading: boolean;
  /** True if a sign-in / sign-out / sign-up action is in progress */
  isSubmitting: boolean;
  /** Sign in with email + password. Throws on failure. */
  login: (email: string, password: string) => Promise<void>;
  /** Sign up with name + email + password. Throws on failure. */
  register: (name: string, email: string, password: string) => Promise<void>;
  /** Sign out the current user. */
  logout: () => Promise<void>;
}

// ── Context ────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ── Hook ───────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return ctx;
}

// ── Provider ───────────────────────────────────────────────────
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Sync user to our MongoDB after successful auth ────────────
  const syncUserToBackend = useCallback(async (): Promise<void> => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'}/v1/auth/verify`,
        {
          method: 'POST',
          credentials: 'include', // forward session cookie
        }
      );
    } catch {
      // Non-fatal: sync failure does not block the client session
      console.warn('[auth] Failed to sync user to backend.');
    }
  }, []);

  // ── Load initial session on mount ────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadSession(): Promise<void> {
      try {
        const { data } = await authClient.getSession();
        if (!cancelled) {
          setUser(
            data?.user
              ? {
                  id: data.user.id,
                  name: data.user.name,
                  email: data.user.email,
                  image: data.user.image ?? null,
                }
              : null
          );
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Login ─────────────────────────────────────────────────────
  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setIsSubmitting(true);
      try {
        const { data, error } = await authClient.signIn.email({ email, password });

        if (error) {
          throw new Error(error.message ?? 'Sign in failed. Please try again.');
        }

        if (data?.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image ?? null,
          });
          await syncUserToBackend();
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [syncUserToBackend]
  );

  // ── Register ──────────────────────────────────────────────────
  const register = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      setIsSubmitting(true);
      try {
        const { data, error } = await authClient.signUp.email({ name, email, password });

        if (error) {
          throw new Error(error.message ?? 'Registration failed. Please try again.');
        }

        if (data?.user) {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image ?? null,
          });
          await syncUserToBackend();
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [syncUserToBackend]
  );

  // ── Logout ────────────────────────────────────────────────────
  const logout = useCallback(async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await authClient.signOut();
      setUser(null);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, isSubmitting, login, register, logout }),
    [user, isLoading, isSubmitting, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
