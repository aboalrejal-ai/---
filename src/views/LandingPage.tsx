import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { Button } from '../components/ui'
import { Logo } from '../components/Logo'
import { useLogo } from '../contexts/LogoContext'

export const LandingPage: React.FC = () => {
  const { setLogoType } = useLogo()

  React.useEffect(() => {
    setLogoType('landing')
  }, [setLogoType])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-accent">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* الرأس */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Logo size="lg" />
            <Link to="/login">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-brand-primary">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </header>

        {/* المحتوى الرئيسي */}
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* العنوان الرئيسي */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                منصة النشاط الطلابي
                <span className="block text-brand-accent">المتكاملة</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                نظام شامل لإدارة جميع جوانب النشاط الطلابي من الحضور والغياب إلى التسميع والمالية
              </p>
            </div>

            {/* المميزات الرئيسية */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-white mb-2">إدارة التسميع</h3>
                <p className="text-white/80">تتبع وحفظ تقدم الطلاب في حفظ القرآن الكريم</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-white mb-2">متابعة الحضور</h3>
                <p className="text-white/80">تسجيل ومراقبة حضور وغياب الطلاب بسهولة</p>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-white mb-2">الشؤون المالية</h3>
                <p className="text-white/80">إدارة الاشتراكات والمدفوعات والتقارير المالية</p>
              </Card>
            </div>

            {/* زر البدء */}
            <div className="space-y-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-white text-brand-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
                >
                  ابدأ الآن
                </Button>
              </Link>

              <p className="text-white/70 text-sm">
                انضم إلينا لتجربة تعليمية متميزة ومنظمة
              </p>
            </div>
          </div>
        </main>

        {/* التذييل */}
        <footer className="p-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/60 text-sm">
              © 2024 منصة النشاط الطلابي - جميع الحقوق محفوظة
            </p>
            <p className="text-white/60 text-sm mt-2">
              تم التطوير بواسطة محمد أبو الرجال
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}