'use client';

import Link from 'next/link';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import type { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
}

const CATEGORY_COLORS: Record<Project['category'], string> = {
  web: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  mobile: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
  'open-source': 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  design: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  other: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
};

/**
 * ProjectCard — Displays a single project instance in grids and listings.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[project.category] || CATEGORY_COLORS.other;

  return (
    <Card className="group flex flex-col justify-between overflow-hidden border-[hsl(var(--border))] bg-surface-900/40 transition-all duration-200 hover:border-brand-500/30 hover:bg-surface-900/80 hover:shadow-card-hover">
      <div>
        {/* ── Card Header Image / Cover Graphic ───────────────── */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface-950/80 border-b border-[hsl(var(--border))]">
          {project.images && project.images.length > 0 ? (
            // Image cover
            <img
              src={project.images[0]}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            // Modern gradient graphic fallback
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-900 via-surface-950 to-brand-950/30 p-6">
              <FolderGit2 size={36} className="text-brand-400/40 transition-transform duration-300 group-hover:scale-110 group-hover:text-brand-400/70" />
            </div>
          )}

          {/* Category Pill */}
          <div className="absolute top-3 left-3">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize backdrop-blur-xs ${categoryStyle}`}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* ── Card Content ────────────────────────────────────── */}
        <CardHeader className="p-5 pb-2">
          <h3 className="font-display text-xl font-bold tracking-tight text-[hsl(var(--foreground))] group-hover:text-brand-400 transition-colors">
            {project.title}
          </h3>
        </CardHeader>

        <CardContent className="p-5 pt-0">
          <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[hsl(var(--border))] bg-surface-950/60 px-2 py-0.5 text-[11px] font-mono text-[hsl(var(--muted-foreground))]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </div>

      {/* ── Card Footer Actions ──────────────────────────────── */}
      <CardFooter className="flex items-center justify-between border-t border-[hsl(var(--border))] p-4 bg-surface-950/20">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors p-1"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-brand-400 transition-colors p-1"
              aria-label={`Live site for ${project.title}`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>

        <Button variant="ghost" size="sm" asChild className="text-xs gap-1 group/btn">
          <Link href={`/projects/${project._id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
