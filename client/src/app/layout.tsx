import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'DeveloperMoy',
    template: '%s — DeveloperMoy',
  },
  description:
    'The personal developer platform of Moloy Krishna Paul — showcasing projects, writing, and open-source work.',
  keywords: ['developer', 'portfolio', 'full-stack', 'Moloy Krishna Paul'],
  authors: [{ name: 'Moloy Krishna Paul', url: 'https://moloy.is-a.dev' }],
  creator: 'Moloy Krishna Paul',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DeveloperMoy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1e' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* ── Fontshare CDN ───────────────────────────────────
            Satoshi:        clean geometric sans for body & UI
            Cabinet Grotesk: expressive display for headings
            Both are loaded from Fontshare's CDN — no build-time
            font files, no layout shift (display=swap).
        ──────────────────────────────────────────────────────── */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&f[]=cabinet-grotesk@800,700,500&display=swap"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
