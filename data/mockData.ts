import { 
  User, Role, Event, EventType, Attendance, Violation, ViolationType,
  FinancialRecord, Notification, Surah, RecitationProgress 
} from '../types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'محمد ابوالرجال',
    email: 'mohammed@example.com',
    role: Role.SuperAdmin,
    imageUrl: 'https://ui-avatars.com/api/?name=محمد+ابوالرجال&background=1e3a8a&color=ffffff&size=200',
    phone: '0501234567',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: Role.Teacher,
    imageUrl: 'https://ui-avatars.com/api/?name=أحمد+محمد&background=3b82f6&color=ffffff&size=200',
    phone: '0501234568',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    role: Role.Supervisor,
    imageUrl: 'https://ui-avatars.com/api/?name=سارة+أحمد&background=10b981&color=ffffff&size=200',
    phone: '0501234569',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'علي حسن',
    email: 'ali@example.com',
    role: Role.Student,
    imageUrl: 'https://ui-avatars.com/api/?name=علي+حسن&background=f59e0b&color=ffffff&size=200',
    phone: '0501234570',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    role: Role.Student,
    imageUrl: 'https://ui-avatars.com/api/?name=فاطمة+علي&background=8b5cf6&color=ffffff&size=200',
    phone: '0501234571',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'عبدالله محمد',
    email: 'abdullah@example.com',
    role: Role.Student,
    imageUrl: 'https://ui-avatars.com/api/?name=عبدالله+محمد&background=ef4444&color=ffffff&size=200',
    phone: '0501234572',
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z'
  }
];

// Mock Events Data
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'رحلة إلى المتحف الوطني',
    description: 'رحلة تعليمية لاستكشاف التاريخ والثقافة السعودية',
    type: EventType.Trip,
    date: '2024-12-15',
    location: 'المتحف الوطني - الرياض',
    maxParticipants: 30,
    currentParticipants: 15,
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'مسابقة القرآن الكريم',
    description: 'مسابقة في حفظ وتلاوة القرآن الكريم',
    type: EventType.Competition,
    date: '2024-11-20',
    location: 'قاعة المدرسة الكبرى',
    maxParticipants: 50,
    currentParticipants: 25,
    createdAt: '2024-10-02T00:00:00Z',
    updatedAt: '2024-10-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'اجتماع أولياء الأمور',
    description: 'اجتماع دوري مع أولياء الأمور لمناقشة تقدم الطلاب',
    type: EventType.Meeting,
    date: '2024-11-10',
    location: 'قاعة الاجتماعات',
    maxParticipants: 100,
    currentParticipants: 45,
    createdAt: '2024-10-03T00:00:00Z',
    updatedAt: '2024-10-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'ورشة الخط العربي',
    description: 'ورشة تعليمية لتحسين مهارات الخط العربي',
    type: EventType.Activity,
    date: '2024-11-25',
    location: 'مختبر الفنون',
    maxParticipants: 20,
    currentParticipants: 12,
    createdAt: '2024-10-04T00:00:00Z',
    updatedAt: '2024-10-04T00:00:00Z'
  }
];

// Mock Attendance Data
export const mockAttendance: Attendance[] = [
  {
    id: '1',
    userId: '4',
    date: '2024-10-06',
    time: '08:00',
    createdAt: '2024-10-06T08:00:00Z'
  },
  {
    id: '2',
    userId: '5',
    date: '2024-10-06',
    time: '08:05',
    createdAt: '2024-10-06T08:05:00Z'
  },
  {
    id: '3',
    userId: '6',
    date: '2024-10-06',
    time: '08:10',
    createdAt: '2024-10-06T08:10:00Z'
  },
  {
    id: '4',
    userId: '4',
    date: '2024-10-05',
    time: '08:00',
    createdAt: '2024-10-05T08:00:00Z'
  },
  {
    id: '5',
    userId: '5',
    date: '2024-10-05',
    time: '08:15',
    createdAt: '2024-10-05T08:15:00Z'
  }
];

// Mock Violations Data
export const mockViolations: Violation[] = [
  {
    id: '1',
    userId: '6',
    type: ViolationType.Absence,
    description: 'غياب بدون عذر',
    severity: 'major',
    date: '2024-10-04',
    createdBy: '3',
    createdAt: '2024-10-04T10:00:00Z'
  },
  {
    id: '2',
    userId: '5',
    type: ViolationType.Lateness,
    description: 'تأخير 20 دقيقة',
    severity: 'minor',
    date: '2024-10-03',
    createdBy: '3',
    createdAt: '2024-10-03T08:20:00Z'
  },
  {
    id: '3',
    userId: '4',
    type: ViolationType.Behavior,
    description: 'عدم احترام القوانين',
    severity: 'major',
    date: '2024-10-02',
    createdBy: '2',
    createdAt: '2024-10-02T14:30:00Z'
  }
];

