import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { LogoProvider } from '../contexts/LogoContext'
import { useAuth } from '../contexts/AuthContext'
import { LoadingSpinner } from './ui'
import { View } from '../types'

export const AppLayout: React.FC = () => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // تحديد الصفحة النشطة من المسار الحالي
  const getActiveView = (): View => {
    const path = location.pathname.substring(1) // إزالة الـ /

    switch (path) {
      case 'dashboard':
      case '':
        return View.Dashboard
      case 'members':
        return View.Members
      case 'profile':
        return View.Profile
      case 'events':
        return View.Events
      case 'attendance':
        return View.Attendance
      case 'recitation':
        return View.Recitation
      case 'finance':
        return View.Finance
      case 'settings':
        return View.Settings
      default:
        return View.Dashboard
    }
  }

  const [activeView, setActiveView] = useState<View>(getActiveView())

  // تحديث الصفحة النشطة عند تغيير المسار
  React.useEffect(() => {
    setActiveView(getActiveView())
  }, [location.pathname])

  const handleViewChange = (view: View) => {
    setActiveView(view)
  }

  const handleProfileClick = () => {
    navigate('/profile')
  }

  // الحصول على عنوان الصفحة
  const getPageTitle = (view: View): string => {
    const titles: Record<View, string> = {
      [View.Dashboard]: 'لوحة التحكم',
      [View.Members]: 'إدارة الأعضاء',
      [View.Profile]: 'الملف الشخصي',
      [View.Events]: 'الفعاليات والأنشطة',
      [View.Attendance]: 'الحضور والغياب',
      [View.Recitation]: 'التسميع والمراجعة',
      [View.Finance]: 'الشؤون المالية',
      [View.Settings]: 'إعدادات النظام',
    }
    return titles[view] || 'الرئيسية'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // سيتم التعامل مع هذه الحالة في App.tsx
  }

  return (
    <LogoProvider>
      <div className="bg-gray-50 min-h-screen flex text-right">
        {/* الشريط الجانبي */}
        <Sidebar
          activeView={activeView}
          onViewChange={handleViewChange}
        />

        {/* المحتوى الرئيسي */}
        <main className="flex-1 flex flex-col transition-all duration-300 md:mr-72">
          {/* الرأس */}
          <Header
            title={getPageTitle(activeView)}
            onProfileClick={handleProfileClick}
          />

          {/* محتوى الصفحة */}
          <div className="p-2 md:p-4 lg:p-8 overflow-y-auto flex-1">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </LogoProvider>
  )
}