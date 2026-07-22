import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';

export const metadata: Metadata = {
  title: 'Home — DeveloperMoy',
  description:
    'Welcome to DeveloperMoy — the personal developer platform of Moloy Krishna Paul.',
};

export default function Page() {
  return <HomePage />;
}
