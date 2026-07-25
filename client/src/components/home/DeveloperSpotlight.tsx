'use client';

import Image from 'next/image';
import { Terminal, Code2, Sparkles, Github, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DeveloperSpotlight() {
  return (
    <section className="relative border-t border-[hsl(var(--border))] bg-surface-950/80 py-20">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Avatar Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-surface-900/60 p-2 shadow-card-hover">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-950">
                <Image
                  src="/images/developer-avatar.png"
                  alt="Moloy Krishna Paul - Lead Full Stack Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent opacity-50" />
              </div>

              {/* Status floating pill */}
              <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-[hsl(var(--border))] bg-background/90 p-3 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[hsl(var(--foreground))]">
                      Moloy Krishna Paul
                    </h4>
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                      Senior Full-Stack Engineer & Architect
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Tech Manifesto */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
              <Sparkles size={13} />
              About DeveloperMoy
            </div>
            
            <h2 className="font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl leading-tight">
              Engineering High-Performance Web Ecosystems & Scalable APIs
            </h2>

            <p className="mt-4 text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans">
              I specialize in building production-grade web applications using Next.js 15, TypeScript, Node.js Express, and MongoDB. Passionate about sleek modern UI design systems, continuous delivery, and clean code architecture.
            </p>

            {/* Quick Skills list */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-mono text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-surface-900/40 p-2.5">
                <Terminal size={14} className="text-brand-400" />
                <span>Next.js 15 App Router</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-surface-900/40 p-2.5">
                <Code2 size={14} className="text-brand-400" />
                <span>Strict TypeScript 5</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-surface-900/40 p-2.5">
                <Globe size={14} className="text-brand-400" />
                <span>Express & Node REST</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] bg-surface-900/40 p-2.5">
                <Github size={14} className="text-brand-400" />
                <span>MongoDB & Mongoose</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Button size="default" asChild className="gap-2 shadow-glow-sm">
                <a href="https://github.com/iMoloy" target="_blank" rel="noopener noreferrer">
                  <Github size={16} />
                  GitHub Profile
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
