import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, TABLES, handleSupabaseError } from '../config/supabase';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { AuthContextType, User, Role } from '../types';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    users,
    events,
    attendance,
    violations,
    financialRecords,
    notifications,
    surahs,
    recitationProgress,
    createItem,
    updateItem,
    deleteItem,
    loadInitialData,
  } = useSupabaseData();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Google sign in error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password?: string }): Promise<boolean> => {
    try {
      const { password, ...userProfile } = userData;
      
      if (password) {
        // Register with email/password
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Create user profile
          const { error: profileError } = await supabase
            .from(TABLES.USERS)
            .insert([{
              id: data.user.id,
              ...userProfile,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }]);

          if (profileError) throw profileError;
        }
      } else {
        // Create user profile only (for admin adding users)
        const success = await createItem(TABLES.USERS, userProfile, () => {});
        return success;
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateUser = async (id: string, updates: Partial<User>): Promise<boolean> => {
    try {
      const success = await updateItem(TABLES.USERS, id, updates, () => {});
      
      // Update current user if it's the same user
      if (user && user.id === id) {
        setUser(prev => prev ? { ...prev, ...updates } : null);
      }
      
      return success;
    } catch (error) {
      console.error('Update user error:', error);
      return false;
    }
  };

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      return await deleteItem(TABLES.USERS, id, () => {});
    } catch (error) {
      console.error('Delete user error:', error);
      return false;
    }
  };

  const addStudent = async (student: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    try {
      return await createItem(TABLES.USERS, { ...student, role: Role.Student }, () => {});
    } catch (error) {
      console.error('Add student error:', error);
      return false;
    }
  };

  // Data manipulation functions
  const addAttendance = async (attendanceData: any): Promise<boolean> => {
    return await createItem(TABLES.ATTENDANCE, attendanceData, () => {});
  };

  const addEvent = async (eventData: any): Promise<boolean> => {
    return await createItem(TABLES.EVENTS, eventData, () => {});
  };

  const updateEvent = async (id: string, updates: any): Promise<boolean> => {
    return await updateItem(TABLES.EVENTS, id, updates, () => {});
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    return await deleteItem(TABLES.EVENTS, id, () => {});
  };

  const addViolation = async (violationData: any): Promise<boolean> => {
    return await createItem(TABLES.VIOLATIONS, violationData, () => {});
  };

  const updateRecitationProgress = async (userId: string, surahId: string, versesMemorized: number): Promise<boolean> => {
    try {
      // Check if progress exists
      const { data: existing } = await supabase
        .from(TABLES.RECITATION_PROGRESS)
        .select('*')
        .eq('userId', userId)
        .eq('surahId', surahId)
        .single();

      if (existing) {
        return await updateItem(TABLES.RECITATION_PROGRESS, existing.id, { versesMemorized }, () => {});
      } else {
        return await createItem(TABLES.RECITATION_PROGRESS, {
          userId,
          surahId,
          versesMemorized,
        }, () => {});
      }
    } catch (error) {
      console.error('Update recitation progress error:', error);
      return false;
    }
  };

  const addFinancialRecord = async (recordData: any): Promise<boolean> => {
    return await createItem(TABLES.FINANCIAL_RECORDS, recordData, () => {});
  };

  const markNotificationAsRead = async (id: string): Promise<boolean> => {
    return await updateItem(TABLES.NOTIFICATIONS, id, { read: true }, () => {});
  };

  const value: AuthContextType = {
    user,
    users,
    loading,
    signInWithGoogle,
    login,
    logout,
    register,
    updateUser,
    deleteUser,
    addStudent,
    attendance,
    surahs,
    recitationProgress,
    events,
    violations,
    financialRecords,
    notifications,
    addAttendance,
    addEvent,
    updateEvent,
    deleteEvent,
    addViolation,
    updateRecitationProgress,
    addFinancialRecord,
    markNotificationAsRead,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};