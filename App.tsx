import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Lazy load components for better performance
const LandingPage = lazy(() => import('./views/LandingPage'));
const LoginPage = lazy(() => import('./views/LoginPage'));
const Dashboard = lazy(() => import('./views/Dashboard'));

// Placeholder components for other pages - will be created later
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-brand-primary mb-4 font-adir">{title}</h1>
      <p className="text-gray-600">هذه الصفحة قيد التطوير</p>
    </div>
  </div>
);

const Profile = () => <PlaceholderPage title="الملف الشخصي" />;
const Members = () => <PlaceholderPage title="إدارة الأعضاء" />;
const Attendance = () => <PlaceholderPage title="الحضور والغياب" />;
const Recitation = () => <PlaceholderPage title="التسميع" />;
const Events = () => <PlaceholderPage title="الفعاليات" />;
const Trips = () => <PlaceholderPage title="الرحلات" />;
const Competitions = () => <PlaceholderPage title="المسابقات" />;
const Violations = () => <PlaceholderPage title="المخالفات" />;
const Finance = () => <PlaceholderPage title="المالية" />;
const Reports = () => <PlaceholderPage title="التقارير" />;
const Settings = () => <PlaceholderPage title="الإعدادات" />;

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 font-adir">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={!user ? <LandingPage /> : <Navigate to="/dashboard" replace />} 
        />
        <Route 
          path="/login" 
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/members" element={<Members />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/recitation" element={<Recitation />} />
          <Route path="/events" element={<Events />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/violations" element={<Violations />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;