'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// ── Types ──────────────────────────────────────────────────────
interface ProtectedRouteProps {
  children: React.ReactNode;
  /** The path to redirect unauthenticated users. Defaults to /login. */
  redirectTo?: string;
  /** Optional: a loading skeleton to show while the session loads. */
  loadingFallback?: React.ReactNode;
}

// ── Loading Skeleton ───────────────────────────────────────────
function DefaultLoadingFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Loading session…</p>
      </div>
    </div>
  );
}

// ── ProtectedRoute ─────────────────────────────────────────────
/**
 * Wraps any page or layout that requires authentication.
 *
 * - While the session is being resolved: renders `loadingFallback`.
 * - If the user is unauthenticated:       redirects to `redirectTo`.
 * - If the user is authenticated:         renders `children`.
 *
 * Usage (inside a layout or page):
 *   <ProtectedRoute>
 *     <DashboardContent />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({
  children,
  redirectTo = '/login',
  loadingFallback = <DefaultLoadingFallback />,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(redirectTo);
    }
  }, [isLoading, user, router, redirectTo]);

  // Still resolving the session — show skeleton
  if (isLoading) return <>{loadingFallback}</>;

  // Not authenticated — nothing to render (redirect is in-flight)
  if (!user) return null;

  // Authenticated
  return <>{children}</>;
}
