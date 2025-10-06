export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          id: string
          user_id: string
          date: string
          time: string
          status: 'حاضر' | 'غائب' | 'متأخر' | 'مأذون'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          time: string
          status?: 'حاضر' | 'غائب' | 'متأخر' | 'مأذون'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          time?: string
          status?: 'حاضر' | 'غائب' | 'متأخر' | 'مأذون'
          notes?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          type: 'رحلة' | 'مسابقة' | 'محاضرة' | 'ورشة عمل' | 'أخرى'
          date: string
          time: string
          location: string | null
          organizer: string | null
          participants: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type?: 'رحلة' | 'مسابقة' | 'محاضرة' | 'ورشة عمل' | 'أخرى'
          date: string
          time: string
          location?: string | null
          organizer?: string | null
          participants?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: 'رحلة' | 'مسابقة' | 'محاضرة' | 'ورشة عمل' | 'أخرى'
          date?: string
          time?: string
          location?: string | null
          organizer?: string | null
          participants?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      finance_records: {
        Row: {
          id: string
          user_id: string | null
          amount: number
          type: 'income' | 'expense'
          description: string
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          amount: number
          type: 'income' | 'expense'
          description: string
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          amount?: number
          type?: 'income' | 'expense'
          description?: string
          date?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'error'
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'error'
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          read?: boolean
          created_at?: string
        }
      }
      recitation_progress: {
        Row: {
          id: string
          user_id: string
          surah_id: string
          verses_memorized: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          surah_id: string
          verses_memorized?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          surah_id?: string
          verses_memorized?: number
          created_at?: string
          updated_at?: string
        }
      }
      surahs: {
        Row: {
          id: string
          name: string
          total_verses: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          total_verses: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          total_verses?: number
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'طالب' | 'مشرف' | 'رئيس مجموعة' | 'معلم' | 'مطور النظام'
          image_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'طالب' | 'مشرف' | 'رئيس مجموعة' | 'معلم' | 'مطور النظام'
          image_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'طالب' | 'مشرف' | 'رئيس مجموعة' | 'معلم' | 'مطور النظام'
          image_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      attendance_status: 'حاضر' | 'غائب' | 'متأخر' | 'مأذون'
      event_type: 'رحلة' | 'مسابقة' | 'محاضرة' | 'ورشة عمل' | 'أخرى'
      finance_type: 'income' | 'expense'
      notification_type: 'info' | 'success' | 'warning' | 'error'
      user_role: 'طالب' | 'مشرف' | 'رئيس مجموعة' | 'معلم' | 'مطور النظام'
    }
  }
}