// Mock Financial Records Data
export const mockFinancialRecords: FinancialRecord[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000,
    description: 'رسوم اشتراك الطلاب',
    category: 'رسوم الاشتراك',
    date: '2024-10-01',
    createdBy: '2',
    createdAt: '2024-10-01T00:00:00Z'
  },
  {
    id: '2',
    type: 'expense',
    amount: 1500,
    description: 'شراء مواد تعليمية',
    category: 'مواد تعليمية',
    date: '2024-10-02',
    createdBy: '2',
    createdAt: '2024-10-02T00:00:00Z'
  },
  {
    id: '3',
    type: 'income',
    amount: 2000,
    description: 'تبرعات من أولياء الأمور',
    category: 'تبرعات',
    date: '2024-10-03',
    createdBy: '1',
    createdAt: '2024-10-03T00:00:00Z'
  },
  {
    id: '4',
    type: 'expense',
    amount: 800,
    description: 'تكاليف الرحلة',
    category: 'رحلات',
    date: '2024-10-04',
    createdBy: '2',
    createdAt: '2024-10-04T00:00:00Z'
  }
];

// Mock Notifications Data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '4',
    title: 'تذكير بالفعالية',
    message: 'لا تنس حضور مسابقة القرآن الكريم غداً',
    type: 'info',
    read: false,
    createdAt: '2024-10-06T09:00:00Z'
  },
  {
    id: '2',
    userId: '5',
    title: 'تحديث التسميع',
    message: 'تم تسجيل تقدمك في سورة البقرة',
    type: 'success',
    read: true,
    createdAt: '2024-10-05T15:30:00Z'
  },
  {
    id: '3',
    userId: '6',
    title: 'تحذير',
    message: 'تم تسجيل مخالفة غياب بحقك',
    type: 'warning',
    read: false,
    createdAt: '2024-10-04T10:00:00Z'
  }
];

// Mock Surahs Data (first 20 surahs)
export const mockSurahs: Surah[] = [
  { id: '1', name: 'الفاتحة', totalVerses: 7, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'البقرة', totalVerses: 286, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'آل عمران', totalVerses: 200, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '4', name: 'النساء', totalVerses: 176, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '5', name: 'المائدة', totalVerses: 120, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '6', name: 'الأنعام', totalVerses: 165, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '7', name: 'الأعراف', totalVerses: 206, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '8', name: 'الأنفال', totalVerses: 75, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '9', name: 'التوبة', totalVerses: 129, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '10', name: 'يونس', totalVerses: 109, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '11', name: 'هود', totalVerses: 123, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '12', name: 'يوسف', totalVerses: 111, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '13', name: 'الرعد', totalVerses: 43, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '14', name: 'إبراهيم', totalVerses: 52, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '15', name: 'الحجر', totalVerses: 99, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '16', name: 'النحل', totalVerses: 128, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '17', name: 'الإسراء', totalVerses: 111, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '18', name: 'الكهف', totalVerses: 110, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '19', name: 'مريم', totalVerses: 98, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: '20', name: 'طه', totalVerses: 135, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' }
];

// Mock Recitation Progress Data
export const mockRecitationProgress: RecitationProgress[] = [
  {
    id: '1',
    userId: '4',
    surahId: '1',
    versesMemorized: 7,
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-15T00:00:00Z'
  },
  {
    id: '2',
    userId: '4',
    surahId: '2',
    versesMemorized: 150,
    createdAt: '2024-09-16T00:00:00Z',
    updatedAt: '2024-10-05T00:00:00Z'
  },
  {
    id: '3',
    userId: '5',
    surahId: '1',
    versesMemorized: 7,
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-10T00:00:00Z'
  },
  {
    id: '4',
    userId: '5',
    surahId: '18',
    versesMemorized: 110,
    createdAt: '2024-09-11T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z'
  },
  {
    id: '5',
    userId: '6',
    surahId: '1',
    versesMemorized: 7,
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-05T00:00:00Z'
  }
];

// Export all mock data
export const mockData = {
  users: mockUsers,
  events: mockEvents,
  attendance: mockAttendance,
  violations: mockViolations,
  financialRecords: mockFinancialRecords,
  notifications: mockNotifications,
  surahs: mockSurahs,
  recitationProgress: mockRecitationProgress
};