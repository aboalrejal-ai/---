import { format, parseISO, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'EEEE، d MMMM yyyy', { locale: ar });
};

export const formatTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'HH:mm', { locale: ar });
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'EEEE، d MMMM yyyy - HH:mm', { locale: ar });
};

export const formatShortDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy', { locale: ar });
};

export const getTodayDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const getCurrentTime = (): string => {
  return format(new Date(), 'HH:mm');
};

export const getRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(d)) {
    return 'اليوم';
  }
  
  if (isYesterday(d)) {
    return 'أمس';
  }
  
  return formatDistanceToNow(d, { addSuffix: true, locale: ar });
};

export const isDateInRange = (date: string | Date, startDate: string | Date, endDate: string | Date): boolean => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  return d >= start && d <= end;
};

export const addDays = (date: string | Date, days: number): Date => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDayName = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'EEEE', { locale: ar });
};

export const getMonthName = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMMM', { locale: ar });
};