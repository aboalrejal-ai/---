// أنواع المستخدمين والأدوار
export enum Role {
  Student = 'طالب',
  Supervisor = 'مشرف',
  GroupLeader = 'رئيس مجموعة',
  Teacher = 'معلم',
  SuperAdmin = 'مطور النظام'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  imageUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// أنواع الأحداث
export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'trip' | 'competition' | 'meeting' | 'other';
  date: string;
  time: string;
  location: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// أنواع الحضور
export interface Attendance {
  id: string;
  userId: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  createdAt: string;
}

// أنواع السور القرآنية
export interface Surah {
  id: string;
  name: string;
  totalVerses: number;
  createdAt: string;
  updatedAt: string;
}

// أنواع تقدم التسميع
export interface RecitationProgress {
  id: string;
  userId: string;
  surahId: string;
  versesMemorized: number;
  createdAt: string;
  updatedAt: string;
}

// أنواع المخالفات
export interface Violation {
  id: string;
  userId: string;
  type: 'behavior' | 'attendance' | 'academic' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'resolved' | 'dismissed';
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
}

// أنواع المعاملات المالية
export interface FinancialTransaction {
  id: string;
  userId: string;
  type: 'payment' | 'refund' | 'expense' | 'donation';
  amount: number;
  description: string;
  category: 'tuition' | 'trip' | 'competition' | 'other';
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// أنواع الإشعارات
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}

// أنواع البحث
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'user' | 'event' | 'attendance' | 'recitation' | 'violation' | 'transaction';
  data: any;
}

// أنواع الإنجازات
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// أنواع الإحصائيات
export interface DashboardStats {
  totalStudents: number;
  totalEvents: number;
  attendanceRate: number;
  recitationProgress: number;
  pendingViolations: number;
  totalRevenue: number;
}

// أنواع الاستجابة من API
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

// أنواع النماذج
export interface LoginForm {
  emailOrUser: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
}

export interface EventForm {
  title: string;
  description: string;
  type: Event['type'];
  date: string;
  time: string;
  location: string;
  maxParticipants?: number;
}

export interface AttendanceForm {
  userId: string;
  date: string;
  time: string;
  status: Attendance['status'];
  notes?: string;
}

export interface RecitationForm {
  userId: string;
  surahId: string;
  versesMemorized: number;
}

export interface ViolationForm {
  userId: string;
  type: Violation['type'];
  description: string;
  severity: Violation['severity'];
}

export interface TransactionForm {
  userId: string;
  type: FinancialTransaction['type'];
  amount: number;
  description: string;
  category: FinancialTransaction['category'];
}