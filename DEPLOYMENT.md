# دليل النشر - منصة النشاط الطلابي

## 📋 متطلبات النشر

### الحد الأدنى لمتطلبات الاستضافة
- **نوع الاستضافة**: Business Plan أو أعلى
- **Node.js**: الإصدار 18 أو أحدث
- **قاعدة البيانات**: PostgreSQL (مطلوبة لـ Supabase)
- **SSL Certificate**: للأمان
- **مساحة التخزين**: 1GB على الأقل

## 🚀 خطوات النشر على Hostinger

### 1. إعداد Supabase

1. **إنشاء مشروع جديد**
   - اذهب إلى [Supabase](https://supabase.com/)
   - أنشئ حساب جديد أو سجل الدخول
   - أنشئ مشروع جديد

2. **إعداد قاعدة البيانات**
   - اذهب إلى SQL Editor
   - انسخ محتوى ملف `database/schema.sql`
   - نفذ الاستعلام

3. **الحصول على مفاتيح API**
   - اذهب إلى Settings > API
   - انسخ `Project URL` و `anon public key`

### 2. إعداد المتغيرات البيئية

أنشئ ملف `.env` في جذر المشروع:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. بناء المشروع

```bash
# تثبيت التبعيات
npm install

# بناء المشروع للإنتاج
npm run build
```

### 4. رفع الملفات إلى Hostinger

1. **الوصول إلى File Manager**
   - سجل الدخول إلى Hostinger Control Panel
   - اذهب إلى File Manager

2. **رفع الملفات**
   - احذف محتوى مجلد `public_html`
   - ارفع جميع ملفات مجلد `dist` إلى `public_html`

3. **إعداد ملف .htaccess**
   
   أنشئ ملف `.htaccess` في `public_html`:
   ```apache
   # React Router Support
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QR,L]
   
   # Security Headers
   Header always set X-Frame-Options DENY
   Header always set X-Content-Type-Options nosniff
   Header always set Referrer-Policy "strict-origin-when-cross-origin"
   Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
   
   # Cache Control
   <IfModule mod_expires.c>
     ExpiresActive on
     ExpiresByType text/css "access plus 1 year"
     ExpiresByType application/javascript "access plus 1 year"
     ExpiresByType image/png "access plus 1 year"
     ExpiresByType image/jpg "access plus 1 year"
     ExpiresByType image/jpeg "access plus 1 year"
     ExpiresByType image/gif "access plus 1 year"
     ExpiresByType image/svg+xml "access plus 1 year"
   </IfModule>
   
   # Gzip Compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/plain
     AddOutputFilterByType DEFLATE text/html
     AddOutputFilterByType DEFLATE text/xml
     AddOutputFilterByType DEFLATE text/css
     AddOutputFilterByType DEFLATE application/xml
     AddOutputFilterByType DEFLATE application/xhtml+xml
     AddOutputFilterByType DEFLATE application/rss+xml
     AddOutputFilterByType DEFLATE application/javascript
     AddOutputFilterByType DEFLATE application/x-javascript
   </IfModule>
   ```

### 5. إعداد متغيرات البيئة في Hostinger

1. **استخدام ملف .env**
   - ارفع ملف `.env` إلى `public_html`
   - تأكد من أن الملف محمي من الوصول العام

2. **أو استخدام إعدادات الاستضافة**
   - اذهب إلى Advanced > Environment Variables
   - أضف المتغيرات المطلوبة

### 6. التحقق من النشر

1. **اختبار الموقع**
   - اذهب إلى رابط موقعك
   - تأكد من تحميل الصفحة الرئيسية
   - اختبر تسجيل الدخول

2. **اختبار قاعدة البيانات**
   - جرب إنشاء حساب جديد
   - تأكد من حفظ البيانات في Supabase

## 🔧 إعدادات إضافية

### SSL Certificate
```bash
# تفعيل SSL في Hostinger
# اذهب إلى SSL > Manage SSL
# فعل Let's Encrypt SSL
```

### Custom Domain
```bash
# إذا كان لديك دومين مخصص
# اذهب إلى Domains > DNS Zone Editor
# أضف A Record يشير إلى IP الخادم
```

### Performance Optimization
```bash
# تفعيل Cloudflare في Hostinger
# اذهب إلى Speed > Cloudflare
# فعل الخدمة للحصول على أداء أفضل
```

## 🔍 استكشاف الأخطاء

### مشاكل شائعة وحلولها

1. **خطأ 404 عند التنقل**
   ```apache
   # تأكد من وجود ملف .htaccess مع إعدادات React Router
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QR,L]
   ```

2. **مشاكل في الاتصال بـ Supabase**
   ```bash
   # تحقق من متغيرات البيئة
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_ANON_KEY
   ```

3. **مشاكل في تحميل الخطوط**
   ```css
   /* تأكد من تحميل الخطوط العربية */
   @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap');
   ```

4. **مشاكل في الأداء**
   ```bash
   # تفعيل ضغط Gzip
   # تحسين الصور
   # استخدام CDN
   ```

## 📊 مراقبة الأداء

### أدوات المراقبة المقترحة
- **Google Analytics**: لتتبع الزوار
- **Sentry**: لمراقبة الأخطاء
- **Supabase Dashboard**: لمراقبة قاعدة البيانات

### مؤشرات الأداء المهمة
- سرعة تحميل الصفحة
- معدل الاستجابة
- استخدام قاعدة البيانات
- عدد المستخدمين النشطين

## 🔄 التحديثات

### عملية التحديث
1. **في بيئة التطوير**
   ```bash
   git pull origin main
   npm install
   npm run build
   ```

2. **رفع التحديث**
   - احتفظ بنسخة احتياطية من الملفات الحالية
   - ارفع ملفات `dist` الجديدة
   - اختبر الموقع

3. **تحديث قاعدة البيانات**
   - نفذ أي استعلامات SQL جديدة
   - تأكد من توافق البيانات

## 🛡️ الأمان

### إعدادات الأمان المطلوبة
- تفعيل SSL
- إخفاء معلومات الخادم
- حماية ملفات الإعداد
- تحديث كلمات المرور بانتظام

### نسخ احتياطية
- نسخة احتياطية يومية من قاعدة البيانات
- نسخة احتياطية أسبوعية من الملفات
- اختبار استعادة النسخ الاحتياطية

## 📞 الدعم

إذا واجهت مشاكل في النشر:

1. **تحقق من السجلات**
   - سجلات Hostinger
   - سجلات Supabase
   - Developer Console في المتصفح

2. **اتصل بالدعم**
   - دعم Hostinger: support@hostinger.com
   - دعم Supabase: support@supabase.com
   - دعم المشروع: support@student-platform.com

---

**ملاحظة**: تأكد من اختبار جميع الميزات بعد النشر للتأكد من عملها بشكل صحيح.