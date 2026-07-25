'use client';

import Image from 'next/image';
import { Cpu, ShieldCheck, Zap, Layers, Code, Cloud } from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
  image?: string;
}

const features: FeatureItem[] = [
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & CI/CD',
    description:
      'Structured for multi-environment cloud deployments — Next.js client on Vercel and Express API server on Render.',
    badge: 'Cloud',
    image: '/images/arch-cloud.png',
  },
  {
    icon: ShieldCheck,
    title: 'End-to-End Type Safety & Security',
    description:
      'Strict TypeScript implementation across database schemas, REST endpoints, context state, and client UI components.',
    badge: 'Security',
    image: '/images/arch-security.png',
  },
  {
    icon: Cpu,
    title: 'Monorepo Architecture & Modular Specs',
    description:
      'Turborepo organization keeping client and server logic cleanly separated while sharing configuration rules.',
    badge: 'Architecture',
    image: '/images/arch-monorepo.png',
  },
  {
    icon: Zap,
    title: 'High-Performance Next.js 15',
    description:
      'Engineered with Next.js 15 App Router and Express.js, delivering fast page transitions and optimized server loads.',
  },
  {
    icon: Layers,
    title: 'Modular Design System & Typography',
    description:
      'Clean typography with Fontshare Satoshi & Cabinet Grotesk, custom dark mode surface palettes, and accessible UI primitives.',
  },
  {
    icon: Code,
    title: 'MongoDB & Express Data Layer',
    description:
      'Robust schema design with Mongoose ORM, index optimization, and secure JSON response normalization.',
  },
];

/**
 * ValueProposition section — Feature grid with 3D architecture image previews.
 */
export default function ValueProposition() {
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-surface-950/40 py-20 md:py-24">
      <div className="container-wide">
        {/* ── Section Header ───────────────────────────────────── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
            Platform Pillars
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
            Built with Engineering Discipline
          </h2>
          <p className="mt-4 text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans">
            Designed to embody full-stack best practices — combining minimalist UI aesthetics with robust software architecture.
          </p>
        </div>

        {/* ── Feature Grid ─────────────────────────────────────── */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 transition-all duration-300 hover:border-brand-500/40 hover:bg-surface-900/90 hover:shadow-card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Image Graphic Preview if available */}
                  {feature.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[hsl(var(--border))] bg-surface-950">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10 text-brand-400 group-hover:scale-110 transition-transform duration-200">
                        <Icon size={20} />
                      </div>
                      {feature.badge && (
                        <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-brand-400 border border-brand-500/20">
                          {feature.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-[hsl(var(--foreground))] group-hover:text-brand-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
