import { useState, useCallback, useEffect, useRef } from 'react';
import { apiAuth } from '../services/apiAuth';
import {
  checkAndRefreshToken,
  getValidAccessToken,
} from '../services/axiosConfig';
import {
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SendOtpRequest,
} from '../services/types/api.types';
import { errorHandler, STORAGE_KEYS, storageService } from '../services';

// Polyfill for AbortController if not available
if (typeof AbortController === 'undefined') {
  (global as any).AbortController = class AbortController {
    abort() {}
    signal = { aborted: false };
  };
}

// ===== CONSTANTS =====

const TOKEN_CHECK_INTERVAL = 5 * 60 * 1000; // 5 phút
const CLEANUP_INTERVAL = 60 * 1000; // 1 phút

// ===== AUTO CLEANUP HOOK =====

/**
 * Hook để tự động cleanup tokens hết hạn
 * Sử dụng ở cấp ứng dụng (App.tsx) để đảm bảo tokens luôn được kiểm tra
 */
export const useTokenCleanup = () => {
  useEffect(() => {
    // Cleanup ngay khi mount
    storageService.cleanupExpiredTokens();

    // Cleanup mỗi phút
    const interval = setInterval(() => {
      storageService.cleanupExpiredTokens();
    }, CLEANUP_INTERVAL);

    // Cleanup khi tab được focus (người dùng quay lại tab)
    const handleFocus = () => {
      storageService.cleanupExpiredTokens();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
};

// ===== MAIN AUTH HOOK =====

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  // Sử dụng ref để tránh re-render không cần thiết
  const loadingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Tự động kiểm tra và refresh token khi component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        // Tự động cleanup tokens hết hạn trước
        storageService.cleanupExpiredTokens();

        const isValid = await checkAndRefreshToken();
        setIsTokenValid(isValid);
      } catch (error) {
        console.error('Token check failed:', error);
        setIsTokenValid(false);
      }
    };

    checkToken();

    // Kiểm tra token mỗi 5 phút
    const interval = setInterval(checkToken, TOKEN_CHECK_INTERVAL);

    // Thêm cleanup interval để kiểm tra tokens hết hạn mỗi phút
    const cleanupInterval = setInterval(() => {
      storageService.cleanupExpiredTokens();
    }, CLEANUP_INTERVAL);

    return () => {
      clearInterval(interval);
      clearInterval(cleanupInterval);
    };
  }, []);

  // Cleanup function để hủy request đang chạy
  const cleanupRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Generic function để xử lý API calls
  const handleApiCall = useCallback(
    async <T>(
      apiFunction: () => Promise<T>,
      preventMultipleCalls: boolean = true
    ): Promise<T> => {
      if (preventMultipleCalls && loadingRef.current) {
        throw new Error('Đang xử lý request, vui lòng đợi');
      }

      // Tạo AbortController mới
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);
      loadingRef.current = true;

      try {
        const response = await apiFunction();
        return response;
      } catch (error) {
        // Kiểm tra nếu request bị hủy
        if (error instanceof Error && error.name === 'AbortError') {
          throw new Error('Request đã bị hủy');
        }

        const apiException = errorHandler.handle(error, false);
        setError(apiException.message);
        throw apiException;
      } finally {
        setLoading(false);
        loadingRef.current = false;
        abortControllerRef.current = null;
      }
    },
    []
  );

  const sendOtp = useCallback(
    async (data: SendOtpRequest) => {
      return handleApiCall(() => apiAuth.sendOtp(data));
    },
    [handleApiCall]
  );

  const resetPassword = useCallback(
    async (data: ResetPasswordRequest) => {
      return handleApiCall(() => apiAuth.resetPassword(data));
    },
    [handleApiCall]
  );

  const changePassword = useCallback(
    async (data: ChangePasswordRequest) => {
      return handleApiCall(() => apiAuth.changePassword(data));
    },
    [handleApiCall]
  );

  const login = useCallback(
    async (data: LoginRequest) => {
      return handleApiCall(async () => {
        const response = await apiAuth.login(data);

        // Lưu thông tin user nếu có trong response
        if (response?.data?.user) {
          storageService.setUserInfo(response.data.user);
        }

        return response;
      });
    },
    [handleApiCall]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      return handleApiCall(async () => {
        const response = await apiAuth.register(data);

        // Lưu thông tin user nếu có trong response
        if (response?.data?.user) {
          storageService.setUserInfo(response.data.user);
        }

        return response;
      });
    },
    [handleApiCall]
  );

  const logout = useCallback(async () => {
    return handleApiCall(async () => {
      const response = await apiAuth.logout();

      // Xóa thông tin user và tokens khi logout
      storageService.clearAuth();

      return response;
    }, false); // Không prevent multiple calls cho logout
  }, [handleApiCall]);

  const refreshToken = useCallback(async () => {
    return handleApiCall(async () => {
      const refreshTokenValue = storageService.getItem(
        STORAGE_KEYS.REFRESH_TOKEN
      );
      if (!refreshTokenValue) {
        throw new Error('Không có refresh token');
      }

      const response = await apiAuth.refreshToken({
        refreshToken: refreshTokenValue,
      });

      // Cập nhật trạng thái token
      setIsTokenValid(true);

      return response;
    });
  }, [handleApiCall]);

  // Function để kiểm tra token có hợp lệ không
  const checkTokenValidity = useCallback(async () => {
    try {
      const isValid = await checkAndRefreshToken();
      setIsTokenValid(isValid);
      return isValid;
    } catch (error) {
      setIsTokenValid(false);
      return false;
    }
  }, []);

  // Function để lấy access token hợp lệ
  const getValidToken = useCallback(async () => {
    try {
      const token = await getValidAccessToken();
      setIsTokenValid(!!token);
      return token;
    } catch (error) {
      setIsTokenValid(false);
      return null;
    }
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cancel current request
  const cancelRequest = useCallback(() => {
    cleanupRequest();
  }, [cleanupRequest]);

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      cleanupRequest();
    };
  }, [cleanupRequest]);

  return {
    sendOtp,
    resetPassword,
    changePassword,
    login,
    register,
    logout,
    refreshToken,
    checkTokenValidity,
    getValidToken,
    loading,
    error,
    isTokenValid,
    clearError,
    cancelRequest,
  };
};
