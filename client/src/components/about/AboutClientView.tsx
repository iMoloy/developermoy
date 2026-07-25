'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Terminal,
  Sparkles,
  Github,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/common/ContactModal';

const skills = [
  {
    category: 'Frontend Engineering',
    items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Shadcn UI & DaisyUI'],
    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js & Express', 'RESTful API Architecture', 'GraphQL', 'Authentication (Better Auth/Firebase)', 'Zod Validation'],
    color: 'text-brand-400 border-brand-500/20 bg-brand-500/10',
  },
  {
    category: 'Database & Data Models',
    items: ['MongoDB Atlas & Mongoose', 'PostgreSQL', 'Prisma ORM', 'Redis Caching', 'Data Modeling & Indexing'],
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  },
  {
    category: 'Cloud & DevOps',
    items: ['Vercel Platform', 'Render Cloud Hosting', 'Docker Containers', 'GitHub Actions CI/CD', 'Linux Administration'],
    color: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
  },
];

const timeline = [
  {
    year: '2024 — Present',
    role: 'Lead Architect & Full-Stack Developer',
    company: 'DeveloperMoy Ecosystem',
    description:
      'Designing and deploying production-ready monorepo web applications, microservices, and AI-assisted tooling with strict TypeScript typing.',
  },
  {
    year: '2023 — 2024',
    role: 'Senior React / Node.js Engineer',
    company: 'Cognix AI Studio',
    description:
      'Engineered real-time state synchronization, node graph canvas UI, and OpenAI API workflow orchestrations.',
  },
  {
    year: '2022 — 2023',
    role: 'Frontend Software Engineer',
    company: 'Nexus Tech Systems',
    description:
      'Developed high-performance client web applications, custom Figma design system tokens, and responsive UI components.',
  },
];

export default function AboutClientView() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-dvh">
      {/* ── 1. Hero Profile Header ───────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-[hsl(var(--border))] bg-surface-950/60">
        <div className="container-wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Developer Portrait Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-md overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-surface-900/80 p-2.5 shadow-card-hover">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-surface-950">
                  <Image
                    src="/images/developer-avatar.png"
                    alt="Moloy Krishna Paul"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent opacity-60" />
                </div>

                {/* Live Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-[hsl(var(--border))] bg-background/90 p-3.5 backdrop-blur-md shadow-md">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[hsl(var(--foreground))]">
                        Moloy Krishna Paul
                      </h4>
                      <p className="text-[11px] text-emerald-400">
                        🟢 Available for New Projects & Consulting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Intro */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 text-xs font-medium text-brand-400 w-fit">
                <Sparkles size={13} />
                Full-Stack Engineer & Architect
              </div>

              <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl leading-tight">
                Hi, I'm <span className="text-gradient">Moloy Krishna Paul</span>
              </h1>

              <p className="mt-5 text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans sm:text-lg">
                I build high-performance web applications, modern design systems, and robust REST APIs. With an obsessive focus on engineering quality, strict TypeScript typing, and clean UI aesthetics, I transform ideas into scalable digital products.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" onClick={() => setContactOpen(true)} className="gap-2 shadow-glow-sm cursor-pointer">
                  <Mail size={16} />
                  Get in Touch
                </Button>
                <Button variant="outline" size="lg" asChild className="gap-2">
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

      {/* ── 2. Tech Stack & Skills Grid ─────────────────────────── */}
      <section className="py-20 border-b border-[hsl(var(--border))]">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Technical Capabilities
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
              Core Engineering Stack
            </h2>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
              Technologies and frameworks I utilize to build production applications.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div
                key={s.category}
                className="rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 transition-all hover:border-brand-400/40 hover:bg-surface-900/80"
              >
                <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold ${s.color}`}>
                  <Terminal size={14} />
                  {s.category}
                </div>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                      <CheckCircle2 size={13} className="text-brand-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Engineering Experience Timeline ───────────────────── */}
      <section className="py-20 bg-surface-950/40 border-b border-[hsl(var(--border))]">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
              Career & Projects
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
              Engineering Milestones
            </h2>
          </div>

          <div className="mt-14 mx-auto max-w-3xl space-y-8">
            {timeline.map((item) => (
              <div
                key={item.role}
                className="relative rounded-xl border border-[hsl(var(--border))] bg-surface-900/60 p-6 sm:p-8 transition-all hover:border-brand-500/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[hsl(var(--border))] pb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
                      {item.role}
                    </h3>
                    <p className="text-xs font-medium text-brand-400 mt-0.5">
                      {item.company}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full border border-[hsl(var(--border))] bg-surface-950 px-3 py-1 text-xs font-mono text-[hsl(var(--muted-foreground))] w-fit">
                    {item.year}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Call to Action Banner ────────────────────────────── */}
      <section className="py-20">
        <div className="container-wide text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="font-display text-3xl font-bold text-[hsl(var(--foreground))]">
              Let's Build Something Together
            </h2>
            <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
              Have a project in mind or want to discuss technical architecture?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button size="lg" onClick={() => setContactOpen(true)} className="gap-2 shadow-glow-sm cursor-pointer">
                <Mail size={16} />
                Send a Message
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/projects">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
