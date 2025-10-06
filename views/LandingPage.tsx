import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, Users, Calendar, Trophy, 
  BarChart3, Shield, Smartphone, Globe 
} from 'lucide-react';
import Logo from '../components/Logo';
import Button from '../components/ui/Button';
import { useLogo } from '../contexts/LogoProvider';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setLogoType } = useLogo();

  useEffect(() => {
    setLogoType('landing');
    return () => setLogoType('default');
  }, [setLogoType]);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'إدارة الأعضاء',
      description: 'إدارة شاملة لجميع أعضاء النشاط الطلابي مع تحديد الأدوار والصلاحيات'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'الحضور والغياب',
      description: 'تتبع دقيق لحضور الطلاب مع إحصائيات مفصلة وتقارير شاملة'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'متابعة التسميع',
      description: 'نظام متقدم لمتابعة تقدم الطلاب في حفظ القرآن الكريم'
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: 'الفعاليات والمسابقات',
      description: 'تنظيم وإدارة الرحلات والمسابقات والأنشطة المختلفة'
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'التقارير والإحصائيات',
      description: 'تقارير مفصلة وإحصائيات دقيقة لمتابعة الأداء والتقدم'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'الأمان والحماية',
      description: 'نظام أمان متقدم مع صلاحيات متدرجة وحماية البيانات'
    }
  ];

  const stats = [
    { number: '500+', label: 'طالب مسجل' },
    { number: '50+', label: 'فعالية منظمة' },
    { number: '95%', label: 'معدل الرضا' },
    { number: '24/7', label: 'دعم مستمر' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/login')}
                variant="secondary"
                size="sm"
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-primary mb-6 font-adir">
              منصة النشاط الطلابي
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              حل متكامل لإدارة جميع جوانب النشاط الطلابي من الحضور والغياب إلى التسميع والمالية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/login')}
                size="lg"
                className="text-lg px-8 py-4"
              >
                ابدأ الآن
              </Button>
              <Button
                onClick={() => navigate('/about')}
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4"
              >
                تعرف أكثر
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-brand-primary opacity-10">
          <BookOpen className="h-24 w-24" />
        </div>
        <div className="absolute bottom-10 right-10 text-brand-secondary opacity-10">
          <Users className="h-32 w-32" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4 font-adir">
              مميزات المنصة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              منصة شاملة تجمع كل ما تحتاجه لإدارة النشاط الطلابي بكفاءة وسهولة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-brand-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-adir">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-l from-brand-primary to-brand-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-adir">
              أرقام تتحدث عن نفسها
            </h2>
            <p className="text-xl text-blue-100">
              ثقة المستخدمين هي أولويتنا
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4 font-adir">
              تقنية حديثة وموثوقة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              مبنية بأحدث التقنيات لضمان الأداء العالي والأمان المطلق
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-brand-primary mb-4 flex justify-center">
                <Smartphone className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-adir">
                متوافق مع الجوال
              </h3>
              <p className="text-gray-600">
                يعمل بسلاسة على جميع الأجهزة المحمولة والأجهزة اللوحية
              </p>
            </div>

            <div className="text-center">
              <div className="text-brand-primary mb-4 flex justify-center">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-adir">
                أمان عالي
              </h3>
              <p className="text-gray-600">
                حماية متقدمة للبيانات مع نظام صلاحيات متدرج
              </p>
            </div>

            <div className="text-center">
              <div className="text-brand-primary mb-4 flex justify-center">
                <Globe className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-adir">
                متاح دائماً
              </h3>
              <p className="text-gray-600">
                خدمة سحابية موثوقة متاحة 24/7 مع نسخ احتياطية آمنة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4 font-adir">
            ابدأ رحلتك معنا اليوم
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            انضم إلى مئات المؤسسات التعليمية التي تثق في منصتنا لإدارة أنشطتها الطلابية
          </p>
          <Button
            onClick={() => navigate('/login')}
            size="lg"
            className="text-lg px-12 py-4"
          >
            ابدأ مجاناً
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Logo />
              <p className="mt-4 text-blue-200 max-w-md">
                منصة شاملة لإدارة النشاط الطلابي تجمع بين السهولة والكفاءة والأمان
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 font-adir">روابط مهمة</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المميزات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الأسعار</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الدعم</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 font-adir">تواصل معنا</h3>
              <ul className="space-y-2 text-blue-200">
                <li>البريد الإلكتروني</li>
                <li>الهاتف: +966 50 123 4567</li>
                <li>المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 منصة النشاط الطلابي. جميع الحقوق محفوظة.</p>
            <p className="mt-2">تطوير: محمد ابوالرجال</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;