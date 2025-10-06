// فهرسة الأدوات المساعدة

export * from './validation'
export * from './date'
export * from './debounce'

// دوال مساعدة إضافية
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ar-SA').format(num)
}

export const isEmpty = (value: any): boolean => {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  return false
}