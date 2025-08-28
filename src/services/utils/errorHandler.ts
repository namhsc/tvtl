import { AxiosError } from 'axios';
import { ERROR_CODES, HTTP_STATUS } from '../constants/api.constants';
import { toastService } from '../toastService';

// ===== ERROR HANDLING UTILITIES =====

export class ApiException extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly errors?: Record<string, string[]>;
  public readonly isNetworkError: boolean;
  public readonly isAuthError: boolean;
  public readonly isValidationError: boolean;

  constructor(
    message: string,
    status: number = 500,
    code?: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiException';
    this.status = status;
    this.code = code;
    this.errors = errors;
    this.isNetworkError = status === 0 || status >= 500;
    this.isAuthError = status === 401 || status === 403;
    this.isValidationError = status === 400 || status === 422;
  }

  static fromAxiosError(error: AxiosError): ApiException {
    if (!error.response) {
      // Network error
      return new ApiException(
        'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.',
        0,
        'NETWORK_ERROR'
      );
    }

    const { status, data } = error.response;
    const responseData = data as any;

    let message = 'Có lỗi xảy ra';
    let code: string | undefined;
    let errors: Record<string, string[]> | undefined;

    if (responseData) {
      message = responseData.message || responseData.error || message;
      code = responseData.code || responseData.error_code;
      errors = responseData.errors;
    }

    // Xử lý các trường hợp đặc biệt
    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        message = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        code = ERROR_CODES.TOKEN_EXPIRED;
        break;
      case HTTP_STATUS.FORBIDDEN:
        message = 'Bạn không có quyền truy cập vào tài nguyên này.';
        code = ERROR_CODES.FORBIDDEN;
        break;
      case HTTP_STATUS.NOT_FOUND:
        message = 'Tài nguyên không tồn tại.';
        break;
      case HTTP_STATUS.CONFLICT:
        message = 'Dữ liệu đã tồn tại.';
        break;
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        message = 'Dữ liệu không hợp lệ.';
        code = ERROR_CODES.VALIDATION_ERROR;
        break;
      case HTTP_STATUS.TOO_MANY_REQUESTS:
        message = 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.';
        code = ERROR_CODES.RATE_LIMIT_EXCEEDED;
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        // Xử lý các lỗi database đặc biệt
        if (message.toLowerCase().includes('transaction') ||
            message.toLowerCase().includes('rollback') ||
            message.toLowerCase().includes('database')) {
          message = 'Hệ thống đang gặp sự cố kỹ thuật. Vui lòng thử lại sau vài phút.';
          code = ERROR_CODES.DATABASE_ERROR;
        } else {
          message = 'Lỗi máy chủ. Vui lòng thử lại sau.';
          code = ERROR_CODES.INTERNAL_ERROR;
        }
        break;
    }

    return new ApiException(message, status, code, errors);
  }

  static fromValidationErrors(errors: Record<string, string[]>): ApiException {
    const message = 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
    return new ApiException(
      message,
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      ERROR_CODES.VALIDATION_ERROR,
      errors
    );
  }
}

// ===== ERROR HANDLER FUNCTIONS =====

export const errorHandler = {
  /**
   * Xử lý lỗi chung và hiển thị toast
   */
  handle: (error: unknown, showToast: boolean = true): ApiException => {
    let apiException: ApiException;

    if (error instanceof ApiException) {
      apiException = error;
    } else if (error instanceof AxiosError) {
      apiException = ApiException.fromAxiosError(error);
    } else {
      apiException = new ApiException(
        error instanceof Error ? error.message : 'Có lỗi xảy ra'
      );
    }

    if (showToast) {
      errorHandler.showToast(apiException);
    }

    return apiException;
  },

  /**
   * Hiển thị toast lỗi
   */
  showToast: (error: ApiException): void => {
    if (error.isAuthError) {
      toastService.error(error.message);
    } else if (error.isValidationError) {
      toastService.warning(error.message);
    } else if (error.isNetworkError) {
      toastService.error(error.message);
    } else if (error.code === 'DATABASE_ERROR') {
      // Hiển thị thông báo đặc biệt cho lỗi database
      toastService.databaseError(error.message);
    } else {
      toastService.error(error.message);
    }
  },

  /**
   * Xử lý lỗi xác thực
   */
  handleAuthError: (error: ApiException): void => {
    if (error.isAuthError) {
      // Xóa token và chuyển về trang login
      try {
        // Sử dụng storageService thay vì truy cập trực tiếp localStorage
        const { storageService } = require('./storageService');
        storageService.clearAuth();
      } catch (storageError) {
        console.error('Error clearing auth data:', storageError);
        // Fallback: xóa trực tiếp nếu storageService không hoạt động
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userInfo');
          localStorage.removeItem('tokenCreatedAt');
        } catch (fallbackError) {
          console.error('Fallback clear auth failed:', fallbackError);
        }
      }

      // Chuyển hướng về trang login
      try {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      } catch (navigationError) {
        console.error('Error navigating to login:', navigationError);
        // Fallback: reload page
        window.location.reload();
      }
    }
  },

  /**
   * Xử lý lỗi validation
   */
  handleValidationError: (error: ApiException): Record<string, string[]> => {
    if (error.isValidationError && error.errors) {
      return error.errors;
    }
    return {};
  },

  /**
   * Kiểm tra xem có phải lỗi network không
   */
  isNetworkError: (error: unknown): boolean => {
    if (error instanceof ApiException) {
      return error.isNetworkError;
    }
    if (error instanceof AxiosError) {
      return !error.response;
    }
    return false;
  },

  /**
   * Kiểm tra xem có phải lỗi xác thực không
   */
  isAuthError: (error: unknown): boolean => {
    if (error instanceof ApiException) {
      return error.isAuthError;
    }
    if (error instanceof AxiosError) {
      return error.response?.status === 401 || error.response?.status === 403;
    }
    return false;
  },

  /**
   * Kiểm tra xem có phải lỗi database không
   */
  isDatabaseError: (error: unknown): boolean => {
    if (error instanceof ApiException) {
      return error.code === 'DATABASE_ERROR';
    }
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || '';
      return message.toLowerCase().includes('transaction') ||
             message.toLowerCase().includes('rollback') ||
             message.toLowerCase().includes('database');
    }
    return false;
  },

  /**
   * Kiểm tra xem lỗi có thể retry được không
   */
  isRetryable: (error: unknown): boolean => {
    if (error instanceof ApiException) {
      // Có thể retry với lỗi database và server
      return error.code === 'DATABASE_ERROR' ||
             error.status >= 500 ||
             error.isNetworkError;
    }
    if (error instanceof AxiosError) {
      // Có thể retry với lỗi network và server
      return !error.response || error.response.status >= 500;
    }
    return false;
  },
};

// ===== RETRY UTILITY =====

export const retryHandler = {
  /**
   * Thực hiện retry với delay tăng dần
   */
  async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        if (attempt === maxAttempts) {
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
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  },
};
