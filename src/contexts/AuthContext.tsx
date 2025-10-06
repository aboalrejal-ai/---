import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User, Role, AuthContextType } from '../types'
import { supabase, authHelpers, dbHelpers } from '../lib/supabase'
import { ERROR_MESSAGES } from '../constants'

// إنشاء السياق
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// مزود السياق
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // تحميل المستخدمين
  const refreshUsers = useCallback(async () => {
    try {
      const { data, error } = await dbHelpers.users.getAll()
      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }, [])

  // تحميل المستخدم الحالي
  const loadCurrentUser = useCallback(async () => {
    try {
      setLoading(true)

      // الحصول على الجلسة الحالية
      const session = await authHelpers.getSession()

      if (session?.user) {
        // الحصول على بيانات المستخدم من قاعدة البيانات
        const { data: userData, error } = await dbHelpers.users.getById(session.user.id)

        if (error) {
          console.error('Error loading user data:', error)
          setUser(null)
        } else if (userData) {
          setUser(userData)
        }
      } else {
        setUser(null)
      }

      // تحميل قائمة المستخدمين (للمشرفين فقط)
      if (session?.user) {
        await refreshUsers()
      }
    } catch (error) {
      console.error('Error in loadCurrentUser:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [refreshUsers])

  // مراقبة تغييرات حالة المصادقة
  useEffect(() => {
    loadCurrentUser()

    const { data: { subscription } } = authHelpers.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await loadCurrentUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setUsers([])
      }
    })

    return () => subscription.unsubscribe()
  }, [loadCurrentUser])

  // تسجيل الدخول باستخدام Google
  const signInWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true)
      const { error } = await authHelpers.signInWithGoogle()

      if (error) {
        console.error('Google auth error:', error)
        alert(ERROR_MESSAGES.GOOGLE_AUTH_FAILED)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in signInWithGoogle:', error)
      alert(ERROR_MESSAGES.GOOGLE_AUTH_FAILED)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
  const login = useCallback(async (emailOrUser: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)

      const { error } = await authHelpers.signInWithPassword(emailOrUser, password)

      if (error) {
        console.error('Login error:', error)
        alert(error.message || ERROR_MESSAGES.UNKNOWN_ERROR)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in login:', error)
      alert(ERROR_MESSAGES.UNKNOWN_ERROR)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // تسجيل الخروج
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      const { error } = await authHelpers.signOut()

      if (error) {
        console.error('Logout error:', error)
        alert(error.message || ERROR_MESSAGES.UNKNOWN_ERROR)
      }
    } catch (error) {
      console.error('Error in logout:', error)
      alert(ERROR_MESSAGES.UNKNOWN_ERROR)
    } finally {
      setLoading(false)
    }
  }, [])

  // تسجيل مستخدم جديد
  const register = useCallback(async (userData: Omit<User, 'id'> & { password?: string }): Promise<boolean> => {
    try {
      setLoading(true)

      // إنشاء حساب في نظام المصادقة
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password || 'defaultPassword123!',
        options: {
          data: {
            name: userData.name,
            role: userData.role,
          }
        }
      })

      if (authError) {
        console.error('Registration error:', authError)
        alert(authError.message || ERROR_MESSAGES.UNKNOWN_ERROR)
        return false
      }

      if (authData.user) {
        // إضافة المستخدم إلى قاعدة البيانات
        const { error: dbError } = await dbHelpers.users.create({
          id: authData.user.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          image_url: userData.imageUrl || null,
          phone: userData.phone || null,
        })

        if (dbError) {
          console.error('Database error:', dbError)
          alert(ERROR_MESSAGES.UNKNOWN_ERROR)
          return false
        }
      }

      await refreshUsers()
      return true
    } catch (error) {
      console.error('Error in register:', error)
      alert(ERROR_MESSAGES.UNKNOWN_ERROR)
      return false
    } finally {
      setLoading(false)
    }
  }, [refreshUsers])

  // إضافة طالب جديد (للمشرفين)
  const addStudent = useCallback(async (studentData: Omit<User, 'id'>): Promise<boolean> => {
    try {
      setLoading(true)

      const { error } = await dbHelpers.users.create({
        name: studentData.name,
        email: studentData.email,
        role: studentData.role,
        image_url: studentData.imageUrl || null,
        phone: studentData.phone || null,
      })

      if (error) {
        console.error('Add student error:', error)
        alert(error.message || ERROR_MESSAGES.UNKNOWN_ERROR)
        return false
      }

      await refreshUsers()
      return true
    } catch (error) {
      console.error('Error in addStudent:', error)
      alert(ERROR_MESSAGES.UNKNOWN_ERROR)
      return false
    } finally {
      setLoading(false)
    }
  }, [refreshUsers])

  // إضافة مستخدم جديد
  const addUser = useCallback(async (userData: Omit<User, 'id'>): Promise<boolean> => {
    return await addStudent(userData)
  }, [addStudent])

  // تحديث مستخدم
  const updateUser = useCallback(async (id: string, updates: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true)

      const { error } = await dbHelpers.users.update(id, {
        name: updates.name,
        email: updates.email,
        role: updates.role,
        image_url: updates.imageUrl,
        phone: updates.phone,
      })

      if (error) {
        console.error('Update user error:', error)
        alert(error.message || ERROR_MESSAGES.UNKNOWN_ERROR)
        return false
      }

      // تحديث المستخدم الحالي إذا كان نفسه
      if (user?.id === id) {
        setUser(prev => prev ? { ...prev, ...updates } : null)
      }

      await refreshUsers()
      return true
    } catch (error) {
      console.error('Error in updateUser:', error)
      alert(ERROR_MESSAGES.UNKNOWN_ERROR)
      return false
    } finally {
      setLoading(false)
    }
  }, [user, refreshUsers])

  // حذف مستخدم
  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true)

      const { error } = await dbHelpers.users.delete(id)

      if (error) {
        console.error('Delete user error:', error)
        alert(error.message || ERROR_MESSAGES.UNKNOWN_ERROR)
        return false
      }

      // إزالة المستخدم من القائمة المحلية
      setUsers(prev => prev.filter(u => u.id !== id))

      // تسجيل الخروج إذا كان المستخدم الحالي
      if (user?.id === id) {
        await logout()
      }

      return true
    } catch (error) {
      console.error('Error in deleteUser:', error)
      alert(ERROR_MESSAGES.UNKNOWN_ERROR)
      return false
    } finally {
      setLoading(false)
    }
  }, [user, logout])

  // القيمة التي سيتم توفيرها للمكونات الفرعية
  const value: AuthContextType = {
    user,
    users,
    loading,
    signInWithGoogle,
    login,
    logout,
    register,
    addStudent,
    addUser,
    updateUser,
    deleteUser,
    refreshUsers,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// خطاف مخصص لاستخدام السياق
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext