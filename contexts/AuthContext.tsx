import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Role = 'طالب' | 'مشرف' | 'رئيس مجموعة' | 'معلم' | 'مطور النظام';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  imageUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sap_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem('sap_user', JSON.stringify(user));
      else localStorage.removeItem('sap_user');
    } catch {}
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (!email || password.length < 3) return false;
      const newUser: User = {
        id: (globalThis.crypto as any)?.randomUUID?.() ?? String(Date.now()),
        name: email.split('@')[0] || 'مستخدم',
        email,
        role: 'طالب',
      };
      setUser(newUser);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
