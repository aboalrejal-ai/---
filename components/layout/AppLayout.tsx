import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useAuth } from '../../contexts/AuthProvider';
import { PAGE_TITLES } from '../../constants';

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = (pathname: string): string => {
    const path = pathname.split('/')[1] || 'dashboard';
    return PAGE_TITLES[path as keyof typeof PAGE_TITLES] || 'منصة النشاط الطلابي';
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen bg-brand-light flex">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:mr-72">
        {/* Header */}
        <Header title={pageTitle} user={user} />

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;