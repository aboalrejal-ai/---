import React from 'react';

// User Types
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

// Attendance Types
export interface Attendance {
  id: string;
  userId: string;
  date: string;
  time: string;
  createdAt: string;
}

// Surah Types
export interface Surah {
  id: string;
  name: string;
  totalVerses: number;
  createdAt: string;
  updatedAt: string;
}

// Recitation Progress Types
export interface RecitationProgress {
  id: string;
  userId: string;
  surahId: string;
  versesMemorized: number;
  createdAt: string;
  updatedAt: string;
}

// Event Types
export enum EventType {
  Trip = 'trip',
  Competition = 'competition',
  Meeting = 'meeting',
  Activity = 'activity'
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  location?: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdAt: string;
  updatedAt: string;
}

// Financial Types
export interface FinancialRecord {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  createdBy: string;
  createdAt: string;
}

// Violation Types
export enum ViolationType {
  Absence = 'غياب',
  Lateness = 'تأخير',
  Behavior = 'سلوك',
  Other = 'أخرى'
}

export interface Violation {
  id: string;
  userId: string;
  type: ViolationType;
  description: string;
  severity: 'minor' | 'major' | 'severe';
  date: string;
  createdBy: string;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

// Search Types
export interface SearchResult {
  id: string;
  type: 'user' | 'event' | 'attendance' | 'violation';
  title: string;
  description: string;
  data: any;
}

// View Types
export enum View {
  Dashboard = 'dashboard',
  Profile = 'profile',
  Members = 'members',
  Attendance = 'attendance',
  Recitation = 'recitation',
  Events = 'events',
  Trips = 'trips',
  Competitions = 'competitions',
  Violations = 'violations',
  Finance = 'finance',
  Reports = 'reports',
  Settings = 'settings'
}

// Component Props Types
export interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  users: User[];
  loading: boolean;
  signInWithGoogle: () => Promise<boolean>;
  login: (emailOrUser: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'> & { password?: string }) => Promise<boolean>;
  updateUser: (id: string, updates: Partial<User>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  addStudent: (student: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  // Data arrays
  attendance: Attendance[];
  surahs: Surah[];
  recitationProgress: RecitationProgress[];
  events: Event[];
  violations: Violation[];
  financialRecords: FinancialRecord[];
  notifications: Notification[];
  // Data manipulation functions
  addAttendance: (attendance: Omit<Attendance, 'id' | 'createdAt'>) => Promise<boolean>;
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  addViolation: (violation: Omit<Violation, 'id' | 'createdAt'>) => Promise<boolean>;
  updateRecitationProgress: (userId: string, surahId: string, versesMemorized: number) => Promise<boolean>;
  addFinancialRecord: (record: Omit<FinancialRecord, 'id' | 'createdAt'>) => Promise<boolean>;
  markNotificationAsRead: (id: string) => Promise<boolean>;
}

// Logo Context Types
export interface LogoContextType {
  logoType: 'default' | 'landing';
  setLogoType: (type: 'default' | 'landing') => void;
}

// Search Hook Types
export interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  searchInData: (query: string, ...dataArrays: any[][]) => void;
  clearSearch: () => void;
}