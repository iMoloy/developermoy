'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  X,
  Filter,
  SlidersHorizontal,
  FolderSearch,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import type { Project } from '@/types';
import { getProjectsApi } from '@/lib/projectsApi';
import ProjectCard from '@/components/home/ProjectCard';
import ProjectSkeleton from './ProjectSkeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'web', label: 'Web Apps' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'open-source', label: 'Open Source' },
  { value: 'design', label: 'Design Systems' },
  { value: 'other', label: 'Other Projects' },
] as const;

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
] as const;

/**
 * ExplorePage — Full-featured project discovery page with search, filters, grid view, and state handling.
 */
export default function ExplorePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('newest');

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Fetch projects
  const fetchProjectsData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getProjectsApi({
        category: selectedCategory,
        search: searchQuery,
        page,
        limit: 8,
      });

      let fetched = res.data;

      // Sort client-side if needed
      if (selectedSort === 'oldest') {
        fetched = [...fetched].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (selectedSort === 'title') {
        fetched = [...fetched].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        // Newest
        fetched = [...fetched].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      setProjects(fetched);
      setTotalPages(res.pagination.totalPages);
      setTotalCount(res.pagination.total);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to load projects. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, selectedSort, page]);

  useEffect(() => {
    fetchProjectsData();
  }, [fetchProjectsData]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSort('newest');
    setPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedSort !== 'newest';

  return (
    <div className="min-h-dvh pt-8 pb-24">
      <div className="container-wide">
        {/* ── 1. Page Header ───────────────────────────────────── */}
        <div className="mx-auto max-w-3xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
            <Sparkles size={13} />
            Explore Projects
          </div>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
            Directory & Showcase
          </h1>
          <p className="mt-3 text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans">
            Browse through full-stack web applications, mobile platforms, developer tools, and open-source contributions.
          </p>
        </div>

        {/* ── 2. Controls Bar (Search + Dropdown Filters) ────────── */}
        <div className="mt-10 rounded-2xl border border-[hsl(var(--border))] bg-surface-900/60 p-4 sm:p-5 shadow-card">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
              />
              <Input
                type="text"
                placeholder="Search projects by title, description, or tech..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-10 h-11 bg-surface-950/60 border-[hsl(var(--border))] text-sm focus-visible:ring-brand-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown Filters Container */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
              {/* Category Filter */}
              <div className="relative flex-1 sm:w-48">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                  <Filter size={14} />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="h-11 w-full appearance-none rounded-md border border-[hsl(var(--border))] bg-surface-950/60 pl-9 pr-8 text-xs font-medium text-[hsl(var(--foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-surface-900 text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div className="relative flex-1 sm:w-44">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]">
                  <SlidersHorizontal size={14} />
                </div>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="h-11 w-full appearance-none rounded-md border border-[hsl(var(--border))] bg-surface-950/60 pl-9 pr-8 text-xs font-medium text-[hsl(var(--foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-surface-900 text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="h-11 text-xs gap-1.5 text-brand-400 hover:bg-brand-500/10 hover:text-brand-300"
                >
                  <X size={14} />
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Metadata Header */}
        <div className="mt-6 flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))] px-1">
          <p>
            Showing{' '}
            <span className="font-semibold text-[hsl(var(--foreground))]">
              {projects.length}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-[hsl(var(--foreground))]">
              {totalCount}
            </span>{' '}
            projects
          </p>
          {selectedCategory !== 'all' && (
            <span className="capitalize text-brand-400 font-medium">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {/* ── 3. State Handling & Grid View ─────────────────────── */}
        {/* Error State */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <AlertCircle size={32} className="mx-auto text-red-400 mb-2" />
            <h3 className="text-base font-semibold text-red-400">Failed to load projects</h3>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchProjectsData}
              className="mt-4 gap-2 border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <RefreshCw size={14} />
              Try Again
            </Button>
          </div>
        )}

        {/* Loading State Skeleton Grid */}
        {loading && !error && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-[hsl(var(--border))] bg-surface-900/30 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-surface-900 text-[hsl(var(--muted-foreground))] mb-4">
              <FolderSearch size={28} />
            </div>
            <h3 className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
              No projects found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              We couldn't find any projects matching your current search criteria or category filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="mt-6 gap-2"
            >
              <X size={14} />
              Reset Filters
            </Button>
          </div>
        )}

        {/* Grid View: Responsive 4/2/1 Column Layout */}
        {!loading && !error && projects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {/* ── 4. Pagination Bar ─────────────────────────────────── */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>

            <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] px-2">
              Page <span className="text-[hsl(var(--foreground))] font-semibold">{page}</span> of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="gap-1"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
