import { VALIDATION_RULES, ERROR_MESSAGES } from '../constants'

// التحقق من صحة البريد الإلكتروني
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email.trim()) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD }
  }

  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL }
  }

  return { isValid: true }
}

// التحقق من صحة رقم الهاتف
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone.trim()) {
    return { isValid: true } // رقم الهاتف اختياري
  }

  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_PHONE }
  }

  return { isValid: true }
}

// التحقق من صحة كلمة المرور
export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD }
  }

  if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return { isValid: false, error: ERROR_MESSAGES.WEAK_PASSWORD }
  }

  return { isValid: true }
}

// التحقق من صحة الاسم
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name.trim()) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD }
  }

  if (name.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
    return { isValid: false, error: `الاسم يجب أن يكون أقل من ${VALIDATION_RULES.MAX_NAME_LENGTH} حرف` }
  }

  return { isValid: true }
}

// التحقق من صحة المبلغ المالي
export const validateAmount = (amount: number): { isValid: boolean; error?: string } => {
  if (amount < VALIDATION_RULES.MIN_AMOUNT) {
    return { isValid: false, error: `المبلغ يجب أن يكون أكبر من ${VALIDATION_RULES.MIN_AMOUNT}` }
  }

  if (amount > VALIDATION_RULES.MAX_AMOUNT) {
    return { isValid: false, error: `المبلغ يجب أن يكون أقل من ${VALIDATION_RULES.MAX_AMOUNT}` }
  }

  return { isValid: true }
}

// التحقق من صحة عدد الآيات المحفوظة
export const validateVersesCount = (verses: number): { isValid: boolean; error?: string } => {
  if (verses < VALIDATION_RULES.MIN_VERSUS_COUNT) {
    return { isValid: false, error: `عدد الآيات يجب أن يكون أكبر من ${VALIDATION_RULES.MIN_VERSUS_COUNT}` }
  }

  if (verses > VALIDATION_RULES.MAX_VERSUS_COUNT) {
    return { isValid: false, error: `عدد الآيات يجب أن يكون أقل من ${VALIDATION_RULES.MAX_VERSUS_COUNT}` }
  }

  return { isValid: true }
}

// التحقق من صحة التاريخ
export const validateDate = (date: string): { isValid: boolean; error?: string } => {
  if (!date) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD }
  }

  const dateObj = new Date(date)
  const isValidDate = !isNaN(dateObj.getTime())

  if (!isValidDate) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_DATE }
  }

  return { isValid: true }
}

// التحقق من صحة الوقت
export const validateTime = (time: string): { isValid: boolean; error?: string } => {
  if (!time) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD }
  }

  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  if (!timeRegex.test(time)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_TIME }
  }

  return { isValid: true }
}

// التحقق من صحة النص المطلوب
export const validateRequiredText = (text: string, fieldName: string = 'الحقل'): { isValid: boolean; error?: string } => {
  if (!text.trim()) {
    return { isValid: false, error: `${fieldName} ${ERROR_MESSAGES.REQUIRED_FIELD}` }
  }

  return { isValid: true }
}

// التحقق من صحة طول النص
export const validateTextLength = (
  text: string,
  maxLength: number,
  fieldName: string = 'الحقل'
): { isValid: boolean; error?: string } => {
  if (text.length > maxLength) {
    return { isValid: false, error: `${fieldName} يجب أن يكون أقل من ${maxLength} حرف` }
  }

  return { isValid: true }
}

// التحقق الشامل لبيانات المستخدم
export const validateUser = (userData: {
  name: string
  email: string
  phone?: string
  role: string
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  const nameValidation = validateName(userData.name)
  if (!nameValidation.isValid && nameValidation.error) {
    errors.name = nameValidation.error
  }

  const emailValidation = validateEmail(userData.email)
  if (!emailValidation.isValid && emailValidation.error) {
    errors.email = emailValidation.error
  }

  if (userData.phone) {
    const phoneValidation = validatePhone(userData.phone)
    if (!phoneValidation.isValid && phoneValidation.error) {
      errors.phone = phoneValidation.error
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// التحقق الشامل لبيانات الحضور
export const validateAttendance = (attendanceData: {
  userId: string
  date: string
  time: string
  status: string
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}

  if (!attendanceData.userId) {
    errors.userId = ERROR_MESSAGES.REQUIRED_FIELD
  }

  const dateValidation = validateDate(attendanceData.date)
  if (!dateValidation.isValid && dateValidation.error) {
    errors.date = dateValidation.error
  }

  const timeValidation = validateTime(attendanceData.time)
  if (!timeValidation.isValid && timeValidation.error) {
    errors.time = timeValidation.error
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}