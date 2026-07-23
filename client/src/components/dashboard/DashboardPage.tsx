'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Plus,
  List,
  Sparkles,
  User as UserIcon,
  ExternalLink,
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getMyProjectsApi } from '@/lib/projectsApi';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';

/**
 * DashboardPage — User control center showing profile overview, stats grid, quick actions, and recent projects.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await getMyProjectsApi();
        setProjects(res.data);
      } catch (_err) {
        // Silently handle stats load fallback
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const draftProjects = projects.filter((p) => p.status === 'draft').length;

  const categoriesSet = new Set(projects.map((p) => p.category));
  const activeCategoriesCount = categoriesSet.size;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <div className="min-h-dvh pt-8 pb-24">
      <div className="container-wide space-y-10">
        {/* ── 1. Header Banner & Profile Overview ───────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-r from-surface-900 via-surface-900 to-brand-950/40 p-6 sm:p-8 md:p-10 shadow-card">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-500/10 blur-[90px]"
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              {/* User Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 font-bold text-2xl border border-brand-500/30 shadow-glow-sm">
                {initials}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[hsl(var(--foreground))]">
                    Welcome back, {user?.name || 'Developer'}
                  </h1>
                  <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-brand-400 uppercase tracking-wider">
                    {user?.role || 'Developer'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  {user?.email} &bull; Personal Platform Console
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button size="default" asChild className="gap-2 shadow-glow-sm">
                <Link href="/dashboard/projects/new">
                  <Plus size={16} />
                  Add Project
                </Link>
              </Button>
              <Button variant="outline" size="default" asChild className="gap-2">
                <Link href="/dashboard/projects">
                  <List size={16} />
                  Manage All
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── 2. User Stats Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 transition-all hover:border-brand-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Total Projects
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                <FolderGit2 size={18} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-[hsl(var(--foreground))]">
              {loading ? '...' : totalProjects}
            </p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1">
              <TrendingUp size={12} className="text-emerald-400" />
              Active in repository
            </p>
          </div>

          <div className="rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 transition-all hover:border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Published
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-[hsl(var(--foreground))]">
              {loading ? '...' : publishedProjects}
            </p>
            <p className="mt-1 text-xs text-emerald-400">Publicly visible</p>
          </div>

          <div className="rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 transition-all hover:border-amber-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Drafts
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <FileText size={18} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-[hsl(var(--foreground))]">
              {loading ? '...' : draftProjects}
            </p>
            <p className="mt-1 text-xs text-amber-400">In development</p>
          </div>

          <div className="rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 transition-all hover:border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Categories
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <Layers size={18} />
              </div>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-[hsl(var(--foreground))]">
              {loading ? '...' : activeCategoriesCount}
            </p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Different domains</p>
          </div>
        </div>

        {/* ── 3. Quick Actions & Portfolio Link ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions Panel */}
          <div className="lg:col-span-2 rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                <Sparkles size={18} className="text-brand-400" />
                Quick Console Actions
              </h2>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">Platform Shortcuts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/dashboard/projects/new"
                className="group flex flex-col justify-between rounded-xl border border-[hsl(var(--border))] bg-surface-950/60 p-5 transition-all hover:border-brand-500/40 hover:bg-surface-900/80"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 group-hover:scale-105 transition-transform">
                    <Plus size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-[hsl(var(--foreground))] group-hover:text-brand-400 transition-colors">
                    Add New Project
                  </h3>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    Publish a new application, open-source tool, or design spec.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-brand-400 gap-1 group-hover:translate-x-1 transition-transform">
                  Create Entity &rarr;
                </div>
              </Link>

              <Link
                href="/dashboard/projects"
                className="group flex flex-col justify-between rounded-xl border border-[hsl(var(--border))] bg-surface-950/60 p-5 transition-all hover:border-brand-500/40 hover:bg-surface-900/80"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
                    <List size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-[hsl(var(--foreground))] group-hover:text-purple-400 transition-colors">
                    Manage Portfolio
                  </h3>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                    View data table, edit entries, update status, or delete items.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-purple-400 gap-1 group-hover:translate-x-1 transition-transform">
                  Open Data Table &rarr;
                </div>
              </Link>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-display text-lg font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                <UserIcon size={18} className="text-brand-400" />
                Account Overview
              </h3>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--muted-foreground))]">Full Name</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">{user?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--muted-foreground))]">Email Address</span>
                  <span className="font-medium text-[hsl(var(--foreground))]">{user?.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border))]">
                  <span className="text-[hsl(var(--muted-foreground))]">System Role</span>
                  <span className="font-medium text-brand-400 uppercase">{user?.role}</span>
                </div>
              </div>
            </div>

            <Button variant="outline" size="default" asChild className="w-full gap-2">
              <Link href="/projects">
                <ExternalLink size={16} />
                View Public Directory
              </Link>
            </Button>
          </div>
        </div>

        {/* ── 4. Recent Projects Table Preview ──────────────────── */}
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-[hsl(var(--foreground))]">
                Recent Entities
              </h2>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Your latest created projects and status
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link href="/dashboard/projects">
                View All ({projects.length})
                <ArrowRight size={14} />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
              Loading recent projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="py-8 text-center text-sm text-[hsl(var(--muted-foreground))]">
              No projects created yet. Click "Add Project" to publish your first entity.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {projects.slice(0, 5).map((p) => (
                    <tr key={p._id} className="hover:bg-surface-900/60 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[hsl(var(--foreground))]">
                        <Link
                          href={`/projects/${p._id}`}
                          className="hover:text-brand-400 transition-colors"
                        >
                          {p.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 capitalize">{p.category}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                            p.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-[hsl(var(--muted-foreground))] font-mono">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
