// ===== COMMON API TYPES =====

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errorCode?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  errorCode?: string;
}

// ===== AUTH TYPES =====

export interface User {
  id: string;
  phone: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE';
  ic?: string;
  point?: number;
  referralCode?: string;
  bank_name?: string;
  bank_account?: string;
  roles: string[];
  school?: string;
  grade?: string;
  ward?: string;
  province?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expert?: {
    id?: string;
    description?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECT';
    certificates?: string[];
    educations?: string[];
    expertises?: string[];
    experiences?: string[];
    commissionRate?: number;
    currentPrice?: number;
    originalPrice?: number;
    position?: string;
    workplace?: string;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  completed: boolean;
}

export interface AuthUser {
  user: User;
  tokens: AuthTokens;
}

// Type mới cho response đăng nhập thực tế từ API
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  completed: boolean;
  user?: User;
}

export interface SendOtpRequest {
  phone: string;
  method: 'SMS' | 'ZALO';
}

export interface SendOtpResponse {
  success: boolean;
  message?: string;
  errorCode?: string;
  data?: any;
}

export interface RegisterRequest {
  phone: string;
  password: string;
  otpCode: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface ForgotPasswordRequest {
  phone: string;
  method: 'SMS' | 'ZALO';
}

export interface ResetPasswordRequest {
  phone: string;
  otCode: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface PaginatedContentResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
}

// Location
export interface Location {
  id: string;
  name: string;
  parentId?: string;
}
