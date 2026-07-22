'use client';

import Link from 'next/link';
import { ArrowRight, Github, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero section — Minimalist, high-impact landing header.
 * Utilizes Cabinet Grotesk (font-display) and Satoshi (font-sans) Fontshare typography.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* ── Ambient Background Glow ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[130px]" />
        <div className="absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-brand-400/5 blur-[100px]" />
      </div>

      <div className="container-wide flex flex-col items-center text-center">
        {/* ── Eyebrow Badge ─────────────────────────────────────── */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/5 px-3.5 py-1.5 text-xs font-medium text-brand-400 backdrop-blur-xs transition-colors hover:border-brand-500/40">
          <Sparkles size={13} className="text-brand-400 animate-pulse" />
          <span>Full-Stack Developer Platform</span>
          <span className="h-1 w-1 rounded-full bg-brand-400/60" />
          <span className="text-[hsl(var(--muted-foreground))]">v1.0 Ready</span>
        </div>

        {/* ── Main Headline ──────────────────────────────────────── */}
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
          Architecting Modern <br className="hidden sm:inline" />
          <span className="text-gradient">Web Applications</span> with Elegance
        </h1>

        {/* ── Subtitle / Lead ────────────────────────────────────── */}
        <p className="mt-6 max-w-2xl text-base text-[hsl(var(--muted-foreground))] sm:text-lg md:text-xl leading-relaxed font-sans">
          A high-performance personal developer ecosystem built with Next.js 15, Node.js, TypeScript, and MongoDB. Showcasing software architecture, open-source projects, and technical writing.
        </p>

        {/* ── CTA Buttons ────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" asChild className="w-full sm:w-auto group gap-2 shadow-glow-sm">
            <Link href="/projects">
              Explore Projects
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto gap-2">
            <a
              href="https://github.com/iMoloy/developermoy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              View Source
            </a>
          </Button>
        </div>

        {/* ── Tech Stack Pill Strip ─────────────────────────────── */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center gap-1.5 rounded-md border border-[hsl(var(--border))] bg-surface-900/60 px-2.5 py-1">
            <Terminal size={12} className="text-brand-400" />
            Next.js 15 App Router
          </span>
          <span className="rounded-md border border-[hsl(var(--border))] bg-surface-900/60 px-2.5 py-1">
            TypeScript 5
          </span>
          <span className="rounded-md border border-[hsl(var(--border))] bg-surface-900/60 px-2.5 py-1">
            Node.js & Express
          </span>
          <span className="rounded-md border border-[hsl(var(--border))] bg-surface-900/60 px-2.5 py-1">
            MongoDB Mongoose
          </span>
          <span className="rounded-md border border-[hsl(var(--border))] bg-surface-900/60 px-2.5 py-1">
            Tailwind CSS
          </span>
        </div>
      </div>
    </section>
  );
}
