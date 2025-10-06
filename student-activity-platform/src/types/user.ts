export type Role = 'طالب' | 'مشرف' | 'رئيس مجموعة' | 'معلم' | 'مطور النظام';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image_url?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}
