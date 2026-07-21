import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * Main layout — wraps all public-facing routes with Navbar + Footer.
 * Auth routes (login, register) live in the (auth) group and skip this.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
