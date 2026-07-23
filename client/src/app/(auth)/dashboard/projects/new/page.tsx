import type { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/app/(main)/layout';
import AddProjectPage from '@/components/dashboard/AddProjectPage';

export const metadata: Metadata = {
  title: 'Add New Project — Dashboard',
  description: 'Create and publish a new project entity with schema validation.',
};

export default function Page() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <AddProjectPage />
      </MainLayout>
    </ProtectedRoute>
  );
}
