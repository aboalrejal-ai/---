import { Role, ViolationType, EventType } from './types';

// رسائل الخطأ
export const ERROR_MESSAGES = {
  GOOGLE_AUTH_FAILED: 'فشل في تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.',
  EMAIL_ALREADY_EXISTS: 'هذا البريد الإلكتروني مسجل بالفعل.',
  INVALID_CREDENTIALS: 'بيانات الدخول غير صحيحة.',
  UNAUTHORIZED_ACCESS: 'ليس لديك صلاحية للوصول إلى هذه الصفحة.',
  USER_MANAGEMENT_RESTRICTED: 'إدارة المستخدمين مخصصة للمطور فقط.',
  NETWORK_ERROR: 'خطأ في الاتصال. يرجى التحقق من الإنترنت.',
  GENERIC_ERROR: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
  REQUIRED_FIELD: 'هذا الحقل مطلوب.',
  INVALID_EMAIL: 'صيغة البريد الإلكتروني غير صحيحة.',
  INVALID_PHONE: 'رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.',
  PASSWORD_TOO_SHORT: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',
  PASSWORDS_NOT_MATCH: 'كلمات المرور غير متطابقة.',
} as const;

// رسائل النجاح
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'تم تسجيل الدخول بنجاح!',
  LOGOUT_SUCCESS: 'تم تسجيل الخروج بنجاح!',
  REGISTRATION_SUCCESS: 'تم إنشاء الحساب بنجاح!',
  PROFILE_UPDATED: 'تم تحديث الملف الشخصي بنجاح!',
  USER_ADDED: 'تم إضافة المستخدم بنجاح!',
  USER_UPDATED: 'تم تحديث بيانات المستخدم بنجاح!',
  USER_DELETED: 'تم حذف المستخدم بنجاح!',
  ATTENDANCE_RECORDED: 'تم تسجيل الحضور بنجاح!',
  EVENT_CREATED: 'تم إنشاء الفعالية بنجاح!',
  EVENT_UPDATED: 'تم تحديث الفعالية بنجاح!',
  EVENT_DELETED: 'تم حذف الفعالية بنجاح!',
  VIOLATION_ADDED: 'تم تسجيل المخالفة بنجاح!',
  RECITATION_UPDATED: 'تم تحديث تقدم التسميع بنجاح!',
  FINANCIAL_RECORD_ADDED: 'تم إضافة السجل المالي بنجاح!',
} as const;

// قواعد التحقق من صحة البيانات
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^05[0-9]{8}$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99,
  MIN_VERSES: 0,
  MAX_VERSES: 286, // أطول سورة (البقرة)
} as const;

// الأدوار والصلاحيات
export const ROLE_PERMISSIONS = {
  [Role.Student]: {
    canViewDashboard: true,
    canViewProfile: true,
    canViewEvents: true,
    canViewAttendance: true,
    canViewRecitation: true,
    canManageUsers: false,
    canManageFinance: false,
    canManageViolations: false,
    canViewReports: false,
  },
  [Role.Supervisor]: {
    canViewDashboard: true,
    canViewProfile: true,
    canViewEvents: true,
    canViewAttendance: true,
    canViewRecitation: true,
    canManageUsers: false,
    canManageFinance: false,
    canManageViolations: true,
    canViewReports: true,
  },
  [Role.GroupLeader]: {
    canViewDashboard: true,
    canViewProfile: true,
    canViewEvents: true,
    canViewAttendance: true,
    canViewRecitation: true,
    canManageUsers: false,
    canManageFinance: false,
    canManageViolations: true,
    canViewReports: true,
  },
  [Role.Teacher]: {
    canViewDashboard: true,
    canViewProfile: true,
    canViewEvents: true,
    canViewAttendance: true,
    canViewRecitation: true,
    canManageUsers: true,
    canManageFinance: true,
    canManageViolations: true,
    canViewReports: true,
  },
  [Role.SuperAdmin]: {
    canViewDashboard: true,
    canViewProfile: true,
    canViewEvents: true,
    canViewAttendance: true,
    canViewRecitation: true,
    canManageUsers: true,
    canManageFinance: true,
    canManageViolations: true,
    canViewReports: true,
  },
} as const;

