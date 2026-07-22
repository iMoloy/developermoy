'use client';

import { Cpu, ShieldCheck, Zap, Layers, Code, Cloud } from 'lucide-react';

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
}

const features: FeatureItem[] = [
  {
    icon: Zap,
    title: 'High-Performance Architecture',
    description:
      'Engineered with Next.js 15 App Router and Express.js, delivering fast page transitions, optimized server loads, and instant interactions.',
    badge: 'Core',
  },
  {
    icon: Code,
    title: 'End-to-End Type Safety',
    description:
      'Strict TypeScript implementation across database schemas, REST endpoints, context state, and client UI components for maximum reliability.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Auth & Route Guards',
    description:
      'Integrated authentication flow with token validation, Mongoose user synchronization, and protected client route wrappers.',
  },
  {
    icon: Layers,
    title: 'Modular Design Tokens',
    description:
      'Clean typography with Fontshare Satoshi & Cabinet Grotesk, custom dark mode surface palettes, and accessible Shadcn & DaisyUI primitives.',
  },
  {
    icon: Cpu,
    title: 'Turborepo Workspaces',
    description:
      'Monorepo organization keeping client and server logic cleanly separated while sharing configuration rules and build pipelines.',
  },
  {
    icon: Cloud,
    title: 'Production-Ready CI/CD',
    description:
      'Structured for multi-environment cloud deployments — Next.js client on Vercel and Express API server on Render.',
  },
];

/**
 * ValueProposition section — Clean feature grid highlighting platform principles.
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
                className="group relative rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 transition-all duration-200 hover:border-brand-500/30 hover:bg-surface-900/80 hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10 text-brand-400 group-hover:scale-105 transition-transform duration-200">
                    <Icon size={20} />
                  </div>
                  {feature.badge && (
                    <span className="rounded-full bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-brand-400 border border-brand-500/20">
                      {feature.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-[hsl(var(--foreground))] group-hover:text-brand-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
