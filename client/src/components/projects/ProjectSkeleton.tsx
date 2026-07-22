'use client';

/**
 * ProjectSkeleton — Loading state skeleton loader matching ProjectCard layout.
 */
export default function ProjectSkeleton() {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-0 animate-pulse">
      {/* Cover Image Placeholder */}
      <div className="aspect-video w-full bg-surface-800/60" />

      <div className="p-5">
        {/* Title Line */}
        <div className="h-6 w-3/4 rounded-md bg-surface-800/80 mb-3" />

        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-surface-800/50" />
          <div className="h-3.5 w-5/6 rounded bg-surface-800/50" />
        </div>

        {/* Tags */}
        <div className="mt-5 flex gap-2">
          <div className="h-5 w-16 rounded bg-surface-800/60" />
          <div className="h-5 w-20 rounded bg-surface-800/60" />
          <div className="h-5 w-14 rounded bg-surface-800/60" />
        </div>
      </div>

      {/* Footer Line */}
      <div className="flex items-center justify-between border-t border-[hsl(var(--border))] p-4 bg-surface-950/20">
        <div className="h-5 w-12 rounded bg-surface-800/60" />
        <div className="h-7 w-24 rounded-md bg-surface-800/80" />
      </div>
    </div>
  );
}
