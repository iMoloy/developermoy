'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Clock,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Share2,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Next.js' | 'Architecture' | 'TypeScript' | 'DevOps';
  readTime: string;
  date: string;
  image?: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: 'art_1',
    title: 'Architecting Modern Full-Stack Apps with Next.js 15 App Router & Express',
    slug: 'nextjs-15-express-architecture',
    excerpt:
      'A deep dive into server components, streaming data fetching, Monorepo structuring with Turborepo, and Express API integration.',
    content: `Next.js 15 App Router introduces a paradigm shift in how modern React applications fetch data and render UI components. 

### 1. Server Components vs Client Components
By default, all components inside the \`app\` directory are React Server Components (RSC). This reduces client bundle size drastically while executing heavy data queries directly on the server.

### 2. Express Backend Integration
Integrating an external Express backend allows clean separation of domain business logic, MongoDB database ORM connections, and custom microservice authentication middleware.

### 3. Turborepo Monorepo Organization
Keeping Next.js client and Express server under a unified Monorepo workspace enables shared TypeScript types, synchronized linting rules, and single-command CI/CD build scripts.`,
    category: 'Next.js',
    readTime: '6 min read',
    date: 'July 24, 2026',
    image: '/images/article-next15.png',
    tags: ['Next.js 15', 'App Router', 'Express', 'Monorepo', 'TypeScript'],
  },
  {
    id: 'art_2',
    title: 'Achieving 100% Type Safety Across Database, Express REST, and Next.js UI',
    slug: 'end-to-end-typescript-type-safety',
    excerpt:
      'How to eliminate implicit any types, enforce Zod request body validation, and share static TypeScript interfaces between server models and client views.',
    content: `Type safety is not just about avoiding runtime errors; it's an engineering philosophy that accelerates developer velocity and guarantees API integrity.

### 1. Zod Schema Validation
Validate HTTP request payloads at the Express route middleware boundary before invoking controller logic.

### 2. Shared Types Package
Export TypeScript interfaces from a shared workspace package so both Express models and Next.js frontend props stay synchronized without duplication.`,
    category: 'TypeScript',
    readTime: '5 min read',
    date: 'July 18, 2026',
    image: '/images/arch-security.png',
    tags: ['TypeScript', 'Zod', 'Mongoose', 'REST API'],
  },
  {
    id: 'art_3',
    title: 'Production CI/CD Pipelines: Deploying Next.js to Vercel and Express to Render',
    slug: 'production-deployment-vercel-render',
    excerpt:
      'Step-by-step blueprint for automating multi-cloud deployments, CORS origin allowlists, environment variable security, and zero-downtime builds.',
    content: `Deploying a full-stack monorepo requires dedicated cloud hosting strategies optimized for each tier.

### 1. Client Tier on Vercel
Vercel provides instant edge deployment, global CDN caching, and automatic Next.js optimization.

### 2. Server Tier on Render
Render's Node web service hosts Express endpoints with automated TLS certificates, health check pings, and environment isolation.`,
    category: 'DevOps',
    readTime: '7 min read',
    date: 'July 10, 2026',
    image: '/images/arch-cloud.png',
    tags: ['Vercel', 'Render', 'CI/CD', 'DevOps', 'Docker'],
  },
  {
    id: 'art_4',
    title: 'Designing Scalable Monorepos with Turborepo & Shared Configuration Rules',
    slug: 'turborepo-monorepo-best-practices',
    excerpt:
      'Learn how to manage multi-package repositories cleanly, cache build outputs, and share ESLint, Tailwind, and TypeScript configs.',
    content: `Monorepos reduce multi-repo overhead by centralizing tooling and dependency management.

### Key Benefits
- Unified git commit history
- Shared UI design tokens
- High-speed cached builds with Turborepo task pipeline`,
    category: 'Architecture',
    readTime: '8 min read',
    date: 'June 28, 2026',
    image: '/images/arch-monorepo.png',
    tags: ['Turborepo', 'Architecture', 'Monorepo', 'Node.js'],
  },
];

export default function WritingClientView() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [shared, setShared] = useState(false);

  const categories = ['All', 'Next.js', 'Architecture', 'TypeScript', 'DevOps'];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featured = articles[0]!;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      {/* ── 1. Hero Header Section ───────────────────────────────── */}
      <section className="relative border-b border-[hsl(var(--border))] bg-surface-950/60 pt-16 pb-20">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1 text-xs font-medium text-brand-400">
              <Sparkles size={13} />
              Technical Articles & Writings
            </div>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl">
              Software <span className="text-gradient">Architecture & Thoughts</span>
            </h1>
            <p className="mt-4 text-base text-[hsl(var(--muted-foreground))] leading-relaxed font-sans sm:text-lg">
              In-depth essays on Next.js 15, TypeScript type systems, full-stack architecture, and cloud deployment pipelines by Moloy Krishna Paul.
            </p>
          </div>

          {/* ── Featured Article Card ───────────────────────────── */}
          <div className="mt-14 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-surface-900/60 transition-all hover:border-brand-500/40 hover:shadow-card-hover group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-6 overflow-hidden bg-surface-950">
                <Image
                  src={featured.image!}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full border border-brand-500/30 bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-400 backdrop-blur-md">
                    Featured Article
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12 lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {featured.readTime}
                    </span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-3xl group-hover:text-brand-400 transition-colors">
                    {featured.title}
                  </h2>

                  <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featured.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-md border border-[hsl(var(--border))] bg-surface-950 px-2 py-0.5 text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => setActiveArticle(featured)}
                    className="gap-1.5 shadow-glow-sm cursor-pointer"
                  >
                    Read Article
                    <ArrowUpRight size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Filter & Articles List ───────────────────────────── */}
      <section className="py-20">
        <div className="container-wide">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors border',
                    selectedCategory === cat
                      ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                      : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[hsl(var(--border))] bg-surface-900/60 pl-9 pr-4 py-2 text-xs text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Grid of Articles */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group cursor-pointer overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-surface-900/40 p-6 flex flex-col justify-between transition-all hover:border-brand-400/40 hover:bg-surface-900/90 hover:shadow-card-hover"
              >
                <div>
                  {article.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-surface-950 mb-4">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-xs font-mono text-[hsl(var(--muted-foreground))]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-bold text-[hsl(var(--foreground))] group-hover:text-brand-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between">
                  <span className="rounded-md border border-brand-500/20 bg-brand-500/10 px-2 py-0.5 text-[10px] font-mono text-brand-400">
                    {article.category}
                  </span>
                  <span className="text-xs font-medium text-brand-400 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read article <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl my-8 overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-card-hover">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 text-xs font-mono text-brand-400">
              <span className="rounded-md border border-brand-500/20 bg-brand-500/10 px-2 py-0.5">
                {activeArticle.category}
              </span>
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
              {activeArticle.title}
            </h2>

            {activeArticle.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-surface-950 my-6">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-invert max-w-none text-sm text-[hsl(var(--muted-foreground))] leading-relaxed space-y-4 font-sans whitespace-pre-line">
              {activeArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-[hsl(var(--border))] flex items-center justify-between">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                {shared ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                <span>{shared ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <Button size="sm" variant="outline" onClick={() => setActiveArticle(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
