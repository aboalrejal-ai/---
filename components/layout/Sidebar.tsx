import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home, User, Users, Calendar, BookOpen, MapPin, Trophy,
  AlertTriangle, DollarSign, BarChart3, Settings, Menu, X
} from 'lucide-react';
import Logo from '../Logo';
import { useAuth } from '../../contexts/AuthProvider';
import { User as UserType, Role, View } from '../../types';
import { ROLE_PERMISSIONS, PAGE_TITLES } from '../../constants';
import { cn } from '../../utils/helpers';

interface SidebarProps {
  user?: UserType | null;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  roles: Role[];
}

const navItems: NavItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: PAGE_TITLES.dashboard,
    path: '/dashboard',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <User className="h-5 w-5" />,
    label: PAGE_TITLES.profile,
    path: '/profile',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: PAGE_TITLES.members,
    path: '/members',
    roles: [Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    label: PAGE_TITLES.attendance,
    path: '/attendance',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: PAGE_TITLES.recitation,
    path: '/recitation',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    label: PAGE_TITLES.events,
    path: '/events',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: PAGE_TITLES.trips,
    path: '/trips',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    label: PAGE_TITLES.competitions,
    path: '/competitions',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: PAGE_TITLES.violations,
    path: '/violations',
    roles: [Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    label: PAGE_TITLES.finance,
    path: '/finance',
    roles: [Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: PAGE_TITLES.reports,
    path: '/reports',
    roles: [Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: PAGE_TITLES.settings,
    path: '/settings',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-blue-800">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-right rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-blue-800 text-white shadow-lg'
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              )}
            >
              {item.icon}
              <span className="font-medium font-adir">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User info */}
      {user && (
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3">
            <img
              src={user.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffffff&color=1e3a8a&size=40`}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate font-adir">
                {user.name}
              </p>
              <p className="text-blue-200 text-sm truncate">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 right-4 z-50 p-2 bg-brand-primary text-white rounded-lg shadow-lg md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:right-0 md:w-72 md:bg-brand-primary md:text-white">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="fixed inset-y-0 right-0 w-72 bg-brand-primary text-white z-50 md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-blue-800">
              <h2 className="text-lg font-semibold font-adir">القائمة</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-blue-200 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-full overflow-hidden">
              <SidebarContent />
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;