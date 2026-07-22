import type { Metadata } from 'next';
import ExplorePage from '@/components/projects/ExplorePage';

export const metadata: Metadata = {
  title: 'Explore Projects — DeveloperMoy',
  description:
    'Discover full-stack applications, developer platform modules, mobile applications, and open-source projects.',
};

export default function ProjectsPage() {
  return <ExplorePage />;
}
