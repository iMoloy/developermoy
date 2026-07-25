import type { Metadata } from 'next';
import AboutClientView from '@/components/about/AboutClientView';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Moloy Krishna Paul (DeveloperMoy) — Senior Full-Stack Engineer, Software Architect, and Open-Source Contributor.',
};

export default function AboutPage() {
  return <AboutClientView />;
}
