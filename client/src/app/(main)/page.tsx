import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Welcome to DeveloperMoy — the personal platform of Moloy Krishna Paul.',
};

export default function HomePage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
      </div>

      <div className="animate-fade-up">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-400">
          Personal Platform
        </p>
        <h1 className="font-display text-5xl font-bold text-gradient leading-tight mb-6 md:text-6xl">
          DeveloperMoy
        </h1>
        <p className="max-w-md mx-auto text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
          Personal developer platform by{' '}
          <span className="text-[hsl(var(--foreground))] font-medium">Moloy Krishna Paul</span>
          . Currently in active development.
        </p>
      </div>
    </section>
  );
}
