# منصة النشاط الطلابي

منصة متكاملة لإدارة النشاط الطلابي مبنية باستخدام React + TypeScript + Vite + Supabase

## 🚀 المميزات

- **إدارة الأعضاء**: إدارة شاملة للطلاب والمشرفين مع أدوار متدرجة
- **الحضور والغياب**: تتبع دقيق لحضور الطلاب مع إحصائيات مفصلة
- **متابعة التسميع**: نظام متقدم لمتابعة تقدم الطلاب في حفظ القرآن الكريم
- **الفعاليات والمسابقات**: تنظيم وإدارة الرحلات والمسابقات والأنشطة
- **إدارة المخالفات**: تسجيل ومتابعة المخالفات السلوكية
- **النظام المالي**: إدارة الإيرادات والمصروفات
- **التقارير والإحصائيات**: تقارير مفصلة وإحصائيات دقيقة
- **نظام الإشعارات**: إشعارات فورية للأحداث المهمة

## 🛠️ التقنيات المستخدمة

- **Frontend**: React 19.1.1 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Utilities**: clsx

## 📦 التثبيت والإعداد

### المتطلبات الأساسية

- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- حساب Supabase

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd student-activity-platform
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env
```

أضف متغيرات Supabase في ملف `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. **إعداد قاعدة البيانات**
- انسخ محتوى ملف `database/schema.sql`
- نفذه في Supabase SQL Editor

5. **تشغيل المشروع**
```bash
npm run dev
```

## 🏗️ هيكل المشروع

```
├── components/          # المكونات المشتركة
│   ├── ui/             # مكونات واجهة المستخدم الأساسية
│   └── layout/         # مكونات التخطيط
├── config/             # إعدادات الاتصال
├── contexts/           # إدارة الحالة العامة
├── data/               # البيانات الوهمية
├── database/           # ملفات قاعدة البيانات
├── hooks/              # الخطافات المخصصة
├── types/              # تعريفات الأنواع
├── utils/              # أدوات مساعدة
├── views/              # صفحات التطبيق
├── App.tsx             # المكون الرئيسي
├── index.tsx           # نقطة البداية
└── index.css           # الأنماط العامة
```

## 👥 الأدوار والصلاحيات

### الطلاب
- عرض الملف الشخصي
- عرض الحضور الشخصي
- عرض تقدم التسميع
- عرض الفعاليات المتاحة
- استقبال الإشعارات

### المشرفون
- جميع صلاحيات الطلاب
- تسجيل الحضور والغياب
- إدارة التسميع
- تسجيل المخالفات
- عرض التقارير

### المعلمون
- جميع صلاحيات المشرفين
- إدارة الأعضاء
- إدارة الفعاليات
- إدارة النظام المالي
- إدارة الإعدادات

### مطورو النظام
- صلاحية كاملة على جميع الميزات
- إدارة قاعدة البيانات
- إدارة النظام

## 🎨 نظام الألوان

```css
:root {
  --brand-primary: #1e3a8a;      /* أزرق داكن */
  --brand-secondary: #3b82f6;    /* أزرق متوسط */
  --brand-accent: #60a5fa;       /* أزرق فاتح */
  --brand-light: #f8fafc;        /* رمادي فاتح */
  --success: #10b981;            /* أخضر */
  --warning: #f59e0b;            /* برتقالي */
  --error: #ef4444;              /* أحمر */
  --info: #06b6d4;               /* سماوي */
}
```

## 📱 الاستجابة للأجهزة

المنصة مصممة لتعمل بسلاسة على:
- أجهزة سطح المكتب
- الأجهزة اللوحية
- الهواتف الذكية

## 🔒 الأمان

- **Row Level Security (RLS)**: حماية على مستوى الصفوف
- **Authentication**: نظام مصادقة قوي مع Supabase
- **Authorization**: نظام تفويض متدرج
- **Data Validation**: التحقق من صحة البيانات
- **HTTPS**: اتصال آمن في الإنتاج

## 🚀 النشر

### النشر على Hostinger

1. **بناء المشروع**
```bash
npm run build
```

2. **رفع الملفات**
- ارفع محتوى مجلد `dist` إلى `public_html`

3. **إعداد قاعدة البيانات**
- أنشئ قاعدة بيانات PostgreSQL
- نفذ ملف `database/schema.sql`

4. **إعداد Supabase**
- أنشئ مشروع جديد في Supabase
- اربط قاعدة البيانات
- احصل على URL و API Key

5. **إعداد المتغيرات البيئية**
- أضف متغيرات البيئة في إعدادات الاستضافة

## 📊 قاعدة البيانات

### الجداول الرئيسية

- **users**: بيانات المستخدمين
- **attendance**: سجلات الحضور
- **surahs**: السور القرآنية
- **recitation_progress**: تقدم التسميع
- **events**: الفعاليات
- **violations**: المخالفات
- **financial_records**: السجلات المالية
- **notifications**: الإشعارات

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm run test

# فحص الكود
npm run lint
```

## 📝 المساهمة

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 👨‍💻 المطور

**محمد ابوالرجال**
- Email: contact@student-platform.com
- GitHub: [@mohammed-aburajal](https://github.com/mohammed-aburajal)

## 🙏 شكر وتقدير

- [React](https://reactjs.org/) - مكتبة واجهة المستخدم
- [Supabase](https://supabase.com/) - قاعدة البيانات والمصادقة
- [Tailwind CSS](https://tailwindcss.com/) - إطار عمل CSS
- [Lucide](https://lucide.dev/) - مكتبة الأيقونات
- [Vite](https://vitejs.dev/) - أداة البناء

## 📞 الدعم

إذا واجهت أي مشاكل أو كان لديك أسئلة:

1. تحقق من [الأسئلة الشائعة](docs/FAQ.md)
2. ابحث في [Issues](https://github.com/your-repo/issues)
3. أنشئ [Issue جديد](https://github.com/your-repo/issues/new)
4. راسلنا على: support@student-platform.com

---

تم تطوير هذا المشروع بـ ❤️ في المملكة العربية السعودية