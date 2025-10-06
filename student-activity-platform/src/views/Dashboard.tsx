import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: 16 }}>
      <h1>لوحة التحكم</h1>
      <p>مرحبًا، {user?.name ?? 'مستخدم'}!</p>
    </div>
  );
};

export default Dashboard;
