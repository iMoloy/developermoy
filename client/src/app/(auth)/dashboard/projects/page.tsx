import type { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/app/(main)/layout';
import ManageProjectsPage from '@/components/dashboard/ManageProjectsPage';

export const metadata: Metadata = {
  title: 'Manage Projects — Dashboard',
  description: 'Manage, search, edit, and delete project entities in your portfolio.',
};

export default function Page() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <ManageProjectsPage />
      </MainLayout>
    </ProtectedRoute>
  );
}
