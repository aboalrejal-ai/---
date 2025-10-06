import { useState, useEffect, useCallback } from 'react'
import { User, Event, Surah, Attendance, RecitationProgress, FinanceRecord } from '../types'
import { dbHelpers } from '../lib/supabase'
import { debounce } from '../utils'

// تعريف أنواع البيانات للخطاف
interface SupabaseDataState {
  users: User[]
  events: Event[]
  surahs: Surah[]
  attendance: Attendance[]
  recitationProgress: RecitationProgress[]
  financeRecords: FinanceRecord[]
  loading: boolean
  error: string | null
}

export const useSupabaseData = () => {
  const [state, setState] = useState<SupabaseDataState>({
    users: [],
    events: [],
    surahs: [],
    attendance: [],
    recitationProgress: [],
    financeRecords: [],
    loading: true,
    error: null
  })

  // تحديث حالة الخطأ
  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }))
  }, [])

  // تحديث حالة التحميل
  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }))
  }, [])

  // تحديث البيانات
  const updateData = useCallback((key: keyof Omit<SupabaseDataState, 'loading' | 'error'>, data: any[]) => {
    setState(prev => ({ ...prev, [key]: data }))
  }, [])

  // تحميل جميع البيانات
  const loadAllData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const [usersRes, eventsRes, surahsRes, attendanceRes, recitationRes, financeRes] = await Promise.all([
        dbHelpers.users.getAll(),
        dbHelpers.events.getAll(),
        dbHelpers.surahs.getAll(),
        dbHelpers.attendance.getAll(),
        dbHelpers.recitationProgress.getAll(),
        Promise.resolve({ data: [], error: null }) // مؤقتاً حتى يتم إنشاء جدول السجلات المالية
      ])

      if (usersRes.error) throw usersRes.error
      if (eventsRes.error) throw eventsRes.error
      if (surahsRes.error) throw surahsRes.error
      if (attendanceRes.error) throw attendanceRes.error
      if (recitationRes.error) throw recitationRes.error

      setState(prev => ({
        ...prev,
        users: usersRes.data || [],
        events: eventsRes.data || [],
        surahs: surahsRes.data || [],
        attendance: attendanceRes.data || [],
        recitationProgress: recitationRes.data || [],
        financeRecords: financeRes.data || [],
        loading: false
      }))
    } catch (error) {
      console.error('Error loading data:', error)
      setError(error instanceof Error ? error.message : 'حدث خطأ في تحميل البيانات')
      setLoading(false)
    }
  }, [setLoading, setError])

  // تحميل البيانات عند التحميل الأول
  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  // دوال CRUD للمستخدمين
  const createUser = useCallback(async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await dbHelpers.users.create(userData)
      if (error) throw error

      if (data) {
        updateData('users', [...state.users, data])
        return { success: true, data }
      }

      return { success: false, error: 'فشل في إنشاء المستخدم' }
    } catch (error) {
      console.error('Error creating user:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.users, updateData])

  const updateUser = useCallback(async (id: string, updates: Partial<User>) => {
    try {
      const { data, error } = await dbHelpers.users.update(id, updates)
      if (error) throw error

      if (data) {
        const updatedUsers = state.users.map(user =>
          user.id === id ? { ...user, ...updates } : user
        )
        updateData('users', updatedUsers)
        return { success: true, data }
      }

      return { success: false, error: 'فشل في تحديث المستخدم' }
    } catch (error) {
      console.error('Error updating user:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.users, updateData])

  const deleteUser = useCallback(async (id: string) => {
    try {
      const { error } = await dbHelpers.users.delete(id)
      if (error) throw error

      const filteredUsers = state.users.filter(user => user.id !== id)
      updateData('users', filteredUsers)
      return { success: true }
    } catch (error) {
      console.error('Error deleting user:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.users, updateData])

  // دوال CRUD للفعاليات
  const createEvent = useCallback(async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await dbHelpers.events.create(eventData)
      if (error) throw error

      if (data) {
        updateData('events', [...state.events, data])
        return { success: true, data }
      }

      return { success: false, error: 'فشل في إنشاء الفعالية' }
    } catch (error) {
      console.error('Error creating event:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.events, updateData])

  const updateEvent = useCallback(async (id: string, updates: Partial<Event>) => {
    try {
      const { data, error } = await dbHelpers.events.update(id, updates)
      if (error) throw error

      if (data) {
        const updatedEvents = state.events.map(event =>
          event.id === id ? { ...event, ...updates } : event
        )
        updateData('events', updatedEvents)
        return { success: true, data }
      }

      return { success: false, error: 'فشل في تحديث الفعالية' }
    } catch (error) {
      console.error('Error updating event:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.events, updateData])

  const deleteEvent = useCallback(async (id: string) => {
    try {
      const { error } = await dbHelpers.events.delete(id)
      if (error) throw error

      const filteredEvents = state.events.filter(event => event.id !== id)
      updateData('events', filteredEvents)
      return { success: true }
    } catch (error) {
      console.error('Error deleting event:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.events, updateData])

  // دوال CRUD للحضور
  const createAttendance = useCallback(async (attendanceData: Omit<Attendance, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await dbHelpers.attendance.create(attendanceData)
      if (error) throw error

      if (data) {
        updateData('attendance', [...state.attendance, data])
        return { success: true, data }
      }

      return { success: false, error: 'فشل في تسجيل الحضور' }
    } catch (error) {
      console.error('Error creating attendance:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.attendance, updateData])

  // دوال CRUD للسور
  const createSurah = useCallback(async (surahData: Omit<Surah, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await dbHelpers.surahs.create(surahData)
      if (error) throw error

      if (data) {
        updateData('surahs', [...state.surahs, data])
        return { success: true, data }
      }

      return { success: false, error: 'فشل في إضافة السورة' }
    } catch (error) {
      console.error('Error creating surah:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.surahs, updateData])

  // دوال CRUD لتقدم التسميع
  const updateRecitationProgress = useCallback(async (userId: string, surahId: string, versesMemorized: number) => {
    try {
      const { data, error } = await dbHelpers.recitationProgress.upsert(userId, surahId, versesMemorized)
      if (error) throw error

      if (data) {
        const existingIndex = state.recitationProgress.findIndex(
          progress => progress.userId === userId && progress.surahId === surahId
        )

        let updatedProgress
        if (existingIndex >= 0) {
          updatedProgress = [...state.recitationProgress]
          updatedProgress[existingIndex] = data
        } else {
          updatedProgress = [...state.recitationProgress, data]
        }

        updateData('recitationProgress', updatedProgress)
        return { success: true, data }
      }

      return { success: false, error: 'فشل في تحديث تقدم التسميع' }
    } catch (error) {
      console.error('Error updating recitation progress:', error)
      return { success: false, error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' }
    }
  }, [state.recitationProgress, updateData])

  return {
    // البيانات
    users: state.users,
    events: state.events,
    surahs: state.surahs,
    attendance: state.attendance,
    recitationProgress: state.recitationProgress,
    financeRecords: state.financeRecords,

    // حالة التحميل والأخطاء
    loading: state.loading,
    error: state.error,

    // دوال التحكم
    loadAllData,
    setError,

    // دوال CRUD
    createUser,
    updateUser,
    deleteUser,
    createEvent,
    updateEvent,
    deleteEvent,
    createAttendance,
    createSurah,
    updateRecitationProgress,

    // دوال مساعدة
    getUserById: (id: string) => state.users.find(user => user.id === id),
    getEventById: (id: string) => state.events.find(event => event.id === id),
    getSurahById: (id: string) => state.surahs.find(surah => surah.id === id),
    getAttendanceByUserId: (userId: string) => state.attendance.filter(att => att.userId === userId),
    getRecitationProgressByUserId: (userId: string) => state.recitationProgress.filter(progress => progress.userId === userId),
  }
}