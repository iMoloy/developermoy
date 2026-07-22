'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Project } from '@/types';
import ProjectCard from './ProjectCard';
import { Button } from '@/components/ui/button';

// ── Mock Projects Data ──────────────────────────────────────────
const MOCK_FEATURED_PROJECTS: Project[] = [
  {
    _id: 'proj_1',
    ownerId: 'usr_1',
    title: 'DeveloperMoy Ecosystem',
    category: 'web',
    description:
      'Full-stack developer platform built with Next.js 15 App Router, Express, TypeScript, Mongoose, and custom design tokens.',
    images: [],
    status: 'published',
    tags: ['Next.js 15', 'TypeScript', 'Express', 'MongoDB', 'Tailwind'],
    githubUrl: 'https://github.com/iMoloy/developermoy',
    liveUrl: 'https://moloy.is-a.dev',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj_2',
    ownerId: 'usr_1',
    title: 'Cognix AI Studio',
    category: 'web',
    description:
      'AI-assisted script generator and media workflow orchestrator with real-time state sync and structured API management.',
    images: [],
    status: 'published',
    tags: ['React', 'Node.js', 'OpenAI API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/iMoloy/cognix',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'proj_3',
    ownerId: 'usr_1',
    title: 'AGY Autonomous Agent Suite',
    category: 'open-source',
    description:
      'Multi-agent orchestration framework for automated software diagnostics, continuous testing, and repository analysis.',
    images: [],
    status: 'published',
    tags: ['TypeScript', 'Node.js', 'AGY SDK', 'Docker'],
    githubUrl: 'https://github.com/iMoloy/agy-agents',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface FeaturedProjectsProps {
  projects?: Project[];
}

/**
 * FeaturedProjects section — Displays curated project cards in a responsive grid.
 */
export default function FeaturedProjects({
  projects = MOCK_FEATURED_PROJECTS,
}: FeaturedProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'open-source', label: 'Open Source' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative py-20 md:py-24">
      <div className="container-wide">
        {/* ── Section Header ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
              <Sparkles size={13} />
              Portfolio Showcase
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-base text-[hsl(var(--muted-foreground))] max-w-xl font-sans">
              Handcrafted applications, developer tools, and open-source packages.
            </p>
          </div>

          {/* Filter Pills + View All Button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1 rounded-lg border border-[hsl(var(--border))] bg-surface-900/60 p-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === cat.key
                      ? 'bg-brand-500 text-white shadow-xs'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex gap-1 group">
              <Link href="/projects">
                View All
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* ── Projects Grid ────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" size="default" asChild className="w-full gap-2">
            <Link href="/projects">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
