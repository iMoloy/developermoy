import type { Metadata } from 'next';
import WritingClientView from '@/components/writing/WritingClientView';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Technical articles, software architecture insights, Next.js 15 guides, and full-stack engineering essays by DeveloperMoy.',
};

export default function WritingPage() {
  return <WritingClientView />;
}
