import { useState, useEffect, useCallback } from 'react';
import { supabase, TABLES, handleSupabaseError } from '../config/supabase';
import { 
  User, Event, Attendance, Violation, FinancialRecord, 
  Notification, Surah, RecitationProgress 
} from '../types';

interface UseSupabaseDataReturn {
  // Data states
  users: User[];
  events: Event[];
  attendance: Attendance[];
  violations: Violation[];
  financialRecords: FinancialRecord[];
  notifications: Notification[];
  surahs: Surah[];
  recitationProgress: RecitationProgress[];
  loading: boolean;
  error: string | null;

  // CRUD operations
  createItem: <T>(table: string, data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>, setState: React.Dispatch<React.SetStateAction<T[]>>) => Promise<boolean>;
  updateItem: <T extends { id: string }>(table: string, id: string, updates: Partial<T>, setState: React.Dispatch<React.SetStateAction<T[]>>) => Promise<boolean>;
  deleteItem: <T extends { id: string }>(table: string, id: string, setState: React.Dispatch<React.SetStateAction<T[]>>) => Promise<boolean>;
  
  // Refresh data
  loadInitialData: () => Promise<void>;
}

export function useSupabaseData(): UseSupabaseDataReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [recitationProgress, setRecitationProgress] = useState<RecitationProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        usersRes,
        eventsRes,
        attendanceRes,
        violationsRes,
        financialRes,
        notificationsRes,
        surahsRes,
        recitationRes,
      ] = await Promise.all([
        supabase.from(TABLES.USERS).select('*').order('createdAt', { ascending: false }),
        supabase.from(TABLES.EVENTS).select('*').order('date', { ascending: false }),
        supabase.from(TABLES.ATTENDANCE).select('*').order('createdAt', { ascending: false }),
        supabase.from(TABLES.VIOLATIONS).select('*').order('createdAt', { ascending: false }),
        supabase.from(TABLES.FINANCIAL_RECORDS).select('*').order('createdAt', { ascending: false }),
        supabase.from(TABLES.NOTIFICATIONS).select('*').order('createdAt', { ascending: false }),
        supabase.from(TABLES.SURAHS).select('*').order('name', { ascending: true }),
        supabase.from(TABLES.RECITATION_PROGRESS).select('*').order('updatedAt', { ascending: false }),
      ]);

      // Check for errors
      const errors = [
        usersRes.error,
        eventsRes.error,
        attendanceRes.error,
        violationsRes.error,
        financialRes.error,
        notificationsRes.error,
        surahsRes.error,
        recitationRes.error,
      ].filter(Boolean);

      if (errors.length > 0) {
        throw new Error(handleSupabaseError(errors[0]));
      }

      // Set data
      setUsers(usersRes.data || []);
      setEvents(eventsRes.data || []);
      setAttendance(attendanceRes.data || []);
      setViolations(violationsRes.data || []);
      setFinancialRecords(financialRes.data || []);
      setNotifications(notificationsRes.data || []);
      setSurahs(surahsRes.data || []);
      setRecitationProgress(recitationRes.data || []);

    } catch (err) {
      console.error('Error loading initial data:', err);
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, []);

  const createItem = useCallback(async <T>(
    table: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>,
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ): Promise<boolean> => {
    try {
      const { data: newItem, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      setState(prev => [newItem, ...prev]);
      return true;
    } catch (err) {
      console.error(`Error creating item in ${table}:`, err);
      setError(handleSupabaseError(err));
      return false;
    }
  }, []);

  const updateItem = useCallback(async <T extends { id: string }>(
    table: string,
    id: string,
    updates: Partial<T>,
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ): Promise<boolean> => {
    try {
      const { data: updatedItem, error } = await supabase
        .from(table)
        .update({ ...updates, updatedAt: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setState(prev => prev.map(item => item.id === id ? updatedItem : item));
      return true;
    } catch (err) {
      console.error(`Error updating item in ${table}:`, err);
      setError(handleSupabaseError(err));
      return false;
    }
  }, []);

  const deleteItem = useCallback(async <T extends { id: string }>(
    table: string,
    id: string,
    setState: React.Dispatch<React.SetStateAction<T[]>>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;

      setState(prev => prev.filter(item => item.id !== id));
      return true;
    } catch (err) {
      console.error(`Error deleting item from ${table}:`, err);
      setError(handleSupabaseError(err));
      return false;
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    users,
    events,
    attendance,
    violations,
    financialRecords,
    notifications,
    surahs,
    recitationProgress,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    loadInitialData,
  };
}