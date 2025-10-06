// أنواع البيانات الأساسية لمنصة النشاط الطلابي

export enum Role {
  Student = 'طالب',
  Supervisor = 'مشرف',
  GroupLeader = 'رئيس مجموعة',
  Teacher = 'معلم',
  SuperAdmin = 'مطور النظام'
}

export enum View {
  Dashboard = 'dashboard',
  Members = 'members',
  Profile = 'profile',
  Events = 'events',
  Attendance = 'attendance',
  Recitation = 'recitation',
  Finance = 'finance',
  Settings = 'settings'
}

export enum EventType {
  Trip = 'رحلة',
  Competition = 'مسابقة',
  Lecture = 'محاضرة',
  Workshop = 'ورشة عمل',
  Other = 'أخرى'
}

export enum AttendanceStatus {
  Present = 'حاضر',
  Absent = 'غائب',
  Late = 'متأخر',
  Permission = 'مأذون'
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
  imageUrl?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  type: EventType
  date: string
  time: string
  location?: string
  organizer?: string
  participants?: string[]
  createdAt: string
  updatedAt: string
}

export interface Attendance {
  id: string
  userId: string
  date: string
  time: string
  status: AttendanceStatus
  notes?: string
  createdAt: string
}

export interface Surah {
  id: string
  name: string
  totalVerses: number
  createdAt: string
  updatedAt: string
}

export interface RecitationProgress {
  id: string
  userId: string
  surahId: string
  versesMemorized: number
  createdAt: string
  updatedAt: string
}

export interface FinanceRecord {
  id: string
  userId: string
  amount: number
  type: 'income' | 'expense'
  description: string
  date: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: string
}

export interface SearchResult {
  id: string
  title: string
  type: 'user' | 'event' | 'surah' | 'attendance'
  data: any
}

// أنواع إضافية للاستخدام في الخطافات والسياقات

export interface AuthContextType {
  user: User | null
  users: User[]
  loading: boolean
  signInWithGoogle: () => Promise<boolean>
  login: (emailOrUser: string, pass: string) => Promise<boolean>
  logout: () => Promise<void>
  register: (user: Omit<User, 'id'> & { password?: string }) => Promise<boolean>
  addStudent: (student: Omit<User, 'id'>) => Promise<boolean>
  addUser: (user: Omit<User, 'id'>) => Promise<boolean>
  updateUser: (id: string, updates: Partial<User>) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
  refreshUsers: () => Promise<void>
}

export interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchResult[]
  searchInData: (query: string, ...dataArrays: any[][]) => void
  clearSearch: () => void
}

export interface LogoContextType {
  logoType: 'default' | 'landing'
  setLogoType: (type: 'default' | 'landing') => void
}