import React, { useState } from 'react'
import { User, Bell, Search, Settings, LogOut } from 'lucide-react'
import { Button } from './ui'
import { Input } from './ui'
import { useAuth } from '../contexts/AuthContext'
import { useSearch } from '../hooks'

interface HeaderProps {
  title: string
  onProfileClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onProfileClick
}) => {
  const { user, logout } = useAuth()
  const { searchQuery, setSearchQuery, searchInData, searchResults, clearSearch } = useSearch()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim()) {
      // البحث في جميع البيانات المتاحة
      // يمكن تمرير مصفوفات البيانات هنا عند توفرها
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* العنوان */}
        <div className="flex items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold font-adir text-brand-primary">
            {title}
          </h2>
        </div>

        {/* عناصر التحكم */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* البحث */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-48"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(false)
                    clearSearch()
                  }}
                >
                  إلغاء
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </Button>
            )}
          </div>

          {/* الإشعارات */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* إعدادات (للمشرفين فقط) */}
          {user?.role === 'مطور النظام' && (
            <Button variant="ghost" size="sm">
              <Settings size={20} />
            </Button>
          )}

          {/* قائمة المستخدم */}
          <div className="relative group">
            <Button
              variant="ghost"
              onClick={onProfileClick}
              className="flex items-center gap-2 p-2"
            >
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="صورة المستخدم"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
              )}
              <span className="font-semibold hidden md:block">
                {user?.name}
              </span>
            </Button>

            {/* قائمة منسدلة */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onProfileClick}
                  className="w-full justify-start"
                >
                  <User size={16} className="mr-2" />
                  الملف الشخصي
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full justify-start text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} className="mr-2" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نتائج البحث */}
      {searchResults.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            نتائج البحث ({searchResults.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer"
              >
                <div className="text-sm font-medium">{result.title}</div>
                <div className="text-xs text-gray-500">
                  النوع: {result.type === 'user' ? 'مستخدم' :
                          result.type === 'event' ? 'فعالية' :
                          result.type === 'surah' ? 'سورة' :
                          result.type === 'attendance' ? 'حضور' : 'تسميع'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}