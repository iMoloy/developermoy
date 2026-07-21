import Link from 'next/link';
import { Code2, Github, Twitter, Mail, MapPin, ArrowUpRight } from 'lucide-react';

// ── Link data ──────────────────────────────────────────────────
const quickLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Dashboard', href: '/dashboard' },
] as const;

const supportLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
  { label: 'Changelog', href: '/changelog' },
] as const;

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/iMoloy',
    icon: Github,
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/',
    icon: Twitter,
  },
] as const;

// ── Footer column heading ──────────────────────────────────────
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
      {children}
    </h3>
  );
}

// ── Footer link ────────────────────────────────────────────────
function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors duration-150"
      >
        {children}
        {external && <ArrowUpRight size={11} className="opacity-60" />}
      </Link>
    </li>
  );
}

// ── Footer ─────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      {/* ── Main grid ─────────────────────────────────────── */}
      <div className="container-wide py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand column ─────────────────────────────── */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-sm"
            >
              <Code2 size={18} className="text-brand-400" />
              <span className="text-gradient">DeveloperMoy</span>
            </Link>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-[220px]">
              Personal developer platform by Moloy Krishna Paul — building things that matter.
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-brand-500/40 hover:bg-brand-500/10 hover:text-brand-400 transition-all duration-150"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ───────────────────────────────── */}
          <div>
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, href }) => (
                <FooterLink key={href} href={href}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Support ───────────────────────────────────── */}
          <div>
            <ColumnHeading>Support</ColumnHeading>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map(({ label, href }) => (
                <FooterLink key={href} href={href}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ──────────────────────────────── */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:moloy@example.com"
                  className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  <Mail size={13} className="shrink-0 text-brand-400" />
                  moloy@example.com
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <MapPin size={13} className="shrink-0 text-brand-400" />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors underline-offset-4 hover:underline"
                >
                  Send a message
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div className="border-t border-[hsl(var(--border))]">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            © {year} DeveloperMoy. Built by{' '}
            <Link
              href="https://moloy.is-a.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--foreground))] hover:text-brand-400 transition-colors"
            >
              Moloy Krishna Paul
            </Link>
            .
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Made with ♥ in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
