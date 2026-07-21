'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ── Validation ─────────────────────────────────────────────────
interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validateLoginForm(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }
  return errors;
}

// ── Page ───────────────────────────────────────────────────────
export default function LoginPage() {
  const { login, isSubmitting } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Sign in failed. Please try again.',
      });
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-16">
      {/* ── Ambient background glow ─────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-700/8 blur-[100px]" />
      </div>

      <div className="w-full max-w-[420px] animate-fade-up">
        {/* ── Wordmark ──────────────────────────────────────── */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block font-display text-2xl font-bold text-gradient focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
          >
            DeveloperMoy
          </Link>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Sign in to continue
          </p>
        </div>

        {/* ── Card ──────────────────────────────────────────── */}
        <div className="glass rounded-[var(--radius-xl)] p-8 shadow-card">
          {/* General error banner */}
          {errors.general && (
            <div
              role="alert"
              className="mb-5 rounded-[var(--radius-sm)] border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Email */}
            <Input
              id="login-email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail size={15} />}
              disabled={isSubmitting}
            />

            {/* Password */}
            <Input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              leftIcon={<Lock size={15} />}
              rightIcon={
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              disabled={isSubmitting}
            />

            {/* Forgot password */}
            <div className="-mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-[hsl(var(--muted-foreground))] hover:text-brand-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              id="login-submit"
              type="submit"
              size="lg"
              className="w-full mt-1 gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-[hsl(var(--border))]" />
            <span className="text-xs text-[hsl(var(--muted-foreground))]">or</span>
            <div className="flex-1 border-t border-[hsl(var(--border))]" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-brand-400 hover:text-brand-300 transition-colors underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
