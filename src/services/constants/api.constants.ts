// ===== API ENDPOINTS =====

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    SEND_OTP: '/api/auth/send-otp',
    REGISTER: '/api/auth/verify-otp-and-register',
    LOGIN: '/api/auth/login',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    CHANGE_PASSWORD: '/api/auth/change-password',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh-token',
  },

  // User endpoints
  USER: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    CREATE: '/api/admin/users',
    UPDATE: (userId: string) => `/api/admin/users/${userId}`,
    DELETE: (userId: string) => `/api/admin/users/${userId}`,
    DETAIL: (userId: string) => `/api/admin/users/${userId}`,
    LIST: (
      page: number = 1,
      size: number = 10,
      keyword: string = '',
      status?: string,
      role?: string
    ) => {
      const params: string[] = [];
      params.push(`page=${page}`);
      params.push(`size=${size}`);
      params.push('sort=createdAt,desc');

      if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
      if (status && status !== 'all') params.push(`status=${status}`);
      if (role && role !== 'all') params.push(`role=${role}`);

      return `/api/admin/users?${params.join('&')}`;
    },
  },

  // Expert endpoints
  EXPERT: {
    LIST: '/api/experts',
    DETAIL: (id: string) => `/api/experts/${id}`,
    REGISTER: '/api/experts/register',
    UPDATE: (id: string) => `/api/experts/${id}`,
  },

  // Booking endpoints
  BOOKING: {
    CREATE: '/api/bookings',
    LIST: '/api/bookings',
    DETAIL: (id: string) => `/api/bookings/${id}`,
    UPDATE: (id: string) => `/api/bookings/${id}`,
    CANCEL: (id: string) => `/api/bookings/${id}/cancel`,
  },

  // Survey endpoints
  SURVEY: {
    LIST: '/api/surveys',
    DETAIL: (id: string) => `/api/surveys/${id}`,
    SUBMIT: (id: string) => `/api/surveys/${id}/submit`,
  },

  // Location endpoints
  LOCATION: {
    LIST_PROVINCE: (query: string = '') => `/api/location/provinces?q=${query}`,
    LIST_WARD: (provinceId: string, query: string = '') =>
      `/api/location/wards?provinceId=${provinceId}&q=${query}`,
  },
} as const;

// ===== API CONFIGURATION =====

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://123.30.149.66:8280',
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// ===== HTTP STATUS CODES =====

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// ===== ERROR CODES =====

export const ERROR_CODES = {
  // Auth errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  OTP_EXPIRED: 'OTP_EXPIRED',
  OTP_INVALID: 'OTP_INVALID',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',

  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  DATABASE_ERROR: 'DATABASE_ERROR',

  FORBIDDEN: 'FORBIDDEN',
} as const;

// ===== STORAGE KEYS =====

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  COMPLETED: 'completed',
  USER_INFO: 'userInfo',
  TOKEN_CREATED_AT: 'tokenCreatedAt',
} as const;
