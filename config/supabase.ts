import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// أنواع قاعدة البيانات
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          image_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role: string;
          image_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
          image_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string;
          date: string;
          time: string;
          location: string;
          max_participants: number | null;
          current_participants: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: string;
          date: string;
          time: string;
          location: string;
          max_participants?: number | null;
          current_participants?: number;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: string;
          date?: string;
          time?: string;
          location?: string;
          max_participants?: number | null;
          current_participants?: number;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      attendance: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          time: string;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          time: string;
          status: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          time?: string;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      surahs: {
        Row: {
          id: string;
          name: string;
          total_verses: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          total_verses: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          total_verses?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      recitation_progress: {
        Row: {
          id: string;
          user_id: string;
          surah_id: string;
          verses_memorized: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          surah_id: string;
          verses_memorized?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          surah_id?: string;
          verses_memorized?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      violations: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          description: string;
          severity: string;
          status: string;
          reported_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          description: string;
          severity: string;
          status?: string;
          reported_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          description?: string;
          severity?: string;
          status?: string;
          reported_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      financial_transactions: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          amount: number;
          description: string;
          category: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          amount: number;
          description: string;
          category: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          amount?: number;
          description?: string;
          category?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}