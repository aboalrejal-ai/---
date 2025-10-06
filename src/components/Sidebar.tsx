import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  User,
  Users,
  Calendar,
  CheckCircle,
  BookOpen,
  DollarSign,
  Settings,
  LogOut
} from 'lucide-react'
import { Logo } from './Logo'
import { Button } from './ui'
import { useAuth } from '../contexts/AuthContext'
import { NAVIGATION_ITEMS } from '../constants'
import { Role, View } from '../types'
import { clsx } from 'clsx'

interface SidebarProps {
  activeView: View
  onViewChange: (view: View) => void
}

const iconMap = {
  Home,
  User,
  Users,
  Calendar,
  CheckCircle,
  BookOpen,
  DollarSign,
  Settings,
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange
}) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // فلترة عناصر التنقل حسب دور المستخدم
  const filteredNavItems = NAVIGATION_ITEMS.filter(item =>
    item.roles.includes(user?.role || Role.Student)
  )

  const handleNavClick = (view: View) => {
    onViewChange(view)
    navigate(`/${view}`)
  }

  return (
    <aside className="bg-brand-primary text-white w-72 min-h-screen p-6 flex flex-col shadow-lg">
      {/* الشعار */}
      <div className="mb-8">
        <Logo size="lg" />
      </div>

      {/* معلومات المستخدم */}
      {user && (
        <div className="mb-6 p-4 bg-white/10 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
            )}
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-white/70">{user.role}</div>
            </div>
          </div>
        </div>
      )}

      {/* عناصر التنقل */}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isActive = activeView === item.view

            return (
              <li key={item.view}>
                <Button
                  variant="ghost"
                  onClick={() => handleNavClick(item.view)}
                  className={clsx(
                    'w-full justify-start text-white hover:bg-white/20 p-3',
                    isActive && 'bg-white/20 border-l-4 border-white'
                  )}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* زر تسجيل الخروج */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-white hover:bg-red-600/20 p-3"
        >
          <LogOut size={20} className="mr-3" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  )
}