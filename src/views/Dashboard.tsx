import React from 'react'
import { Card } from '../components/ui'
import { Button } from '../components/ui'
import { useAuth } from '../contexts/AuthContext'
import { useSupabaseData } from '../hooks'
import {
  User,
  Calendar,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Award,
  Clock,
  DollarSign
} from 'lucide-react'
import { formatDate } from '../utils/date'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  subtitle?: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, subtitle }) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
        {icon}
      </div>
    </div>
  </Card>
)

export const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { events, attendance, recitationProgress } = useSupabaseData()

  // حساب الإحصائيات
  const stats = React.useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const thisMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

    const todayAttendance = attendance.filter(a => a.date === today)
    const presentToday = todayAttendance.filter(a => a.status === 'حاضر').length
    const totalToday = todayAttendance.length

    const upcomingEvents = events.filter(e => e.date >= today)
    const thisMonthEvents = events.filter(e => e.date.startsWith(thisMonth))

    const userProgress = recitationProgress.filter(p => p.userId === user?.id)
    const totalVersesMemorized = userProgress.reduce((sum, p) => sum + p.versesMemorized, 0)

    return {
      todayAttendance: totalToday > 0 ? `${presentToday}/${totalToday}` : 'لا توجد بيانات',
      upcomingEvents: upcomingEvents.length,
      thisMonthEvents: thisMonthEvents.length,
      totalVersesMemorized,
      attendanceRate: totalToday > 0 ? Math.round((presentToday / totalToday) * 100) : 0,
    }
  }, [events, attendance, recitationProgress, user?.id])

  return (
    <div className="space-y-6">
      {/* ترحيب المستخدم */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-lg p-6">
        <div className="flex items-center gap-4">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-white/50"
            />
          ) : (
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">
              مرحباً، {user?.name}!
            </h1>
            <p className="text-white/90">
              {formatDate(new Date())} - {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="الحضور اليوم"
          value={stats.todayAttendance}
          icon={<CheckCircle size={24} className="text-green-600" />}
          color="text-green-600"
          subtitle={`${stats.attendanceRate}% معدل الحضور`}
        />

        <StatCard
          title="الفعاليات القادمة"
          value={stats.upcomingEvents}
          icon={<Calendar size={24} className="text-blue-600" />}
          color="text-blue-600"
          subtitle="فعالية متاحة للمشاركة"
        />

        <StatCard
          title="فعاليات الشهر"
          value={stats.thisMonthEvents}
          icon={<TrendingUp size={24} className="text-purple-600" />}
          color="text-purple-600"
          subtitle="نشاطات هذا الشهر"
        />

        <StatCard
          title="الآيات المحفوظة"
          value={stats.totalVersesMemorized}
          icon={<BookOpen size={24} className="text-orange-600" />}
          color="text-orange-600"
          subtitle="إجمالي التقدم في التسميع"
        />
      </div>

      {/* قسم النشاطات الحديثة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الفعاليات القادمة */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              الفعاليات القادمة
            </h2>
            <Button variant="ghost" size="sm">
              عرض الكل
            </Button>
          </div>

          {events.filter(e => e.date >= new Date().toISOString().split('T')[0]).slice(0, 3).length > 0 ? (
            <div className="space-y-3">
              {events
                .filter(e => e.date >= new Date().toISOString().split('T')[0])
                .slice(0, 3)
                .map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.date)} - {event.type}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      التفاصيل
                    </Button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar size={48} className="mx-auto mb-4 opacity-50" />
              <p>لا توجد فعاليات قادمة</p>
            </div>
          )}
        </Card>

        {/* تقدم التسميع */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              تقدم التسميع
            </h2>
            <Button variant="ghost" size="sm">
              عرض الكل
            </Button>
          </div>

          {recitationProgress.filter(p => p.userId === user?.id).slice(0, 3).length > 0 ? (
            <div className="space-y-3">
              {recitationProgress
                .filter(p => p.userId === user?.id)
                .slice(0, 3)
                .map((progress) => (
                  <div key={`${progress.userId}-${progress.surahId}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900">
                        {progress.versesMemorized} آية محفوظة
                      </p>
                      <p className="text-sm text-gray-600">
                        آخر تحديث: {formatDate(progress.updatedAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${Math.min((progress.versesMemorized / 20) * 100, 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>ابدأ رحلة التسميع الآن</p>
              <Button size="sm" className="mt-3">
                ابدأ التسميع
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* الإنجازات والتقارير السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* إنجازاتي */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-yellow-600" size={24} />
            <h3 className="font-semibold">إنجازاتي</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">حافظ متميز</span>
              <span className="text-sm text-gray-500">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </Card>

        {/* آخر النشاطات */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-blue-600" size={24} />
            <h3 className="font-semibold">آخر النشاطات</h3>
          </div>
          <div className="text-sm text-gray-600">
            آخر تسجيل دخول: {formatDate(new Date())}
          </div>
        </Card>

        {/* الإشعارات */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Bell className="text-red-600" size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>
            <h3 className="font-semibold">الإشعارات</h3>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              تذكير: فعالية قادمة غداً
            </div>
            <div className="text-sm text-gray-600">
              تحديث: تم تحديث نظام التسميع
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}