import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestHeaders,
} from 'axios';
import { API_CONFIG, HTTP_STATUS } from './constants/api.constants';
import { storageService } from './utils/storageService';
import { errorHandler } from './utils/errorHandler';
import { AuthTokens } from './types/api.types';

// ===== AXIOS TYPE EXTENSIONS =====

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
    skipAuth?: boolean;
    skipErrorHandler?: boolean;
    _timestamp?: number; // Thêm timestamp để track request
  }
}

// ===== AXIOS INSTANCES =====

/**
 * Axios instance chính cho API calls
 */
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
  // Thêm các options để tối ưu performance
  maxRedirects: 5,
  maxContentLength: 50 * 1024 * 1024, // 50MB
  validateStatus: status => status < 500, // Chỉ coi status < 500 là success
});

/**
 * Axios instance riêng cho refresh token để tránh vòng lặp
 */
const refreshClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
  maxRedirects: 0, // Không redirect cho refresh token
});

// ===== REFRESH TOKEN QUEUE =====

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
  timestamp: number;
}> = [];

// Debounce function để tránh gọi refresh token quá nhiều lần
let refreshDebounceTimer: NodeJS.Timeout | null = null;

function enqueue(
  resolve: (token: string) => void,
  reject: (error: unknown) => void
) {
  const timestamp = Date.now();
  pendingQueue.push({ resolve, reject, timestamp });

  // Cleanup old requests (older than 30 seconds)
  const thirtySecondsAgo = Date.now() - 30000;
  pendingQueue = pendingQueue.filter(item => item.timestamp > thirtySecondsAgo);
}

function flushQueue(error: unknown | null, token?: string) {
  if (error) {
    pendingQueue.forEach(({ reject }) => reject(error));
  } else if (token) {
    pendingQueue.forEach(({ resolve }) => resolve(token));
  }
  pendingQueue = [];
}

// Thêm function để kiểm tra token có sắp hết hạn không
function isTokenExpiringSoon(): boolean {
  const accessToken = storageService.getAccessToken();
  if (!accessToken) return false;

  try {
    // Decode JWT token để kiểm tra expiration
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeUntilExpiry = exp - now;

    // Nếu token còn ít hơn 5 phút thì coi như sắp hết hạn
    return timeUntilExpiry < 5 * 60 * 1000;
  } catch (error) {
    // Nếu không decode được token, coi như không sắp hết hạn
    return false;
  }
}

// ===== REQUEST INTERCEPTOR =====

