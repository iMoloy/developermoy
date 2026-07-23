'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  Eye,
  AlertCircle,
  CheckCircle2,
  FolderGit2,
  RefreshCw,
  Loader2,
  List,
} from 'lucide-react';
import type { Project } from '@/types';
import {
  getMyProjectsApi,
  deleteProjectApi,
  updateProjectApi,
} from '@/lib/projectsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * ManageProjectsPage — Data table displaying projects owned by the user (`GET /api/v1/projects/mine`).
 * Includes row actions (Edit modal, Delete action with instant state updates).
 */
export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Delete modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Edit modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<Project['category']>('web');
  const [editStatus, setEditStatus] = useState<Project['status']>('published');
  const [editDescription, setEditDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchMyProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyProjectsApi();
      setProjects(res.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch user projects.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyProjects();
  }, [fetchMyProjects]);

  // Handle Delete Project
  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteProjectApi(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setActionSuccess('Project deleted successfully');
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete project');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  // Open Edit Modal
  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setEditTitle(p.title);
    setEditCategory(p.category);
    setEditStatus(p.status);
    setEditDescription(p.description);
  };

  // Submit Update Project
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setIsUpdating(true);
    try {
      const updated = await updateProjectApi(editingProject._id, {
        title: editTitle,
        category: editCategory,
        status: editStatus,
        description: editDescription,
      });

      setProjects((prev) =>
        prev.map((p) => (p._id === editingProject._id ? updated.data : p))
      );

      setActionSuccess('Project updated successfully');
      setTimeout(() => setActionSuccess(null), 3000);
      setEditingProject(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update project');
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-dvh pt-8 pb-24">
      <div className="container-wide space-y-8">
        {/* ── 1. Page Header & Actions Bar ─────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
              <List size={14} />
              Entity Data Table
            </div>
            <h1 className="mt-1 font-display text-3xl font-extrabold text-[hsl(var(--foreground))] sm:text-4xl">
              Manage Projects
            </h1>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              Review, search, edit, or delete your portfolio project entities.
            </p>
          </div>

          <Button size="default" asChild className="gap-2 shadow-glow-sm">
            <Link href="/dashboard/projects/new">
              <Plus size={16} />
              Add New Project
            </Link>
          </Button>
        </div>

        {/* Action feedback banner */}
        {actionSuccess && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 text-sm font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={18} />
            {actionSuccess}
          </div>
        )}

        {/* ── 2. Search & Controls Bar ─────────────────────────── */}
        <div className="flex items-center gap-4 rounded-xl border border-[hsl(var(--border))] bg-surface-900/60 p-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            />
            <Input
              type="text"
              placeholder="Search your projects by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-10 bg-surface-950/60 border-[hsl(var(--border))] text-sm focus-visible:ring-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <span className="text-xs text-[hsl(var(--muted-foreground))] hidden sm:inline">
            {filteredProjects.length} items
          </span>
        </div>

        {/* ── 3. Data Table View ────────────────────────────────── */}
        {loading ? (
          <div className="py-16 text-center text-sm text-[hsl(var(--muted-foreground))] flex flex-col items-center gap-3">
            <Loader2 size={24} className="animate-spin text-brand-400" />
            Loading your projects database...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <AlertCircle size={28} className="mx-auto text-red-400 mb-2" />
            <p className="text-sm font-semibold text-red-400">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMyProjects}
              className="mt-4 gap-2"
            >
              <RefreshCw size={14} /> Retry
            </Button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-[hsl(var(--border))] bg-surface-900/30 p-12 text-center">
            <FolderGit2 size={36} className="mx-auto text-[hsl(var(--muted-foreground))] mb-3" />
            <h3 className="font-display text-lg font-bold text-[hsl(var(--foreground))]">
              No projects found
            </h3>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              {searchQuery
                ? 'No projects match your search query.'
                : 'You have not created any project entities yet.'}
            </p>
            <Button size="sm" asChild className="mt-6 gap-2">
              <Link href="/dashboard/projects/new">
                <Plus size={14} /> Add First Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[hsl(var(--border))] bg-surface-950/60 text-[hsl(var(--muted-foreground))] uppercase font-semibold">
                  <tr>
                    <th className="py-4 px-6">Project Title</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Created Date</th>
                    <th className="py-4 px-6 text-right">Row Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      className="hover:bg-surface-900/80 transition-colors"
                    >
                      {/* Title & Preview */}
                      <td className="py-4 px-6 font-semibold text-[hsl(var(--foreground))]">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-surface-950/80 text-brand-400 font-bold">
                            <FolderGit2 size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[hsl(var(--foreground))]">
                              {project.title}
                            </p>
                            <p className="text-[11px] text-[hsl(var(--muted-foreground))] truncate max-w-xs">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 capitalize text-[hsl(var(--foreground))]">
                        <span className="rounded-full border border-[hsl(var(--border))] bg-surface-950/60 px-2.5 py-1 text-[11px] font-mono">
                          {project.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${
                            project.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-[hsl(var(--muted-foreground))] font-mono">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/projects/${project._id}`}
                            className="p-2 text-[hsl(var(--muted-foreground))] hover:text-brand-400 transition-colors"
                            title="View Public Page"
                          >
                            <Eye size={16} />
                          </Link>

                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2 text-[hsl(var(--muted-foreground))] hover:text-brand-400 transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            onClick={() => setDeletingId(project._id)}
                            className="p-2 text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── 4. Delete Confirmation Modal ──────────────────────── */}
        {deletingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
            <div className="w-full max-w-md rounded-2xl border border-[hsl(var(--border))] bg-surface-900 p-6 space-y-4 shadow-card-hover">
              <h3 className="font-display text-lg font-bold text-red-400 flex items-center gap-2">
                <AlertCircle size={20} /> Confirm Project Deletion
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                Are you sure you want to permanently delete this project entity? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isDeleting}
                  onClick={() => setDeletingId(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={isDeleting}
                  onClick={() => handleDelete(deletingId)}
                  className="bg-red-500 hover:bg-red-600 text-white gap-2"
                >
                  {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── 5. Quick Edit Modal ───────────────────────────────── */}
        {editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fade-in">
            <div className="w-full max-w-lg rounded-2xl border border-[hsl(var(--border))] bg-surface-900 p-6 space-y-6 shadow-card-hover">
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
                <h3 className="font-display text-lg font-bold text-[hsl(var(--foreground))]">
                  Edit Project Entity
                </h3>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-[hsl(var(--muted-foreground))] hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[hsl(var(--foreground))] mb-1">
                    Title
                  </label>
                  <Input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-surface-950/60 border-[hsl(var(--border))]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[hsl(var(--foreground))] mb-1">
                      Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value as Project['category'])}
                      className="h-10 w-full rounded-md border border-[hsl(var(--border))] bg-surface-950/60 px-3 text-xs text-white"
                    >
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile Application</option>
                      <option value="open-source">Open Source</option>
                      <option value="design">Design System</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[hsl(var(--foreground))] mb-1">
                      Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as Project['status'])}
                      className="h-10 w-full rounded-md border border-[hsl(var(--border))] bg-surface-950/60 px-3 text-xs text-white"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[hsl(var(--foreground))] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-surface-950/60 p-2 text-xs text-white"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-[hsl(var(--border))]">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProject(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={isUpdating} className="gap-2">
                    {isUpdating && <Loader2 size={14} className="animate-spin" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
