import { Role } from '../types';

// رسائل الخطأ
export const ERROR_MESSAGES = {
  GOOGLE_AUTH_FAILED: 'فشل في تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.',
  EMAIL_ALREADY_EXISTS: 'هذا البريد الإلكتروني مسجل بالفعل.',
  UNAUTHORIZED_ACCESS: 'ليس لديك صلاحية للوصول إلى هذه الصفحة.',
  USER_MANAGEMENT_RESTRICTED: 'إدارة المستخدمين مخصصة للمطور فقط.',
  INVALID_CREDENTIALS: 'بيانات الدخول غير صحيحة.',
  NETWORK_ERROR: 'خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
  UNKNOWN_ERROR: 'حدث خطأ غير متوقع.',
  REQUIRED_FIELD: 'هذا الحقل مطلوب.',
  INVALID_EMAIL: 'البريد الإلكتروني غير صحيح.',
  INVALID_PHONE: 'رقم الهاتف غير صحيح.',
  PASSWORD_TOO_SHORT: 'كلمة المرور قصيرة جداً.',
  PASSWORDS_DONT_MATCH: 'كلمات المرور غير متطابقة.'
} as const;

// قواعد التحقق
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^05[0-9]{8}$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99,
  MAX_DESCRIPTION_LENGTH: 500
} as const;

// رسائل النجاح
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'تم تسجيل الدخول بنجاح.',
  LOGOUT_SUCCESS: 'تم تسجيل الخروج بنجاح.',
  REGISTER_SUCCESS: 'تم إنشاء الحساب بنجاح.',
  UPDATE_SUCCESS: 'تم التحديث بنجاح.',
  DELETE_SUCCESS: 'تم الحذف بنجاح.',
  CREATE_SUCCESS: 'تم الإنشاء بنجاح.',
  SAVE_SUCCESS: 'تم الحفظ بنجاح.'
} as const;

// عناصر القائمة الجانبية
export const SIDEBAR_ITEMS = [
  {
    icon: 'Home',
    label: 'الرئيسية',
    path: '/dashboard',
    roles: [Role.Student, Role.Supervisor, Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'User',
    label: 'الملف الشخصي',
    path: '/profile',
    roles: [Role.Student, Role.Supervisor, Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'Users',
    label: 'الأعضاء',
    path: '/members',
    roles: [Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'Calendar',
    label: 'الفعاليات',
    path: '/events',
    roles: [Role.Student, Role.Supervisor, Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'CheckCircle',
    label: 'الحضور والغياب',
    path: '/attendance',
    roles: [Role.Supervisor, Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'BookOpen',
    label: 'التسميع',
    path: '/recitation',
    roles: [Role.Student, Role.Supervisor, Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'AlertTriangle',
    label: 'المخالفات',
    path: '/violations',
    roles: [Role.Supervisor, Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'DollarSign',
    label: 'المالية',
    path: '/financial',
    roles: [Role.Teacher, Role.SuperAdmin]
  },
  {
    icon: 'Settings',
    label: 'الإعدادات',
    path: '/settings',
    roles: [Role.SuperAdmin]
  }
] as const;

// أنواع الأحداث
export const EVENT_TYPES = [
  { value: 'trip', label: 'رحلة' },
  { value: 'competition', label: 'مسابقة' },
  { value: 'meeting', label: 'اجتماع' },
  { value: 'other', label: 'أخرى' }
] as const;

// أنواع المخالفات
export const VIOLATION_TYPES = [
  { value: 'behavior', label: 'سلوكي' },
  { value: 'attendance', label: 'حضور' },
  { value: 'academic', label: 'أكاديمي' },
  { value: 'other', label: 'أخرى' }
] as const;

// مستويات الخطورة
export const SEVERITY_LEVELS = [
  { value: 'low', label: 'منخفض', color: 'green' },
  { value: 'medium', label: 'متوسط', color: 'yellow' },
  { value: 'high', label: 'عالي', color: 'red' }
] as const;

// أنواع المعاملات المالية
export const TRANSACTION_TYPES = [
  { value: 'payment', label: 'دفعة' },
  { value: 'refund', label: 'استرداد' },
  { value: 'expense', label: 'مصروف' },
  { value: 'donation', label: 'تبرع' }
] as const;

// فئات المعاملات المالية
export const TRANSACTION_CATEGORIES = [
  { value: 'tuition', label: 'رسوم' },
  { value: 'trip', label: 'رحلة' },
  { value: 'competition', label: 'مسابقة' },
  { value: 'other', label: 'أخرى' }
] as const;

// حالات الحضور
export const ATTENDANCE_STATUS = [
  { value: 'present', label: 'حاضر', color: 'green' },
  { value: 'absent', label: 'غائب', color: 'red' },
  { value: 'late', label: 'متأخر', color: 'yellow' },
  { value: 'excused', label: 'معذور', color: 'blue' }
] as const;

// حالات المعاملات
export const TRANSACTION_STATUS = [
  { value: 'pending', label: 'معلق', color: 'yellow' },
  { value: 'completed', label: 'مكتمل', color: 'green' },
  { value: 'cancelled', label: 'ملغي', color: 'red' }
] as const;

// حالات المخالفات
export const VIOLATION_STATUS = [
  { value: 'pending', label: 'معلق', color: 'yellow' },
  { value: 'resolved', label: 'محلول', color: 'green' },
  { value: 'dismissed', label: 'مرفوض', color: 'red' }
] as const;

// الألوان الأساسية
export const COLORS = {
  primary: '#1e3a8a',
  secondary: '#3b82f6',
  accent: '#60a5fa',
  light: '#f8fafc',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4'
} as const;

// أحجام الخطوط
export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem'
} as const;

// المسافات
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem'
} as const;

// نقاط التوقف للشاشات
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// رسائل الإشعارات
export const NOTIFICATION_MESSAGES = {
  WELCOME: 'مرحباً بك في منصة النشاط الطلابي',
  NEW_EVENT: 'تم إضافة فعالية جديدة',
  ATTENDANCE_MARKED: 'تم تسجيل الحضور',
  VIOLATION_REPORTED: 'تم الإبلاغ عن مخالفة جديدة',
  PAYMENT_RECEIVED: 'تم استلام دفعة جديدة',
  ACHIEVEMENT_UNLOCKED: 'تم فتح إنجاز جديد'
} as const;

// الإعدادات الافتراضية
export const DEFAULT_SETTINGS = {
  ITEMS_PER_PAGE: 10,
  AUTO_SAVE_INTERVAL: 30000, // 30 ثانية
  SESSION_TIMEOUT: 3600000, // ساعة واحدة
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 ميجابايت
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
} as const;