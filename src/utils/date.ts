// أدوات مساعدة للتعامل مع التواريخ والأوقات

// تنسيق التاريخ باللغة العربية
export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// تنسيق التاريخ بصيغة مختصرة
export const formatDateShort = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// الحصول على التاريخ الحالي بصيغة YYYY-MM-DD
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0]
}

// الحصول على الوقت الحالي بصيغة HH:MM
export const getCurrentTime = (): string => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

// تنسيق الوقت باللغة العربية
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hourNum = parseInt(hours)
  const isPM = hourNum >= 12
  const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum

  return `${displayHour}:${minutes} ${isPM ? 'مساءً' : 'صباحًا'}`
}

// حساب الفرق بين تاريخين بالأيام
export const getDaysDifference = (date1: string | Date, date2: string | Date = new Date()): number => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// التحقق من أن التاريخ في المستقبل
export const isFutureDate = (date: string | Date): boolean => {
  const d = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d >= today
}

// التحقق من أن التاريخ في الماضي
export const isPastDate = (date: string | Date): boolean => {
  const d = new Date(date)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return d <= today
}

// الحصول على بداية الشهر الحالي
export const getMonthStart = (date: Date = new Date()): string => {
  const d = new Date(date)
  d.setDate(1)
  return d.toISOString().split('T')[0]
}

// الحصول على نهاية الشهر الحالي
export const getMonthEnd = (date: Date = new Date()): string => {
  const d = new Date(date)
  d.setMonth(d.getMonth() + 1)
  d.setDate(0)
  return d.toISOString().split('T')[0]
}

// الحصول على بداية الأسبوع الحالي (الأحد)
export const getWeekStart = (date: Date = new Date()): string => {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() - day)
  return d.toISOString().split('T')[0]
}

// الحصول على نهاية الأسبوع الحالي (السبت)
export const getWeekEnd = (date: Date = new Date()): string => {
  const d = new Date(date)
  const day = d.getDay()
  d.setDate(d.getDate() + (6 - day))
  return d.toISOString().split('T')[0]
}

// تحويل التاريخ إلى كائن Date
export const parseDate = (dateString: string): Date => {
  return new Date(dateString)
}

// تحويل التاريخ إلى نص بصيغة ISO
export const toISOString = (date: Date): string => {
  return date.toISOString()
}

// قائمة أسماء الأشهر بالعربية
export const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
]

// قائمة أسماء الأيام بالعربية
export const ARABIC_DAYS = [
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
]

// الحصول على اسم الشهر بالعربية
export const getArabicMonth = (date: string | Date): string => {
  const d = new Date(date)
  return ARABIC_MONTHS[d.getMonth()]
}

// الحصول على اسم اليوم بالعربية
export const getArabicDay = (date: string | Date): string => {
  const d = new Date(date)
  return ARABIC_DAYS[d.getDay()]
}

// حساب العمر بالسنوات
export const getAge = (birthDate: string | Date): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}