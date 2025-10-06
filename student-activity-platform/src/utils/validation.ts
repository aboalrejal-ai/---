export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^05[0-9]{8}$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 999999.99
} as const;

export const validateEmail = (email: string): boolean => VALIDATION_RULES.EMAIL_REGEX.test(email);
export const validatePhone = (phone: string): boolean => VALIDATION_RULES.PHONE_REGEX.test(phone);
export const validatePassword = (password: string): boolean => password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;
