-- منصة النشاط الطلابي - قاعدة البيانات
-- تطوير: محمد ابوالرجال

-- تفعيل Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- إنشاء جدول المستخدمين
CREATE TABLE public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('طالب', 'مشرف', 'رئيس مجموعة', 'معلم', 'مطور النظام')),
    image_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الحضور
CREATE TABLE public.attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول السور القرآنية
CREATE TABLE public.surahs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    total_verses INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول تقدم التسميع
CREATE TABLE public.recitation_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    surah_id UUID NOT NULL REFERENCES public.surahs(id) ON DELETE CASCADE,
    verses_memorized INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, surah_id)
);

-- إنشاء جدول الفعاليات
CREATE TABLE public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('trip', 'competition', 'meeting', 'activity')),
    date TEXT NOT NULL,
    location TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المخالفات
CREATE TABLE public.violations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('غياب', 'تأخير', 'سلوك', 'أخرى')),
    description TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('minor', 'major', 'severe')),
    date TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول السجلات المالية
CREATE TABLE public.financial_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    created_by UUID NOT NULL REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الإشعارات
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'success', 'error')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج السور القرآنية الأساسية
INSERT INTO public.surahs (name, total_verses) VALUES
('الفاتحة', 7),
('البقرة', 286),
('آل عمران', 200),
('النساء', 176),
('المائدة', 120),
('الأنعام', 165),
('الأعراف', 206),
('الأنفال', 75),
('التوبة', 129),
('يونس', 109),
('هود', 123),
('يوسف', 111),
('الرعد', 43),
('إبراهيم', 52),
('الحجر', 99),
('النحل', 128),
('الإسراء', 111),
('الكهف', 110),
('مريم', 98),
('طه', 135),
('الأنبياء', 112),
('الحج', 78),
('المؤمنون', 118),
('النور', 64),
('الفرقان', 77),
('الشعراء', 227),
('النمل', 93),
('القصص', 88),
('العنكبوت', 69),
('الروم', 60),
('لقمان', 34),
('السجدة', 30),
('الأحزاب', 73),
('سبأ', 54),
('فاطر', 45),
('يس', 83),
('الصافات', 182),
('ص', 88),
('الزمر', 75),
('غافر', 85),
('فصلت', 54),
('الشورى', 53),
('الزخرف', 89),
('الدخان', 59),
('الجاثية', 37),
('الأحقاف', 35),
('محمد', 38),
('الفتح', 29),
('الحجرات', 18),
('ق', 45),
('الذاريات', 60),
('الطور', 49),
('النجم', 62),
('القمر', 55),
('الرحمن', 78),
('الواقعة', 96),
('الحديد', 29),
('المجادلة', 22),
('الحشر', 24),
('الممتحنة', 13),
('الصف', 14),
('الجمعة', 11),
('المنافقون', 11),
('التغابن', 18),
('الطلاق', 12),
('التحريم', 12),
('الملك', 30),
('القلم', 52),
('الحاقة', 52),
('المعارج', 44),
('نوح', 28),
('الجن', 28),
('المزمل', 20),
('المدثر', 56),
('القيامة', 40),
('الإنسان', 31),
('المرسلات', 50),
('النبأ', 40),
('النازعات', 46),
('عبس', 42),
('التكوير', 29),
('الانفطار', 19),
('المطففين', 36),
('الانشقاق', 25),
('البروج', 22),
('الطارق', 17),
('الأعلى', 19),
('الغاشية', 26),
('الفجر', 30),
('البلد', 20),
('الشمس', 15),
('الليل', 21),
('الضحى', 11),
('الشرح', 8),
('التين', 8),
('العلق', 19),
('القدر', 5),
('البينة', 8),
('الزلزلة', 8),
('العاديات', 11),
('القارعة', 11),
('التكاثر', 8),
('العصر', 3),
('الهمزة', 9),
('الفيل', 5),
('قريش', 4),
('الماعون', 7),
('الكوثر', 3),
('الكافرون', 6),
('النصر', 3),
('المسد', 5),
('الإخلاص', 4),
('الفلق', 5),
('الناس', 6);

-- تفعيل Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recitation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمستخدمين
CREATE POLICY "Users can view their own profile" ON public.users
FOR SELECT USING (auth.uid()::text = id OR 
                  (SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مدير النظام', 'معلم', 'مشرف'));

CREATE POLICY "Admins can manage users" ON public.users
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم'));

-- سياسات الأمان للحضور
CREATE POLICY "Users can view attendance" ON public.attendance
FOR SELECT USING (user_id = auth.uid()::text OR 
                  (SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

CREATE POLICY "Supervisors can manage attendance" ON public.attendance
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

-- سياسات الأمان للسور
CREATE POLICY "Everyone can view surahs" ON public.surahs
FOR SELECT USING (true);

CREATE POLICY "Admins can manage surahs" ON public.surahs
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم'));

-- سياسات الأمان لتقدم التسميع
CREATE POLICY "Users can view their recitation progress" ON public.recitation_progress
FOR SELECT USING (user_id = auth.uid()::text OR 
                  (SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

CREATE POLICY "Supervisors can manage recitation progress" ON public.recitation_progress
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

-- سياسات الأمان للفعاليات
CREATE POLICY "Everyone can view events" ON public.events
FOR SELECT USING (true);

CREATE POLICY "Supervisors can manage events" ON public.events
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

-- سياسات الأمان للمخالفات
CREATE POLICY "Users can view their violations" ON public.violations
FOR SELECT USING (user_id = auth.uid()::text OR 
                  (SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

CREATE POLICY "Supervisors can manage violations" ON public.violations
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

-- سياسات الأمان للسجلات المالية
CREATE POLICY "Admins can manage financial records" ON public.financial_records
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم'));

-- سياسات الأمان للإشعارات
CREATE POLICY "Users can view their notifications" ON public.notifications
FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Admins can manage notifications" ON public.notifications
FOR ALL USING ((SELECT role FROM public.users WHERE id = auth.uid()::text) IN ('مطور النظام', 'معلم', 'مشرف'));

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_attendance_user_id ON public.attendance(user_id);
CREATE INDEX idx_attendance_date ON public.attendance(date);
CREATE INDEX idx_recitation_progress_user_id ON public.recitation_progress(user_id);
CREATE INDEX idx_recitation_progress_surah_id ON public.recitation_progress(surah_id);
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_type ON public.events(type);
CREATE INDEX idx_violations_user_id ON public.violations(user_id);
CREATE INDEX idx_violations_date ON public.violations(date);
CREATE INDEX idx_financial_records_date ON public.financial_records(date);
CREATE INDEX idx_financial_records_type ON public.financial_records(type);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء triggers لتحديث updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_surahs_updated_at BEFORE UPDATE ON public.surahs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recitation_progress_updated_at BEFORE UPDATE ON public.recitation_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();