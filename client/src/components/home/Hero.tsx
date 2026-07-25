'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero section — Immersive landing header with full-bleed 3D dashboard background layer.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-28 md:pb-36 border-b border-[hsl(var(--border))]">
      {/* ── 3D Dashboard Hero Background Image Layer ─────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        <Image
          src="/images/hero-mockup.png"
          alt="Platform Background Preview"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 scale-105 filter blur-xs"
        />
        {/* Dark Radial & Gradient Overlay for Perfect Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))/0.75] via-[hsl(var(--background))/0.90] to-[hsl(var(--background))]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[hsl(var(--background))/0.5] to-[hsl(var(--background))]" />
      </div>

      {/* ── Ambient Glow Lighting ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[140px]" />
        <div className="absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-brand-400/10 blur-[110px]" />
      </div>

      <div className="container-wide flex flex-col items-center text-center relative z-10">
        {/* ── Eyebrow Badge ─────────────────────────────────────── */}
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-400 backdrop-blur-md shadow-sm transition-colors hover:border-brand-500/50">
          <Sparkles size={13} className="text-brand-400 animate-pulse" />
          <span>Full-Stack Developer Platform</span>
          <span className="h-1 w-1 rounded-full bg-brand-400/60" />
          <span className="text-[hsl(var(--muted-foreground))]">v1.0 Ready</span>
        </div>

        {/* ── Main Headline ──────────────────────────────────────── */}
        <h1 className="mt-8 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
          Architecting Modern <br className="hidden sm:inline" />
          <span className="text-gradient">Web Applications</span> with Elegance
        </h1>

        {/* ── Subtitle / Lead ────────────────────────────────────── */}
        <p className="mt-6 max-w-2xl text-base text-[hsl(var(--muted-foreground))] sm:text-lg md:text-xl leading-relaxed font-sans drop-shadow-sm">
          A high-performance personal developer ecosystem built with Next.js 15, Node.js, TypeScript, and MongoDB. Showcasing software architecture, open-source projects, and technical writing.
        </p>

        {/* ── CTA Buttons ────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button size="lg" asChild className="w-full sm:w-auto group gap-2 shadow-glow-sm">
            <Link href="/projects">
              Explore Projects
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto gap-2 backdrop-blur-md bg-background/50">
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
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5 text-xs font-mono text-[hsl(var(--muted-foreground))]">
          <span className="flex items-center gap-1.5 rounded-lg border border-[hsl(var(--border))] bg-surface-900/80 backdrop-blur-md px-3 py-1.5 shadow-sm">
            <Terminal size={13} className="text-brand-400" />
            Next.js 15 App Router
          </span>
          <span className="rounded-lg border border-[hsl(var(--border))] bg-surface-900/80 backdrop-blur-md px-3 py-1.5 shadow-sm">
            TypeScript 5
          </span>
          <span className="rounded-lg border border-[hsl(var(--border))] bg-surface-900/80 backdrop-blur-md px-3 py-1.5 shadow-sm">
            Node.js & Express
          </span>
          <span className="rounded-lg border border-[hsl(var(--border))] bg-surface-900/80 backdrop-blur-md px-3 py-1.5 shadow-sm">
            MongoDB Mongoose
          </span>
          <span className="rounded-lg border border-[hsl(var(--border))] bg-surface-900/80 backdrop-blur-md px-3 py-1.5 shadow-sm">
            Tailwind CSS
          </span>
        </div>
      </div>
    </section>
  );
}
