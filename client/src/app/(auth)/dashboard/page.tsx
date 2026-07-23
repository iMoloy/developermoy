import type { Metadata } from 'next';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/app/(main)/layout';
import DashboardPage from '@/components/dashboard/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard — DeveloperMoy',
  description: 'User dashboard overview and platform management console.',
};

export default function Page() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </ProtectedRoute>
  );
}
