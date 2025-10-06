import { VALIDATION_RULES } from '../constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
};

export const validateName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= VALIDATION_RULES.MAX_NAME_LENGTH;
};

export const validateAmount = (amount: number): boolean => {
  return amount >= VALIDATION_RULES.MIN_AMOUNT && amount <= VALIDATION_RULES.MAX_AMOUNT;
};

export const validateVerses = (verses: number, totalVerses: number): boolean => {
  return verses >= VALIDATION_RULES.MIN_VERSES && verses <= totalVerses;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const getValidationError = (field: string, value: any, extra?: any): string | null => {
  switch (field) {
    case 'email':
      if (!validateRequired(value)) return 'البريد الإلكتروني مطلوب';
      if (!validateEmail(value)) return 'صيغة البريد الإلكتروني غير صحيحة';
      break;
    
    case 'phone':
      if (!validateRequired(value)) return 'رقم الهاتف مطلوب';
      if (!validatePhone(value)) return 'رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام';
      break;
    
    case 'password':
      if (!validateRequired(value)) return 'كلمة المرور مطلوبة';
      if (!validatePassword(value)) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      break;
    
    case 'name':
      if (!validateRequired(value)) return 'الاسم مطلوب';
      if (!validateName(value)) return 'الاسم غير صحيح';
      break;
    
    case 'amount':
      if (value === null || value === undefined) return 'المبلغ مطلوب';
      if (!validateAmount(value)) return 'المبلغ غير صحيح';
      break;
    
    case 'verses':
      if (value === null || value === undefined) return 'عدد الآيات مطلوب';
      if (!validateVerses(value, extra)) return 'عدد الآيات غير صحيح';
      break;
    
    default:
      if (!validateRequired(value)) return 'هذا الحقل مطلوب';
  }
  
  return null;
};