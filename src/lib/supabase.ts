import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// إعدادات Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('الرجاء التأكد من إعداد متغيرات البيئة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY')
}

// إنشاء عميل Supabase مع تعريف الأنواع
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// دوال مساعدة للتعامل مع قاعدة البيانات
export const dbHelpers = {
  // المستخدمون
  users: {
    async getAll() {
      return await supabase.from('users').select('*').order('created_at', { ascending: false })
    },

    async getById(id: string) {
      return await supabase.from('users').select('*').eq('id', id).single()
    },

    async getByRole(role: string) {
      return await supabase.from('users').select('*').eq('role', role)
    },

    async create(user: Omit<Database['public']['Tables']['users']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
      return await supabase.from('users').insert(user).select().single()
    },

    async update(id: string, updates: Partial<Database['public']['Tables']['users']['Update']>) {
      return await supabase.from('users').update(updates).eq('id', id).select().single()
    },

    async delete(id: string) {
      return await supabase.from('users').delete().eq('id', id)
    }
  },

  // الحضور
  attendance: {
    async getAll() {
      return await supabase.from('attendance').select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `).order('date', { ascending: false })
    },

    async getByUserId(userId: string) {
      return await supabase.from('attendance').select('*').eq('user_id', userId).order('date', { ascending: false })
    },

    async getByDate(date: string) {
      return await supabase.from('attendance').select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `).eq('date', date)
    },

    async create(attendance: Omit<Database['public']['Tables']['attendance']['Insert'], 'id' | 'created_at'>) {
      return await supabase.from('attendance').insert(attendance).select().single()
    },

    async update(id: string, updates: Partial<Database['public']['Tables']['attendance']['Update']>) {
      return await supabase.from('attendance').update(updates).eq('id', id).select().single()
    },

    async delete(id: string) {
      return await supabase.from('attendance').delete().eq('id', id)
    }
  },

  // السور
  surahs: {
    async getAll() {
      return await supabase.from('surahs').select('*').order('id')
    },

    async getById(id: string) {
      return await supabase.from('surahs').select('*').eq('id', id).single()
    },

    async create(surah: Omit<Database['public']['Tables']['surahs']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
      return await supabase.from('surahs').insert(surah).select().single()
    },

    async update(id: string, updates: Partial<Database['public']['Tables']['surahs']['Update']>) {
      return await supabase.from('surahs').update(updates).eq('id', id).select().single()
    },

    async delete(id: string) {
      return await supabase.from('surahs').delete().eq('id', id)
    }
  },

  // تقدم التسميع
  recitationProgress: {
    async getAll() {
      return await supabase.from('recitation_progress').select(`
        *,
        users:user_id (
          id,
          name,
          email
        ),
        surahs:surah_id (
          id,
          name,
          total_verses
        )
      `).order('updated_at', { ascending: false })
    },

    async getByUserId(userId: string) {
      return await supabase.from('recitation_progress').select(`
        *,
        surahs:surah_id (
          id,
          name,
          total_verses
        )
      `).eq('user_id', userId)
    },

    async getBySurahId(surahId: string) {
      return await supabase.from('recitation_progress').select(`
        *,
        users:user_id (
          id,
          name,
          email
        )
      `).eq('surah_id', surahId)
    },

    async getByUserAndSurah(userId: string, surahId: string) {
      return await supabase.from('recitation_progress').select('*').eq('user_id', userId).eq('surah_id', surahId).single()
    },

    async create(progress: Omit<Database['public']['Tables']['recitation_progress']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
      return await supabase.from('recitation_progress').insert(progress).select().single()
    },

    async update(id: string, updates: Partial<Database['public']['Tables']['recitation_progress']['Update']>) {
      return await supabase.from('recitation_progress').update(updates).eq('id', id).select().single()
    },

    async upsert(userId: string, surahId: string, versesMemorized: number) {
      return await supabase.from('recitation_progress').upsert({
        user_id: userId,
        surah_id: surahId,
        verses_memorized: versesMemorized,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,surah_id'
      }).select().single()
    },

    async delete(id: string) {
      return await supabase.from('recitation_progress').delete().eq('id', id)
    }
  },

  // الفعاليات
  events: {
    async getAll() {
      return await supabase.from('events').select('*').order('date', { ascending: false })
    },

    async getUpcoming() {
      const today = new Date().toISOString().split('T')[0]
      return await supabase.from('events').select('*').gte('date', today).order('date')
    },

    async getById(id: string) {
      return await supabase.from('events').select('*').eq('id', id).single()
    },

    async create(event: Omit<Database['public']['Tables']['events']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
      return await supabase.from('events').insert(event).select().single()
    },

    async update(id: string, updates: Partial<Database['public']['Tables']['events']['Update']>) {
      return await supabase.from('events').update(updates).eq('id', id).select().single()
    },

    async delete(id: string) {
      return await supabase.from('events').delete().eq('id', id)
    }
  }
}

// دوال المصادقة
export const authHelpers = {
  async signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
  },

  async signInWithPassword(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  async signOut() {
    return await supabase.auth.signOut()
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

export default supabase