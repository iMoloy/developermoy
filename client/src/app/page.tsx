import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to DeveloperMoy — the personal platform of Moloy Krishna Paul.',
};

// ── Home Page ─────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="animate-fade-up text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand-400">
          Coming Soon
        </p>
        <h1 className="font-display text-5xl font-bold text-gradient mb-6">
          DeveloperMoy
        </h1>
        <p className="max-w-md text-surface-400 text-lg leading-relaxed">
          Personal developer platform by{' '}
          <span className="text-foreground font-medium">Moloy Krishna Paul</span>
          . Currently in active development.
        </p>
      </div>
    </main>
  );
}
