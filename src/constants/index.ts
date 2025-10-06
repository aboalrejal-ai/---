import { Role, View, EventType, AttendanceStatus } from '../types'

// رسائل الخطأ
export const ERROR_MESSAGES = {
  GOOGLE_AUTH_FAILED: 'فشل في تسجيل الدخول عبر Google. يرجى المحاولة مرة أخرى.',
  EMAIL_ALREADY_EXISTS: 'هذا البريد الإلكتروني مسجل بالفعل.',
  UNAUTHORIZED_ACCESS: 'ليس لديك صلاحية للوصول إلى هذه الصفحة.',
  USER_MANAGEMENT_RESTRICTED: 'إدارة المستخدمين مخصصة للمطور فقط.',
  INVALID_EMAIL: 'البريد الإلكتروني غير صالح.',
  INVALID_PHONE: 'رقم الهاتف غير صالح.',
  WEAK_PASSWORD: 'كلمة المرور ضعيفة. يجب أن تكون 6 أحرف على الأقل.',
  NETWORK_ERROR: 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.',
  UNKNOWN_ERROR: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
  REQUIRED_FIELD: 'هذا الحقل مطلوب.',
  INVALID_DATE: 'التاريخ غير صالح.',
  INVALID_TIME: 'الوقت غير صالح.',
} as const

// قواعد التحقق من صحة البيانات
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^05[0-9]{8}$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_VERSUS_COUNT: 1,
  MAX_VERSUS_COUNT: 286, // أطول سورة هي البقرة
} as const

// عناوين الصفحات
export const VIEW_TITLES: Record<View, string> = {
  [View.Dashboard]: 'الرئيسية',
  [View.Members]: 'إدارة الأعضاء',
  [View.Profile]: 'الملف الشخصي',
  [View.Events]: 'الفعاليات والأنشطة',
  [View.Attendance]: 'الحضور والغياب',
  [View.Recitation]: 'التسميع والمراجعة',
  [View.Finance]: 'الشؤون المالية',
  [View.Settings]: 'الإعدادات',
}

// عناصر التنقل حسب الدور
export const NAVIGATION_ITEMS: Array<{
  view: View
  label: string
  icon: string
  roles: Role[]
}> = [
  {
    view: View.Dashboard,
    label: 'الرئيسية',
    icon: 'Home',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Profile,
    label: 'الملف الشخصي',
    icon: 'User',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Events,
    label: 'الفعاليات',
    icon: 'Calendar',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Attendance,
    label: 'الحضور',
    icon: 'CheckCircle',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Recitation,
    label: 'التسميع',
    icon: 'BookOpen',
    roles: [Role.Student, Role.Supervisor, Role.GroupLeader, Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Members,
    label: 'الأعضاء',
    icon: 'Users',
    roles: [Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Finance,
    label: 'المالية',
    icon: 'DollarSign',
    roles: [Role.Teacher, Role.SuperAdmin]
  },
  {
    view: View.Settings,
    label: 'الإعدادات',
    icon: 'Settings',
    roles: [Role.SuperAdmin]
  },
]

// قائمة السور القرآنية (أول 10 سور كمثال)
export const INITIAL_SURAHS = [
  { id: '1', name: 'الفاتحة', totalVerses: 7 },
  { id: '2', name: 'البقرة', totalVerses: 286 },
  { id: '3', name: 'آل عمران', totalVerses: 200 },
  { id: '4', name: 'النساء', totalVerses: 176 },
  { id: '5', name: 'المائدة', totalVerses: 120 },
  { id: '6', name: 'الأنعام', totalVerses: 165 },
  { id: '7', name: 'الأعراف', totalVerses: 206 },
  { id: '8', name: 'الأنفال', totalVerses: 75 },
  { id: '9', name: 'التوبة', totalVerses: 129 },
  { id: '10', name: 'يونس', totalVerses: 109 },
]

// إعدادات النظام الافتراضية
export const DEFAULT_SETTINGS = {
  THEME: 'light',
  LANGUAGE: 'ar',
  NOTIFICATIONS_ENABLED: true,
  EMAIL_NOTIFICATIONS: true,
  PUSH_NOTIFICATIONS: false,
  AUTO_SAVE: true,
  SESSION_TIMEOUT: 30, // دقائق
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15, // دقائق
}

// ألوان النظام
export const COLORS = {
  PRIMARY: '#1e3a8a',
  SECONDARY: '#3b82f6',
  ACCENT: '#60a5fa',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
  LIGHT: '#f8fafc',
  DARK: '#1e293b',
  GRAY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  }
}

// رموز الأيقونات (Lucide React)
export const ICONS = {
  HOME: 'Home',
  USER: 'User',
  USERS: 'Users',
  CALENDAR: 'Calendar',
  CHECK_CIRCLE: 'CheckCircle',
  BOOK_OPEN: 'BookOpen',
  DOLLAR_SIGN: 'DollarSign',
  SETTINGS: 'Settings',
  BELL: 'Bell',
  SEARCH: 'Search',
  PLUS: 'Plus',
  EDIT: 'Edit',
  TRASH: 'Trash',
  SAVE: 'Save',
  CANCEL: 'X',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  CHEVRON_DOWN: 'ChevronDown',
  CHEVRON_UP: 'ChevronUp',
  EYE: 'Eye',
  EYE_OFF: 'EyeOff',
  LOG_OUT: 'LogOut',
  LOG_IN: 'LogIn',
  USER_PLUS: 'UserPlus',
  FILE_TEXT: 'FileText',
  DOWNLOAD: 'Download',
  UPLOAD: 'Upload',
  FILTER: 'Filter',
  SORT_ASC: 'SortAsc',
  SORT_DESC: 'SortDesc',
  MORE_HORIZONTAL: 'MoreHorizontal',
  MORE_VERTICAL: 'MoreVertical',
  STAR: 'Star',
  HEART: 'Heart',
  THUMBS_UP: 'ThumbsUp',
  SHARE: 'Share',
  COPY: 'Copy',
  CLIPBOARD: 'Clipboard',
  EXTERNAL_LINK: 'ExternalLink',
  MAIL: 'Mail',
  PHONE: 'Phone',
  MAP_PIN: 'MapPin',
  CLOCK: 'Clock',
  CAMERA: 'Camera',
  IMAGE: 'Image',
  VIDEO: 'Video',
  MUSIC: 'Music',
  PLAY: 'Play',
  PAUSE: 'Pause',
  VOLUME: 'Volume2',
  MUTE: 'VolumeX',
  MAXIMIZE: 'Maximize',
  MINIMIZE: 'Minimize',
  CLOSE: 'X',
  CHECK: 'Check',
  X: 'X',
  ALERT_CIRCLE: 'AlertCircle',
  ALERT_TRIANGLE: 'AlertTriangle',
  INFO: 'Info',
  HELP_CIRCLE: 'HelpCircle',
} as const