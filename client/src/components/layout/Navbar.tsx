'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Code2, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ── Primary Navigation Links ───────────────────────────────────
const navLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
] as const;

// ── NavLink Component ──────────────────────────────────────────
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

// ── Navbar Component ───────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for border + backdrop blur enhancement
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
        {/* ── Brand Logo ──────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
        >
          <Code2 size={20} className="text-brand-400" />
          <span className="text-gradient">DeveloperMoy</span>
        </Link>

        {/* ── Desktop Navigation Links ────────────────────────── */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              active={pathname === href || pathname.startsWith(href + '/')}
            />
          ))}
        </nav>

        {/* ── Desktop Primary CTA ─────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" asChild className="gap-1.5 shadow-glow-sm">
            <a href="mailto:moloy.paul@example.com">
              Contact Us
              <ArrowUpRight size={14} />
            </a>
          </Button>
        </div>

        {/* ── Mobile Toggle Button ────────────────────────────── */}
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

      {/* ── Mobile Menu Dropdown ──────────────────────────────── */}
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
            {navLinks.map(({ label, href }) => (
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

            <div className="mt-3 border-t border-[hsl(var(--border))] pt-3">
              <Button size="sm" asChild className="w-full gap-1.5">
                <a href="mailto:moloy.paul@example.com" onClick={() => setMobileOpen(false)}>
                  Contact Us
                  <ArrowUpRight size={14} />
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
