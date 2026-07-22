'use client';

import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import Hero from './Hero';
import ValueProposition from './ValueProposition';
import FeaturedProjects from './FeaturedProjects';
import { Button } from '@/components/ui/button';

/**
 * HomePage — Main landing view assembling Hero, ValueProposition, FeaturedProjects, and CTA banner.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* ── 1. Hero Section ──────────────────────────────────── */}
      <Hero />

      {/* ── 2. Value Proposition Section ─────────────────────── */}
      <ValueProposition />

      {/* ── 3. Featured Projects Showcase Section ────────────── */}
      <FeaturedProjects />

      {/* ── 4. Call to Action Banner Section ─────────────────── */}
      <section className="relative border-t border-[hsl(var(--border))] bg-surface-950/60 py-20">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-r from-surface-900 via-surface-900 to-brand-950/40 p-8 sm:p-12 md:p-16">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
                Let's Collaborate
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
                Ready to Build Something Extraordinary?
              </h2>
              <p className="mt-4 text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans">
                Whether you have an ambitious web app project, open-source opportunity, or architectural inquiry, I'm always open to discussing tech and engineering solutions.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" asChild className="gap-2 shadow-glow-sm">
                  <a href="mailto:moloy.paul@example.com">
                    <Mail size={16} />
                    Get in Touch
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="gap-2">
                  <Link href="/about">
                    About the Developer
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Ambient Background Graphic */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-500/10 blur-[100px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
