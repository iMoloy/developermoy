import type { Metadata } from 'next';
import DetailsPage from '@/components/projects/DetailsPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Project Details — DeveloperMoy`,
    description: `View system architecture, features, and source code for project ${id}.`,
  };
}

export default async function ProjectsDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <DetailsPage id={id} />;
}
