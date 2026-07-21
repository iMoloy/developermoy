'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, User, ChevronDown, Code2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ── Nav links config ───────────────────────────────────────────
const publicLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
] as const;

const authLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
] as const;

// ── NavLink ────────────────────────────────────────────────────
function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative text-sm font-medium transition-colors duration-150',
        'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full',
        'after:origin-left after:scale-x-0 after:bg-brand-400',
        'after:transition-transform after:duration-200 hover:after:scale-x-100',
        active
          ? 'text-brand-400 after:scale-x-100'
          : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
      )}
    >
      {label}
    </Link>
  );
}

// ── User dropdown ──────────────────────────────────────────────
function UserDropdown({
  name,
  email,
  onLogout,
}: {
  name: string;
  email: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="User menu"
        className={cn(
          'flex items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5',
          'text-sm font-medium text-[hsl(var(--foreground))]',
          'hover:bg-[hsl(var(--accent))] transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
        )}
      >
        {/* Avatar */}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-400">
          {initials}
        </span>
        <span className="hidden sm:block max-w-[120px] truncate">{name}</span>
        <ChevronDown
          size={14}
          className={cn(
            'text-[hsl(var(--muted-foreground))] transition-transform duration-150',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className={cn(
            'absolute right-0 top-full mt-2 w-52',
            'glass rounded-[var(--radius)] border border-[hsl(var(--border))] shadow-card-hover',
            'z-50 animate-fade-in overflow-hidden'
          )}
        >
          {/* User info header */}
          <div className="border-b border-[hsl(var(--border))] px-4 py-3">
            <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{name}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{email}</p>
          </div>

          {/* Menu items */}
          <div className="p-1">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
            >
              <User size={14} className="text-[hsl(var(--muted-foreground))]" />
              Profile
            </Link>

            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────
export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for border + blur enhancement
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const links = user ? authLinks : publicLinks;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        'transition-[background-color,border-color,backdrop-filter] duration-200',
        scrolled
          ? 'border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/0.85] backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-6">
        {/* ── Wordmark ──────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
        >
          <Code2 size={20} className="text-brand-400" />
          <span className="text-gradient">DeveloperMoy</span>
        </Link>

        {/* ── Desktop nav ───────────────────────────────────── */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              active={pathname === href || pathname.startsWith(href + '/')}
            />
          ))}
        </nav>

        {/* ── Desktop auth actions ──────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            // Skeleton
            <div className="h-8 w-24 animate-pulse rounded-[var(--radius-sm)] bg-[hsl(var(--muted))]" />
          ) : user ? (
            <UserDropdown
              name={user.name}
              email={user.email}
              onLogout={logout}
            />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* ── Mobile toggle ─────────────────────────────────── */}
        <button
          className="flex md:hidden items-center justify-center rounded-[var(--radius-sm)] p-2 text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="false"
          aria-label="Mobile navigation"
          className={cn(
            'md:hidden border-t border-[hsl(var(--border))]',
            'bg-[hsl(var(--background))/0.96] backdrop-blur-md',
            'animate-fade-in'
          )}
        >
          <nav className="container-wide flex flex-col gap-1 py-4">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === href || pathname.startsWith(href + '/')
                    ? 'bg-brand-500/10 text-brand-400'
                    : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]'
                )}
              >
                {label}
              </Link>
            ))}

            {/* Auth actions in mobile */}
            <div className="mt-3 border-t border-[hsl(var(--border))] pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-3 pb-1">
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">{user.name}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
                  >
                    <User size={14} />
                    Profile
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); void logout(); }}
                    className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <Link href="/register" onClick={() => setMobileOpen(false)}>Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
