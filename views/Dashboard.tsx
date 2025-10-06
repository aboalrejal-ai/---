import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#050A18] text-white p-6">
      <h1 className="text-3xl font-bold mb-4">لوحة التحكم</h1>
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <p>مرحباً، {user?.name}</p>
        <p className="text-gray-300">الدور: {user?.role}</p>
      </div>
    </div>
  );
};

export default Dashboard;
