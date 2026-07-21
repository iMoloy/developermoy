'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// ── Validation ─────────────────────────────────────────────────
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

function validateRegisterForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim()) {
    errors.name = 'Full name is required.';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Include at least one uppercase letter.';
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Include at least one number.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

// ── Password strength indicator ────────────────────────────────
function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 3) return { score, label: 'Fair', color: 'bg-amber-500' };
  return { score, label: 'Strong', color: 'bg-emerald-500' };
}

// ── Page ───────────────────────────────────────────────────────
export default function RegisterPage() {
  const { register, isSubmitting } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const strength = getPasswordStrength(password);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateRegisterForm(name, email, password, confirmPassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register(name.trim(), email, password);
      router.push('/dashboard');
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Registration failed. Please try again.',
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
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-brand-700/8 blur-[100px]" />
      </div>

      <div className="w-full max-w-[440px] animate-fade-up">
        {/* ── Wordmark ──────────────────────────────────────── */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="inline-block font-display text-2xl font-bold text-gradient focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
          >
            DeveloperMoy
          </Link>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Create your account
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
            {/* Full name */}
            <Input
              id="register-name"
              type="text"
              label="Full name"
              placeholder="Moloy Krishna Paul"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              leftIcon={<User size={15} />}
              disabled={isSubmitting}
            />

            {/* Email */}
            <Input
              id="register-email"
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
            <div className="flex flex-col gap-1.5">
              <Input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="Min. 8 characters"
                autoComplete="new-password"
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

              {/* Password strength bar */}
              {password && (
                <div className="flex items-center gap-2 px-0.5">
                  <div className="flex flex-1 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < strength.score ? strength.color : 'bg-[hsl(var(--border))]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <Input
              id="register-confirm-password"
              type={showConfirm ? 'text' : 'password'}
              label="Confirm password"
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              leftIcon={
                confirmPassword && confirmPassword === password ? (
                  <Check size={15} className="text-emerald-400" />
                ) : (
                  <Lock size={15} />
                )
              }
              rightIcon={
                <button
                  type="button"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  onClick={() => setShowConfirm((v) => !v)}
                  className="flex items-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              disabled={isSubmitting}
            />

            {/* Terms notice */}
            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-brand-400 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-brand-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Submit */}
            <Button
              id="register-submit"
              type="submit"
              size="lg"
              className="w-full gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
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

          {/* Login link */}
          <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-brand-400 hover:text-brand-300 transition-colors underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
