-- سياسات الأمان (Row Level Security) لمنصة النشاط الطلابي

-- تفعيل RLS على جميع الجداول
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surahs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recitation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- سياسات جدول المستخدمين
-- يمكن للمستخدمين رؤية ملفاتهم الشخصية
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id);

-- يمكن للمدرسين والمشرفين رؤية جميع المستخدمين
CREATE POLICY "Teachers and supervisors can view all users" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مطور النظام')
        )
    );

-- يمكن للمستخدمين تحديث ملفاتهم الشخصية
CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id);

-- يمكن للمدرسين إضافة مستخدمين جدد
CREATE POLICY "Teachers can insert users" ON public.users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مطور النظام')
        )
    );

-- يمكن للمدرسين حذف المستخدمين
CREATE POLICY "Teachers can delete users" ON public.users
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مطور النظام')
        )
    );

-- سياسات جدول الأحداث
-- يمكن للجميع رؤية الأحداث
CREATE POLICY "Everyone can view events" ON public.events
    FOR SELECT USING (true);

-- يمكن للمدرسين والمشرفين إضافة أحداث
CREATE POLICY "Teachers and supervisors can insert events" ON public.events
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للمدرسين والمشرفين تحديث الأحداث
CREATE POLICY "Teachers and supervisors can update events" ON public.events
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للمدرسين والمشرفين حذف الأحداث
CREATE POLICY "Teachers and supervisors can delete events" ON public.events
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- سياسات جدول الحضور
-- يمكن للمدرسين والمشرفين رؤية جميع سجلات الحضور
CREATE POLICY "Teachers and supervisors can view all attendance" ON public.attendance
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للطلاب رؤية سجلات حضورهم فقط
CREATE POLICY "Students can view their own attendance" ON public.attendance
    FOR SELECT USING (
        user_id = auth.uid()::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'طالب'
        )
    );

-- يمكن للمدرسين والمشرفين إضافة سجلات حضور
CREATE POLICY "Teachers and supervisors can insert attendance" ON public.attendance
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للمدرسين والمشرفين تحديث سجلات الحضور
CREATE POLICY "Teachers and supervisors can update attendance" ON public.attendance
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- سياسات جدول السور
-- يمكن للجميع رؤية السور
CREATE POLICY "Everyone can view surahs" ON public.surahs
    FOR SELECT USING (true);

-- يمكن للمدرسين إدارة السور
CREATE POLICY "Teachers can manage surahs" ON public.surahs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مطور النظام')
        )
    );

-- سياسات جدول تقدم التسميع
-- يمكن للطلاب رؤية تقدمهم في التسميع
CREATE POLICY "Students can view their own recitation progress" ON public.recitation_progress
    FOR SELECT USING (
        user_id = auth.uid()::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'طالب'
        )
    );

-- يمكن للمدرسين والمشرفين رؤية تقدم جميع الطلاب
CREATE POLICY "Teachers and supervisors can view all recitation progress" ON public.recitation_progress
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للمدرسين والمشرفين إدارة تقدم التسميع
CREATE POLICY "Teachers and supervisors can manage recitation progress" ON public.recitation_progress
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- سياسات جدول المخالفات
-- يمكن للمدرسين والمشرفين رؤية جميع المخالفات
CREATE POLICY "Teachers and supervisors can view all violations" ON public.violations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للطلاب رؤية مخالفاتهم فقط
CREATE POLICY "Students can view their own violations" ON public.violations
    FOR SELECT USING (
        user_id = auth.uid()::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'طالب'
        )
    );

-- يمكن للمدرسين والمشرفين إدارة المخالفات
CREATE POLICY "Teachers and supervisors can manage violations" ON public.violations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- سياسات جدول المعاملات المالية
-- يمكن للمدرسين رؤية جميع المعاملات المالية
CREATE POLICY "Teachers can view all financial transactions" ON public.financial_transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مطور النظام')
        )
    );

-- يمكن للطلاب رؤية معاملاتهم المالية فقط
CREATE POLICY "Students can view their own financial transactions" ON public.financial_transactions
    FOR SELECT USING (
        user_id = auth.uid()::text AND
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'طالب'
        )
    );

-- يمكن للمدرسين إدارة المعاملات المالية
CREATE POLICY "Teachers can manage financial transactions" ON public.financial_transactions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مطور النظام')
        )
    );

-- سياسات جدول الإشعارات
-- يمكن للمستخدمين رؤية إشعاراتهم فقط
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid()::text);

-- يمكن للمدرسين والمشرفين إرسال إشعارات
CREATE POLICY "Teachers and supervisors can send notifications" ON public.notifications
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role IN ('معلم', 'مشرف', 'مطور النظام')
        )
    );

-- يمكن للمستخدمين تحديث حالة قراءة إشعاراتهم
CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid()::text);