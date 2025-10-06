import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { User as AppUser, Role } from '@/types/user';

interface AuthContextType {
  user: AppUser | null;
  users: AppUser[];
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || (process as any).env.SUPABASE_URL;
const supabaseAnon = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || (process as any).env.SUPABASE_ANON_KEY;

const supabase: SupabaseClient = createClient(supabaseUrl ?? '', supabaseAnon ?? '');

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUser({ id: data.user.id, name: data.user.email ?? 'مستخدم', role: 'طالب' as Role, email: data.user.email ?? '' });
        }
        const { data: usersRes } = await supabase.from('users').select('*').limit(20);
        setUsers((usersRes ?? []) as unknown as AppUser[]);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    users,
    loading,
    login: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return false;
      setUser({ id: data.user?.id ?? '', name: data.user?.email ?? email, role: 'طالب' as Role, email });
      return true;
    },
    logout: async () => {
      await supabase.auth.signOut();
      setUser(null);
    }
  }), [user, users, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
