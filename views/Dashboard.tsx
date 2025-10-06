import React from 'react';
import { 
  Users, Calendar, BookOpen, TrendingUp, 
  MapPin, Trophy, AlertTriangle, DollarSign 
} from 'lucide-react';
import DashboardCard from '../components/ui/DashboardCard';
import CircularProgress from '../components/ui/CircularProgress';
import { useAuth } from '../contexts/AuthProvider';
import { Role } from '../types';
import { formatCurrency, calculatePercentage } from '../utils/helpers';
import { formatDate } from '../utils/date';

const Dashboard: React.FC = () => {
  const { user, users, events, attendance, recitationProgress, violations, financialRecords } = useAuth();

  if (!user) return null;

  // Calculate statistics
  const totalUsers = users.length;
  const studentsCount = users.filter(u => u.role === Role.Student).length;
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;
  const todayAttendance = attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
  
  // Calculate recitation progress for current user
  const userRecitation = recitationProgress.filter(rp => rp.userId === user.id);
  const totalVerses = userRecitation.reduce((sum, rp) => sum + rp.versesMemorized, 0);
  const recitationPercentage = calculatePercentage(totalVerses, 6236); // Total verses in Quran
  
  // Financial summary
  const totalIncome = financialRecords
    .filter(fr => fr.type === 'income')
    .reduce((sum, fr) => sum + fr.amount, 0);
  const totalExpenses = financialRecords
    .filter(fr => fr.type === 'expense')
    .reduce((sum, fr) => sum + fr.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Recent violations
  const recentViolations = violations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Upcoming events
  const upcomingEventsList = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-l from-brand-primary to-brand-secondary rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-adir mb-2">
              مرحباً، {user.name}
            </h1>
            <p className="text-blue-100">
              {user.role} - {formatDate(new Date())}
            </p>
          </div>
          <div className="text-6xl opacity-20">
            👋
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users - Only for admins/teachers */}
        {(user.role === Role.Teacher || user.role === Role.SuperAdmin) && (
          <DashboardCard
            title="إجمالي الأعضاء"
            icon={<Users className="h-6 w-6" />}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary mb-1">
                {totalUsers}
              </div>
              <div className="text-sm text-gray-600">
                {studentsCount} طالب
              </div>
            </div>
          </DashboardCard>
        )}

        {/* Events */}
        <DashboardCard
          title="الفعاليات"
          icon={<Calendar className="h-6 w-6" />}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-1">
              {totalEvents}
            </div>
            <div className="text-sm text-gray-600">
              {upcomingEvents} قادمة
            </div>
          </div>
        </DashboardCard>

        {/* Today's Attendance */}
        <DashboardCard
          title="حضور اليوم"
          icon={<TrendingUp className="h-6 w-6" />}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-primary mb-1">
              {todayAttendance}
            </div>
            <div className="text-sm text-gray-600">
              طالب حاضر
            </div>
          </div>
        </DashboardCard>

        {/* Financial Summary - Only for teachers/admins */}
        {(user.role === Role.Teacher || user.role === Role.SuperAdmin) && (
          <DashboardCard
            title="الرصيد المالي"
            icon={<DollarSign className="h-6 w-6" />}
          >
            <div className="text-center">
              <div className={`text-2xl font-bold mb-1 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </div>
              <div className="text-sm text-gray-600">
                الرصيد الحالي
              </div>
            </div>
          </DashboardCard>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recitation Progress */}
        <DashboardCard
          title="تقدم التسميع"
          icon={<BookOpen className="h-6 w-6" />}
        >
          <div className="text-center">
            <CircularProgress 
              percentage={recitationPercentage} 
              size={120}
              color="#1e3a8a"
            />
            <div className="mt-4">
              <div className="text-lg font-semibold text-gray-900">
                {totalVerses} آية
              </div>
              <div className="text-sm text-gray-600">
                من أصل 6236 آية
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Upcoming Events */}
        <DashboardCard
          title="الفعاليات القادمة"
          icon={<Calendar className="h-6 w-6" />}
        >
          <div className="space-y-3">
            {upcomingEventsList.length > 0 ? (
              upcomingEventsList.map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                    </div>
                    <div className="text-2xl">
                      {event.type === 'trip' ? '🚌' : 
                       event.type === 'competition' ? '🏆' : 
                       event.type === 'meeting' ? '👥' : '🎯'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                لا توجد فعاليات قادمة
              </div>
            )}
          </div>
        </DashboardCard>

        {/* Recent Activity / Violations */}
        <DashboardCard
          title="النشاط الأخير"
          icon={<AlertTriangle className="h-6 w-6" />}
        >
          <div className="space-y-3">
            {recentViolations.length > 0 ? (
              recentViolations.map((violation) => {
                const violatedUser = users.find(u => u.id === violation.userId);
                return (
                  <div key={violation.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-red-900">
                          {violatedUser?.name || 'مستخدم غير معروف'}
                        </h4>
                        <p className="text-sm text-red-600">{violation.type}</p>
                        <p className="text-xs text-red-500">{formatDate(violation.date)}</p>
                      </div>
                      <div className="text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-gray-500 py-4">
                لا توجد مخالفات حديثة
              </div>
            )}
          </div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <DashboardCard title="إجراءات سريعة">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Calendar className="h-8 w-8 text-brand-primary mb-2" />
            <span className="text-sm font-medium text-gray-900">تسجيل حضور</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <BookOpen className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">إضافة تسميع</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
            <MapPin className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">فعالية جديدة</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <Trophy className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">مسابقة جديدة</span>
          </button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Dashboard;