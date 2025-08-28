import api from './axiosConfig';
import { API_ENDPOINTS } from './constants/api.constants';
import { errorHandler } from './utils/errorHandler';
import { storageService } from './utils/storageService';
import { createRequestWithRetry } from './axiosConfig';
import {
  ApiResponse,
  LoginResponse,
  SendOtpRequest,
  SendOtpResponse,
  LoginRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest,
  RefreshTokenRequest,
  User,
  RegisterRequest,
  ResetPasswordRequest,
  AuthTokens,
} from './types/api.types';

// ===== TOKEN PROCESSING UTILITIES =====

const processAuthResponse = (response: ApiResponse<LoginResponse>): void => {
  if (!response.success || !response.data) {
    throw new Error('Response không hợp lệ');
  }

  const { accessToken, refreshToken, tokenType, completed, user } =
    response.data;

  if (!accessToken || !refreshToken) {
    throw new Error('Response không có tokens hợp lệ');
  }

  const tokens: AuthTokens = {
    accessToken,
    refreshToken,
    tokenType: tokenType || 'Bearer',
    completed: completed ?? false,
  };

  storageService.setTokens(tokens);

  if (user) {
    storageService.setUserInfo(user);
  }
};

// ===== AUTH API SERVICE =====

export const apiAuth = {
  // ===== OTP MANAGEMENT =====

  /**
   * Gửi OTP
   */
  sendOtp: async (
    data: SendOtpRequest
  ): Promise<ApiResponse<SendOtpResponse>> => {
    try {
      const response = await createRequestWithRetry(() =>
        api.post<ApiResponse<SendOtpResponse>>(
          API_ENDPOINTS.AUTH.SEND_OTP,
          data
        )
      );
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },

  // ===== REGISTRATION =====

  /**
   * Đăng ký tài khoản
   */
  register: async (
    data: RegisterRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await createRequestWithRetry(() =>
        api.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.REGISTER, data)
      );

      processAuthResponse(response.data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },

  // ===== LOGIN/LOGOUT =====

  /**
   * Đăng nhập
   */
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await createRequestWithRetry(() =>
        api.post<ApiResponse<LoginResponse>>(API_ENDPOINTS.AUTH.LOGIN, data)
      );

      processAuthResponse(response.data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },

  /**
   * Đăng xuất
   */
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.post<ApiResponse<{ message: string }>>(
        API_ENDPOINTS.AUTH.LOGOUT
      );
      return response.data;
    } catch (error) {
      // Vẫn xóa thông tin xác thực ngay cả khi API thất bại
      throw errorHandler.handle(error, false);
    } finally {
      storageService.clearAuth();
    }
  },

  // ===== PASSWORD MANAGEMENT =====

  /**
   * Quên mật khẩu
   */
  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ApiResponse<{ message: string; success: boolean }>> => {
    try {
      const response = await createRequestWithRetry(() =>
        api.post<ApiResponse<{ message: string; success: boolean }>>(
          API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
          data
        )
      );
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },

  /**
   * Đặt lại mật khẩu
   */
  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ApiResponse<{ message: string; success: boolean }>> => {
    try {
      const response = await createRequestWithRetry(() =>
        api.post<ApiResponse<{ message: string; success: boolean }>>(
          API_ENDPOINTS.AUTH.RESET_PASSWORD,
          data
        )
      );
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },

  /**
   * Thay đổi mật khẩu
   */
  changePassword: async (
    data: ChangePasswordRequest
  ): Promise<ApiResponse<{ message: string; success: boolean }>> => {
    try {
      const response = await api.post<
        ApiResponse<{ message: string; success: boolean }>
      >(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },

  // ===== TOKEN MANAGEMENT =====

  /**
   * Refresh token
   */
  refreshToken: async (
    data: RefreshTokenRequest
  ): Promise<ApiResponse<AuthTokens>> => {
    try {
      const response = await api.post<ApiResponse<AuthTokens>>(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        data,
        { skipAuth: true }
      );

      if (response.data.success && response.data.data) {
        const { accessToken, refreshToken, tokenType, completed } =
          response.data.data;

        if (accessToken && refreshToken) {
          const tokens = {
            accessToken,
            refreshToken,
            tokenType: tokenType || 'Bearer',
            completed: completed ?? false,
          };

          storageService.setTokens(tokens);
        } else {
          throw new Error('Response không có tokens hợp lệ');
        }
      }

      return response.data;
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  },
};

// ===== AUTH UTILITY FUNCTIONS =====

export const authUtils = {
  /**
   * Kiểm tra xem user đã đăng nhập chưa
   */
  isAuthenticated: (): boolean => {
    return storageService.isAuthenticated();
  },

  /**
   * Lấy thông tin user hiện tại
   */
  getCurrentUser: (): User | null => {
    return storageService.getUserInfo();
  },

  /**
   * Lấy trạng thái xác thực
   */
  getAuthState: () => {
    return storageService.getAuthState();
  },

  /**
   * Xóa thông tin xác thực
   */
  clearAuth: (): void => {
    storageService.clearAuth();
  },

  /**
   * Kiểm tra quyền truy cập
   */
  hasRole: (requiredRoles: string[]): boolean => {
    const user = storageService.getUserInfo();
    if (!user?.roles) return false;

    return requiredRoles.some(role => user.roles.includes(role));
  },

  /**
   * Kiểm tra có phải admin không
   */
  isAdmin: (): boolean => {
    return authUtils.hasRole(['ADMIN']);
  },

  /**
   * Kiểm tra có phải expert không
   */
  isExpert: (): boolean => {
    return authUtils.hasRole(['EXPERT', 'ADMIN']);
  },

  /**
   * Kiểm tra user đã hoàn thành profile chưa
   */
  isProfileCompleted: (): boolean => {
    const completed = storageService.getItem('completed');
    return authUtils.isAuthenticated() && completed === 'true';
  },
};

// Export axios instance để sử dụng ở nơi khác nếu cần
export { api };
