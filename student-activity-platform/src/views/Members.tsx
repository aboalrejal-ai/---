import React from 'react';
import { useAuth } from '@/contexts/AuthProvider';

const Members: React.FC = () => {
  const { users } = useAuth();
  return (
    <div style={{ padding: 16 }}>
      <h1>إدارة الأعضاء</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
