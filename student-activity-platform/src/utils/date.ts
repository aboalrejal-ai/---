export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTodayDate = (): string => new Date().toISOString().split('T')[0];
