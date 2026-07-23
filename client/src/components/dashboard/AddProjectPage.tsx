'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Loader2,
  FolderPlus,
} from 'lucide-react';
import { createProjectApi } from '@/lib/projectsApi';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CATEGORIES = [
  { value: 'web', label: 'Web Application' },
  { value: 'mobile', label: 'Mobile Application' },
  { value: 'open-source', label: 'Open Source Package' },
  { value: 'design', label: 'Design System' },
  { value: 'other', label: 'Other Tool' },
] as const;

interface FormErrors {
  title?: string;
  category?: string;
  description?: string;
  images?: string;
  general?: string;
}

/**
 * AddProjectPage — Form capturing Project entity schema fields with client-side validation.
 * Submits to POST /api/v1/projects.
 */
export default function AddProjectPage() {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Project['category']>('web');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Project['status']>('published');
  const [tagsInput, setTagsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  // Images state array
  const [images, setImages] = useState<string[]>(['']);

  // Validation & Submit states
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle dynamic image input
  const handleImageChange = (index: number, value: string) => {
    const next = [...images];
    next[index] = value;
    setImages(next);
  };

  const addImageField = () => {
    if (images.length < 10) {
      setImages([...images, '']);
    }
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Client-side form validation
  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!title.trim()) {
      errs.title = 'Project title is required';
    } else if (title.trim().length > 150) {
      errs.title = 'Title must be at most 150 characters';
    }

    if (!category) {
      errs.category = 'Category selection is required';
    }

    if (!description.trim()) {
      errs.description = 'Project description is required';
    } else if (description.trim().length > 2000) {
      errs.description = 'Description must be at most 2000 characters';
    }

    // Filter valid non-empty images
    const validImages = images.filter((img) => img.trim() !== '');
    if (validImages.length > 10) {
      errs.images = 'A maximum of 10 image URLs is allowed';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    setSuccessMsg('');

    try {
      const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const validImages = images.filter((img) => img.trim() !== '');

      const payload: Partial<Project> = {
        title: title.trim(),
        category,
        description: description.trim(),
        status,
        images: validImages,
        tags: parsedTags,
        githubUrl: githubUrl.trim() || undefined,
        liveUrl: liveUrl.trim() || undefined,
      };

      await createProjectApi(payload);

      setSuccessMsg('Project created successfully!');
      setTimeout(() => {
        router.push('/dashboard/projects');
      }, 1200);
    } catch (err: unknown) {
      setErrors({
        general:
          err instanceof Error
            ? err.message
            : 'Failed to create project. Please check backend connection.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh pt-8 pb-28">
      <div className="container-wide max-w-3xl">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))] mb-6">
          <Link
            href="/dashboard/projects"
            className="hover:text-brand-400 transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Manage Projects
          </Link>
          <span>/</span>
          <span className="text-[hsl(var(--foreground))]">Add New Entity</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-400">
            <FolderPlus size={14} />
            Entity Creation Form
          </div>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[hsl(var(--foreground))]">
            Add New Project
          </h1>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
            Fill out the form details to publish a new project entity to your personal platform directory.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 size={18} />
            {successMsg} Redirecting to project manager...
          </div>
        )}

        {/* General Error Alert */}
        {errors.general && (
          <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm font-semibold flex items-center gap-2">
            <AlertCircle size={18} />
            {errors.general}
          </div>
        )}

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 sm:p-8 space-y-6 shadow-card"
        >
          {/* 1. Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
              Project Title <span className="text-red-400">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. DeveloperMoy Ecosystem"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface-950/60 border-[hsl(var(--border))] h-11 focus-visible:ring-brand-500"
            />
            {errors.title && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.title}</p>
            )}
          </div>

          {/* 2. Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Project['category'])}
                className="h-11 w-full rounded-md border border-[hsl(var(--border))] bg-surface-950/60 px-3 text-sm text-[hsl(var(--foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-surface-900 text-white">
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
                Initial Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Project['status'])}
                className="h-11 w-full rounded-md border border-[hsl(var(--border))] bg-surface-950/60 px-3 text-sm text-[hsl(var(--foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                <option value="published" className="bg-surface-900 text-white">
                  Published (Publicly Visible)
                </option>
                <option value="draft" className="bg-surface-900 text-white">
                  Draft (Private Console Only)
                </option>
              </select>
            </div>
          </div>

          {/* 3. Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Provide a comprehensive summary of the project architecture, features, and tech stack..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border border-[hsl(var(--border))] bg-surface-950/60 p-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.description}</p>
            )}
          </div>

          {/* 4. Tags */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
              Technology Tags (Comma Separated)
            </label>
            <Input
              type="text"
              placeholder="e.g. Next.js 15, TypeScript, Express, MongoDB"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="bg-surface-950/60 border-[hsl(var(--border))] h-11 focus-visible:ring-brand-500"
            />
          </div>

          {/* 5. External URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
                Live URL (Optional)
              </label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="bg-surface-950/60 border-[hsl(var(--border))] h-11 focus-visible:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))] mb-2">
                GitHub Repository URL (Optional)
              </label>
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="bg-surface-950/60 border-[hsl(var(--border))] h-11 focus-visible:ring-brand-500"
              />
            </div>
          </div>

          {/* 6. Dynamic Images Array */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground))]">
                Image Screenshot URLs (Optional, max 10)
              </label>
              {images.length < 10 && (
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-xs font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1"
                >
                  <Plus size={14} /> Add Image
                </button>
              )}
            </div>

            <div className="space-y-3">
              {images.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    type="url"
                    placeholder={`https://example.com/screenshot-${idx + 1}.png`}
                    value={img}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    className="bg-surface-950/60 border-[hsl(var(--border))] h-10 text-xs focus-visible:ring-brand-500 flex-1"
                  />
                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="p-2 text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors"
                      aria-label="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.images && (
              <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.images}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-[hsl(var(--border))] flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={() => router.push('/dashboard/projects')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              size="default"
              className="gap-2 shadow-glow-sm"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Publish Project
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
