// Utility functions cho việc format dữ liệu

/**
 * Format số tiền theo định dạng Việt Nam
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Format số tiền đơn giản (chỉ số + đ)
 */
export const formatSimpleCurrency = (amount: number): string => {
  return `${amount.toLocaleString('vi-VN')}đ`;
};

/**
 * Format kích thước file
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format số điện thoại Việt Nam
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate số điện thoại Việt Nam
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^0\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Format ngày tháng theo định dạng DD/MM/YYYY
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format thời gian
 */
export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format tên người dùng (lấy chữ cái đầu)
 */
export const formatUserName = (name: string): string => {
  if (!name) return '';
  return name.charAt(0).toUpperCase();
};

/**
 * Truncate text với ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
