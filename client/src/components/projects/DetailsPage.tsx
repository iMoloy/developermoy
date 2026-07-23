'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Share2,
  Check,
  FolderGit2,
  User as UserIcon,
  Sparkles,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';
import type { Project } from '@/types';
import { getProjectByIdApi, getRelatedProjectsApi } from '@/lib/projectsApi';
import ProjectCard from '@/components/home/ProjectCard';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface DetailsPageProps {
  id: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  web: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  mobile: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  'open-source': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  design: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  other: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
};

/**
 * DetailsPage — Full single entity detail view for Projects.
 * Handles fetching GET /api/v1/projects/:id, rendering image gallery, overview, conversion action bar, and related items.
 */
export default function DetailsPage({ id }: DetailsPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const res = await getProjectByIdApi(id);
        setProject(res.data);

        // Fetch related projects
        const related = await getRelatedProjectsApi(id, res.data.category, 3);
        setRelatedProjects(related);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Failed to load project details'
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh pt-8 pb-24">
        <div className="container-wide animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="h-4 w-36 rounded bg-surface-800/60 mb-8" />

          {/* Hero Banner Skeleton */}
          <div className="aspect-[21/9] w-full rounded-2xl bg-surface-800/50 mb-10" />

          {/* Content Layout Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-10 w-3/4 rounded-lg bg-surface-800/80" />
              <div className="h-4 w-1/2 rounded bg-surface-800/60" />
              <div className="space-y-3 pt-4">
                <div className="h-4 w-full rounded bg-surface-800/50" />
                <div className="h-4 w-full rounded bg-surface-800/50" />
                <div className="h-4 w-4/5 rounded bg-surface-800/50" />
              </div>
            </div>
            <div className="h-64 rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-dvh pt-16 pb-24 flex items-center justify-center">
        <div className="container-wide max-w-md text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-400 mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="font-display text-2xl font-bold text-[hsl(var(--foreground))]">
            Project Not Found
          </h2>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            {error || 'The project you are looking for does not exist or has been removed.'}
          </p>
          <Button size="default" asChild className="mt-6 gap-2">
            <Link href="/projects">
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryStyle =
    CATEGORY_COLORS[project.category] || CATEGORY_COLORS['other'];

  const images = project.images && project.images.length > 0 ? project.images : [];

  return (
    <div className="min-h-dvh pt-8 pb-28">
      <div className="container-wide">
        {/* ── 1. Breadcrumb Navigation ─────────────────────────── */}
        <div className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))] mb-8">
          <Link
            href="/projects"
            className="hover:text-brand-400 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Explore Projects
          </Link>
          <span>/</span>
          <span className="text-[hsl(var(--foreground))] truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </div>

        {/* ── 2. Header & Image Gallery Section ────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-surface-900/60 p-2 sm:p-4 mb-10 shadow-card">
          {images.length > 0 ? (
            <div>
              {/* Main Featured Image */}
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-surface-950">
                <img
                  src={images[activeImageIndex]}
                  alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Thumbnails if multiple images exist */}
              {images.length > 1 && (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-video w-24 overflow-hidden rounded-lg border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-brand-400 scale-105 shadow-glow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Modern Gradient Hero Graphic Fallback */
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-surface-900 via-surface-950 to-brand-950/40 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
              {/* Ambient Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-[100px]" />
              </div>

              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-400 shadow-glow mb-4">
                <FolderGit2 size={40} />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-brand-400">
                System Architecture Preview
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
            </div>
          )}
        </div>

        {/* ── 3. Main Overview & Sidebar Grid Layout ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title, Badges & Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-semibold capitalize tracking-wide ${categoryStyle}`}
                >
                  {project.category}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status === 'published' ? 'Active Production' : project.status}
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[hsl(var(--foreground))] tracking-tight leading-tight">
                {project.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-brand-400" />
                  <span>Created {formatDate(project.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-brand-400" />
                  <span>Updated {formatDate(project.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-lg font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                <Layers size={18} className="text-brand-400" />
                Project Overview & Architecture
              </h3>
              <p className="text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Technologies & Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 sm:p-8">
                <h3 className="font-display text-lg font-bold text-[hsl(var(--foreground))] flex items-center gap-2 mb-4">
                  <Tag size={18} className="text-brand-400" />
                  Tech Stack & Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-[hsl(var(--border))] bg-surface-950/80 px-3 py-1.5 text-xs font-mono text-brand-300 flex items-center gap-1.5"
                    >
                      <Sparkles size={12} className="text-brand-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Conversion Action Bar */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-2xl border border-[hsl(var(--border))] bg-surface-900/60 p-6 sm:p-8 shadow-card space-y-6">
              <h3 className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
                Project Actions
              </h3>

              {/* Action Buttons */}
              <div className="space-y-3">
                {project.liveUrl ? (
                  <Button size="lg" asChild className="w-full gap-2 shadow-glow-sm">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      Visit Live Demo
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" disabled className="w-full gap-2">
                    <ExternalLink size={16} />
                    Live Demo Unavailable
                  </Button>
                )}

                {project.githubUrl && (
                  <Button variant="outline" size="lg" asChild className="w-full gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      View Source Code
                    </a>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="default"
                  onClick={handleShare}
                  className="w-full gap-2 text-xs text-[hsl(var(--muted-foreground))]"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      Link Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Share2 size={14} />
                      Share Project Link
                    </>
                  )}
                </Button>
              </div>

              {/* Developer Metadata Card */}
              <div className="border-t border-[hsl(var(--border))] pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">
                  Maintained By
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-bold text-sm border border-brand-500/30">
                    <UserIcon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                      Moloy Krishna Paul
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      Full-Stack Engineer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4. Related Items Section ─────────────────────────── */}
        {relatedProjects.length > 0 && (
          <div className="mt-24 border-t border-[hsl(var(--border))] pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-400">
                  More Works
                </p>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--foreground))]">
                  Related Projects
                </h2>
              </div>
              <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
                <Link href="/projects">View Directory &rarr;</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <ProjectCard key={relProject._id} project={relProject} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