// السور القرآنية
export const SURAHS = [
  { name: 'الفاتحة', totalVerses: 7 },
  { name: 'البقرة', totalVerses: 286 },
  { name: 'آل عمران', totalVerses: 200 },
  { name: 'النساء', totalVerses: 176 },
  { name: 'المائدة', totalVerses: 120 },
  { name: 'الأنعام', totalVerses: 165 },
  { name: 'الأعراف', totalVerses: 206 },
  { name: 'الأنفال', totalVerses: 75 },
  { name: 'التوبة', totalVerses: 129 },
  { name: 'يونس', totalVerses: 109 },
  { name: 'هود', totalVerses: 123 },
  { name: 'يوسف', totalVerses: 111 },
  { name: 'الرعد', totalVerses: 43 },
  { name: 'إبراهيم', totalVerses: 52 },
  { name: 'الحجر', totalVerses: 99 },
  { name: 'النحل', totalVerses: 128 },
  { name: 'الإسراء', totalVerses: 111 },
  { name: 'الكهف', totalVerses: 110 },
  { name: 'مريم', totalVerses: 98 },
  { name: 'طه', totalVerses: 135 },
  // يمكن إضافة باقي السور حسب الحاجة
] as const;

// أنواع المخالفات
export const VIOLATION_TYPES = [
  { type: ViolationType.Absence, label: 'غياب', severity: 'major' },
  { type: ViolationType.Lateness, label: 'تأخير', severity: 'minor' },
  { type: ViolationType.Behavior, label: 'سلوك', severity: 'major' },
  { type: ViolationType.Other, label: 'أخرى', severity: 'minor' },
] as const;

// أنواع الفعاليات
export const EVENT_TYPES = [
  { type: EventType.Trip, label: 'رحلة', icon: '🚌' },
  { type: EventType.Competition, label: 'مسابقة', icon: '🏆' },
  { type: EventType.Meeting, label: 'اجتماع', icon: '👥' },
  { type: EventType.Activity, label: 'نشاط', icon: '🎯' },
] as const;

// الفئات المالية
export const FINANCIAL_CATEGORIES = {
  INCOME: [
    'رسوم الاشتراك',
    'تبرعات',
    'مبيعات',
    'رعايات',
    'أخرى'
  ],
  EXPENSE: [
    'رحلات',
    'مسابقات',
    'مواد تعليمية',
    'ضيافة',
    'صيانة',
    'أخرى'
  ]
} as const;

// إعدادات التطبيق
export const APP_CONFIG = {
  APP_NAME: 'منصة النشاط الطلابي',
  VERSION: '1.0.0',
  DEVELOPER: 'محمد ابوالرجال',
  CONTACT_EMAIL: 'contact@student-platform.com',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  DEFAULT_AVATAR: '/assets/default-avatar.png',
  ITEMS_PER_PAGE: 20,
  DEBOUNCE_DELAY: 300,
} as const;

// ألوان الحالات
export const STATUS_COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  primary: '#1e3a8a',
  secondary: '#3b82f6',
} as const;

// أيقونات الأدوار
export const ROLE_ICONS = {
  [Role.Student]: '👨‍🎓',
  [Role.Supervisor]: '👨‍🏫',
  [Role.GroupLeader]: '👑',
  [Role.Teacher]: '🧑‍🏫',
  [Role.SuperAdmin]: '⚙️',
} as const;

// عناوين الصفحات
export const PAGE_TITLES = {
  dashboard: 'الرئيسية',
  profile: 'الملف الشخصي',
  members: 'إدارة الأعضاء',
  attendance: 'الحضور والغياب',
  recitation: 'التسميع',
  events: 'الفعاليات',
  trips: 'الرحلات',
  competitions: 'المسابقات',
  violations: 'المخالفات',
  finance: 'المالية',
  reports: 'التقارير',
  settings: 'الإعدادات',
} as const;