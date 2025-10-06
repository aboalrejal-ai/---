import { User, Event, Surah, Role } from '../types';

// بيانات المستخدمين الوهمية
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد العتيبي',
    email: 'ahmed@example.com',
    role: Role.Student,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '0501234567',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'فاطمة علي السعيد',
    email: 'fatima@example.com',
    role: Role.Student,
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phone: '0502345678',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    name: 'محمد عبدالله الزهراني',
    email: 'mohammed@example.com',
    role: Role.Supervisor,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '0503456789',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '4',
    name: 'سارة أحمد القحطاني',
    email: 'sara@example.com',
    role: Role.Teacher,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phone: '0504567890',
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '5',
    name: 'عبدالرحمن خالد المطيري',
    email: 'abdulrahman@example.com',
    role: Role.Student,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    phone: '0505678901',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
];

// بيانات الأحداث الوهمية
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'رحلة إلى مدينة الطائف',
    description: 'رحلة تعليمية وترفيهية إلى مدينة الطائف لزيارة المعالم التاريخية والحدائق',
    type: 'trip',
    date: '2024-02-15',
    time: '08:00',
    location: 'مدينة الطائف',
    maxParticipants: 30,
    currentParticipants: 15,
    createdBy: '4',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'مسابقة حفظ القرآن الكريم',
    description: 'مسابقة في حفظ القرآن الكريم لجميع المستويات',
    type: 'competition',
    date: '2024-02-20',
    time: '14:00',
    location: 'قاعة المحاضرات الرئيسية',
    maxParticipants: 50,
    currentParticipants: 25,
    createdBy: '4',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z'
  },
  {
    id: '3',
    title: 'اجتماع أولياء الأمور',
    description: 'اجتماع دوري مع أولياء الأمور لمناقشة تقدم الطلاب',
    type: 'meeting',
    date: '2024-02-25',
    time: '16:00',
    location: 'قاعة الاجتماعات',
    maxParticipants: 100,
    currentParticipants: 45,
    createdBy: '4',
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  },
  {
    id: '4',
    title: 'ورشة عمل في البرمجة',
    description: 'ورشة تعليمية في أساسيات البرمجة للطلاب المبتدئين',
    type: 'other',
    date: '2024-03-01',
    time: '10:00',
    location: 'معمل الحاسوب',
    maxParticipants: 20,
    currentParticipants: 12,
    createdBy: '4',
    createdAt: '2024-01-28T10:00:00Z',
    updatedAt: '2024-01-28T10:00:00Z'
  }
];

// بيانات السور القرآنية الوهمية
export const mockSurahs: Surah[] = [
  {
    id: '1',
    name: 'سورة الفاتحة',
    totalVerses: 7,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'سورة البقرة',
    totalVerses: 286,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'سورة آل عمران',
    totalVerses: 200,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '4',
    name: 'سورة النساء',
    totalVerses: 176,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '5',
    name: 'سورة المائدة',
    totalVerses: 120,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '6',
    name: 'سورة الأنعام',
    totalVerses: 165,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '7',
    name: 'سورة الأعراف',
    totalVerses: 206,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '8',
    name: 'سورة الأنفال',
    totalVerses: 75,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '9',
    name: 'سورة التوبة',
    totalVerses: 129,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '10',
    name: 'سورة يونس',
    totalVerses: 109,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '11',
    name: 'سورة هود',
    totalVerses: 123,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '12',
    name: 'سورة يوسف',
    totalVerses: 111,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '13',
    name: 'سورة الرعد',
    totalVerses: 43,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '14',
    name: 'سورة إبراهيم',
    totalVerses: 52,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '15',
    name: 'سورة الحجر',
    totalVerses: 99,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '16',
    name: 'سورة النحل',
    totalVerses: 128,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '17',
    name: 'سورة الإسراء',
    totalVerses: 111,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '18',
    name: 'سورة الكهف',
    totalVerses: 110,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z'
  }
];

// بيانات تقدم التسميع الوهمية
export const mockRecitationProgress = [
  {
    userId: '1',
    surahId: '1',
    versesMemorized: 7
  },
  {
    userId: '1',
    surahId: '2',
    versesMemorized: 50
  },
  {
    userId: '2',
    surahId: '1',
    versesMemorized: 7
  },
  {
    userId: '2',
    surahId: '2',
    versesMemorized: 100
  },
  {
    userId: '5',
    surahId: '1',
    versesMemorized: 7
  },
  {
    userId: '5',
    surahId: '18',
    versesMemorized: 30
  }
];

// بيانات الحضور الوهمية
export const mockAttendance = [
  {
    userId: '1',
    date: '2024-01-15',
    time: '08:00',
    status: 'present'
  },
  {
    userId: '1',
    date: '2024-01-16',
    time: '08:05',
    status: 'late'
  },
  {
    userId: '1',
    date: '2024-01-17',
    time: '08:00',
    status: 'present'
  },
  {
    userId: '2',
    date: '2024-01-15',
    time: '08:00',
    status: 'present'
  },
  {
    userId: '2',
    date: '2024-01-16',
    time: '08:00',
    status: 'present'
  },
  {
    userId: '2',
    date: '2024-01-17',
    time: '08:00',
    status: 'absent'
  },
  {
    userId: '5',
    date: '2024-01-15',
    time: '08:00',
    status: 'present'
  },
  {
    userId: '5',
    date: '2024-01-16',
    time: '08:00',
    status: 'present'
  },
  {
    userId: '5',
    date: '2024-01-17',
    time: '08:00',
    status: 'present'
  }
];

// بيانات المخالفات الوهمية
export const mockViolations = [
  {
    userId: '1',
    type: 'behavior',
    description: 'التحدث أثناء الدرس',
    severity: 'low',
    status: 'resolved',
    reportedBy: '4'
  },
  {
    userId: '2',
    type: 'attendance',
    description: 'الغياب المتكرر',
    severity: 'medium',
    status: 'pending',
    reportedBy: '3'
  }
];

// بيانات المعاملات المالية الوهمية
export const mockFinancialTransactions = [
  {
    userId: '1',
    type: 'payment',
    amount: 500.00,
    description: 'رسوم الفصل الدراسي',
    category: 'tuition',
    status: 'completed'
  },
  {
    userId: '1',
    type: 'payment',
    amount: 100.00,
    description: 'رسوم الرحلة',
    category: 'trip',
    status: 'pending'
  },
  {
    userId: '2',
    type: 'payment',
    amount: 500.00,
    description: 'رسوم الفصل الدراسي',
    category: 'tuition',
    status: 'completed'
  },
  {
    userId: '5',
    type: 'payment',
    amount: 500.00,
    description: 'رسوم الفصل الدراسي',
    category: 'tuition',
    status: 'completed'
  }
];

// بيانات الإشعارات الوهمية
export const mockNotifications = [
  {
    userId: '1',
    title: 'مرحباً بك',
    message: 'مرحباً بك في منصة النشاط الطلابي',
    type: 'info',
    isRead: false
  },
  {
    userId: '1',
    title: 'فعالية جديدة',
    message: 'تم إضافة فعالية جديدة: رحلة إلى مدينة الطائف',
    type: 'info',
    isRead: false
  },
  {
    userId: '2',
    title: 'مرحباً بك',
    message: 'مرحباً بك في منصة النشاط الطلابي',
    type: 'info',
    isRead: true
  },
  {
    userId: '5',
    title: 'مرحباً بك',
    message: 'مرحباً بك في منصة النشاط الطلابي',
    type: 'info',
    isRead: false
  }
];