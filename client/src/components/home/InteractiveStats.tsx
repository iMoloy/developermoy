'use client';

import { useState } from 'react';
import { ShieldCheck, Zap, Code2, Server, CheckCircle2 } from 'lucide-react';

const stats = [
  {
    label: 'Type Safety Rate',
    value: '100%',
    description: 'Strict TypeScript & Zero Implicit Anys',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    label: 'Production Apps',
    value: '10+',
    description: 'Deploys on Vercel & Render',
    icon: Code2,
    color: 'text-brand-400',
    bg: 'bg-brand-500/10 border-brand-500/20',
  },
  {
    label: 'Deployment Uptime',
    value: '99.9%',
    description: 'Automated CI/CD Pipelines',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    label: 'API Response Speed',
    value: '< 100ms',
    description: 'Optimized MongoDB & Express',
    icon: Server,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
];

export default function InteractiveStats() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="relative py-12 border-y border-[hsl(var(--border))] bg-surface-950/40">
      <div className="container-wide">
        {/* Live Availability Badge */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Stack Consulting & Development</span>
            <CheckCircle2 size={13} className="text-emerald-400" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isHovered = activeIdx === idx;
            return (
              <div
                key={stat.label}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 ${
                  isHovered
                    ? 'border-brand-400/50 bg-surface-900 shadow-card-hover -translate-y-1'
                    : 'border-[hsl(var(--border))] bg-surface-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    {stat.value}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    {stat.description}
                  </p>
                </div>

                {/* Subtle bottom glow indicator */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