api.interceptors.request.use(
  async config => {
    // Thêm timestamp để track request
    config._timestamp = Date.now();

    // Thêm access token nếu không skip auth
    if (!config.skipAuth) {
      const accessToken = storageService.getAccessToken();

      // Kiểm tra nếu token sắp hết hạn và chưa đang refresh
      if (accessToken && isTokenExpiringSoon() && !isRefreshing) {
        try {
          // Debounce refresh token để tránh gọi quá nhiều lần
          if (refreshDebounceTimer) {
            clearTimeout(refreshDebounceTimer);
          }

          refreshDebounceTimer = setTimeout(async () => {
            try {
              const refreshToken = storageService.getRefreshToken();
              if (refreshToken) {
                const { apiAuth } = await import('./apiAuth');
                const refreshResponse = await apiAuth.refreshToken({
                  refreshToken: refreshToken,
                });

                if (refreshResponse.data?.accessToken) {
                  // Update token trong storage
                  const tokens: AuthTokens = {
                    accessToken: refreshResponse.data.accessToken,
                    refreshToken: refreshResponse.data.refreshToken,
                    tokenType: refreshResponse.data.tokenType || 'Bearer',
                    completed: refreshResponse.data.completed ?? false,
                  };
                  storageService.setTokens(tokens);
                }
              }
            } catch (error) {
              console.warn('Auto refresh token failed:', error);
            }
          }, 1000); // Delay 1 giây để tránh gọi quá nhiều lần
        } catch (error) {
          console.warn('Auto refresh token failed:', error);
          // Nếu refresh thất bại, vẫn sử dụng token cũ
        }
      }

      if (accessToken) {
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
        (config.headers as AxiosRequestHeaders)['Authorization'] =
          `Bearer ${accessToken}`;
      }
    }

    // Log request để debug (chỉ trong development)
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        {
          timestamp: config._timestamp,
          hasAuth: !config.skipAuth,
        }
      );
    }

    return config;
  },
  error => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// ===== RESPONSE INTERCEPTOR =====

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response để debug (chỉ trong development)
    if (process.env.NODE_ENV === 'development') {
      const requestTime = response.config._timestamp;
      const responseTime = Date.now();
      const duration = requestTime ? responseTime - requestTime : 0;

      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          duration: `${duration}ms`,
        }
      );
    }

    // Trả về response đầy đủ để có thể truy cập status, headers
    return response;
  },
  async (error: AxiosError) => {
    // Không phải lỗi Axios hoặc không có config
    if (!error.config) {
      console.error('[API Response Error] No config', error);
      return Promise.reject(error);
    }

    const { response, config } = error;
    const requestTime = config._timestamp;
    const errorTime = Date.now();
    const duration = requestTime ? errorTime - requestTime : 0;

    // Log error để debug (chỉ trong development)
    if (process.env.NODE_ENV === 'development') {
      console.error(
        `[API Error] ${config.method?.toUpperCase()} ${config.url}`,
        {
          status: response?.status,
          duration: `${duration}ms`,
          error: error.message,
        }
      );
    }

    // Lỗi network/timeout/hủy request
    if (!response) {
      return Promise.reject(error);
    }

    // Xử lý lỗi 401 - Unauthorized
    if (
      response.status === HTTP_STATUS.UNAUTHORIZED &&
      !config._retry &&
      !config.skipAuth
    ) {
      // Tự động cleanup tokens hết hạn trước
      storageService.cleanupExpiredTokens();

      const refreshToken = storageService.getRefreshToken();

      if (!refreshToken) {
        // Không có refresh token, đăng xuất và xóa toàn bộ dữ liệu
        console.warn('Không có refresh token, đăng xuất người dùng');
        storageService.clearAuth();

        // Chuyển hướng về trang login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      // Nếu đang refresh, thêm vào queue
      if (isRefreshing && refreshPromise) {
        return new Promise<string>((resolve, reject) => {
          enqueue(resolve, reject);
        }).then(newToken => {
          // Gắn token mới và gửi lại request
          if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
          }
          (config.headers as AxiosRequestHeaders)['Authorization'] =
            `Bearer ${newToken}`;
          return api(config);
        });
      }

      // Bắt đầu refresh token
      config._retry = true;
      isRefreshing = true;

      // Tạo promise mới cho refresh token
      refreshPromise = new Promise<string>(async (resolve, reject) => {
        try {
          // Sử dụng apiAuth.refreshToken thay vì gọi trực tiếp
          const { apiAuth } = await import('./apiAuth');
          const refreshResponse = await apiAuth.refreshToken({
            refreshToken: refreshToken,
          });

          if (!refreshResponse.data?.accessToken) {
            throw new Error('Missing accessToken in refresh response');
          }

          // Tokens đã được lưu trong apiAuth.refreshToken
          const newTokens = refreshResponse.data;

          // Xử lý queue
          flushQueue(null, newTokens.accessToken);

          resolve(newTokens.accessToken);
        } catch (refreshError) {
          // Refresh token thất bại
          console.error('Refresh token thất bại:', refreshError);

          // Xóa toàn bộ dữ liệu xác thực
          storageService.clearAuth();

          flushQueue(refreshError);
          reject(refreshError);
        }
      });

      // Sử dụng promise đã tạo
      try {
        const newToken = await refreshPromise;

        // Gắn token mới và gửi lại request cũ
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
        (config.headers as AxiosRequestHeaders)['Authorization'] =
          `Bearer ${newToken}`;

        return api(config);
      } catch (refreshError) {
        // Refresh token thất bại
        console.error(
          'Refresh token thất bại, đăng xuất người dùng:',
          refreshError
        );

        // Xóa toàn bộ dữ liệu xác thực
        storageService.clearAuth();

        // Chuyển hướng về trang login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    // Xử lý các lỗi khác
    if (!config.skipErrorHandler) {
      errorHandler.handle(error, true);
    }

    return Promise.reject(error);
  }
);

// ===== UTILITY FUNCTIONS =====

/**
 * Tạo request với retry
 */
export const createRequestWithRetry = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      // Chỉ retry với lỗi network hoặc server
      if (
        !errorHandler.isNetworkError(error) &&
        !errorHandler.isAuthError(error)
      ) {
        break;
      }

      // Delay tăng dần
      const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

/**
 * Tạo request với timeout tùy chỉnh
 */
export const createRequestWithTimeout = async <T>(
  requestFn: () => Promise<T>,
  timeout: number = API_CONFIG.TIMEOUT
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });

  return Promise.race([requestFn(), timeoutPromise]);
};

/**
 * Debounce function để tránh gọi API quá nhiều lần
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function để giới hạn tần suất gọi API
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Kiểm tra và refresh token nếu cần thiết
 */
export const checkAndRefreshToken = async (): Promise<boolean> => {
  try {
    const accessToken = storageService.getAccessToken();
    const refreshToken = storageService.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }

    // Nếu token sắp hết hạn, refresh ngay
    if (isTokenExpiringSoon()) {
      const { apiAuth } = await import('./apiAuth');
      await apiAuth.refreshToken({ refreshToken });
      return true;
    }

    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    storageService.clearAuth();
    return false;
  }
};

/**
 * Lấy access token hiện tại, tự động refresh nếu cần
 */
export const getValidAccessToken = async (): Promise<string | null> => {
  try {
    const accessToken = storageService.getAccessToken();
    if (!accessToken) return null;

    // Nếu token sắp hết hạn, refresh trước
    if (isTokenExpiringSoon()) {
      const refreshToken = storageService.getRefreshToken();
      if (refreshToken) {
        const { apiAuth } = await import('./apiAuth');
        const refreshResponse = await apiAuth.refreshToken({ refreshToken });
        return refreshResponse.data?.accessToken || null;
      }
    }

    return accessToken;
  } catch (error) {
    console.error('Failed to get valid access token:', error);
    return null;
  }
};

// ===== CLEANUP =====

// Cleanup khi tab được đóng hoặc refresh
window.addEventListener('beforeunload', () => {
  if (refreshDebounceTimer) {
    clearTimeout(refreshDebounceTimer);
  }
});

// ===== EXPORTS =====

export default api;
export { refreshClient };
