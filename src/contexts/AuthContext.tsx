import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { storageService } from '../services/utils/storageService';
import { apiAuth, authUtils } from '../services/apiAuth';
import { User, AuthTokens } from '../services/types/api.types';

// ===== AUTH STATE TYPES =====

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: AuthTokens | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; tokens: AuthTokens } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_INITIALIZED' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User };

// ===== AUTH CONTEXT =====

interface AuthContextType extends AuthState {
  login: (phone: string, password: string) => Promise<void>;
  register: (phone: string, password: string, otpCode: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateUser: (user: User) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===== AUTH REDUCER =====

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        tokens: action.payload.tokens,
        loading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        loading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        tokens: null,
        loading: false,
        error: null,
      };
    case 'AUTH_INITIALIZED':
      return {
        ...state,
        isInitialized: true,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

// ===== INITIAL STATE =====

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  loading: false,
  error: null,
  isInitialized: false,
};

// ===== AUTH PROVIDER =====

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ===== AUTH FUNCTIONS =====

  const checkAuth = useCallback(async () => {
    try {
      // Kiểm tra tokens trong storage
      const authState = storageService.getAuthState();

      if (authState.isAuthenticated && authState.user) {
        // Có thông tin xác thực, kiểm tra tính hợp lệ
        const accessToken = storageService.getAccessToken();
        const refreshToken = storageService.getRefreshToken();

        if (accessToken && refreshToken) {
          const completed = storageService.getItem('completed');
          const tokens: AuthTokens = {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            completed: completed === 'true',
          };

          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: authState.user, tokens },
          });
        } else {
          // Tokens không hợp lệ, đăng xuất
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      } else {
        // Không có thông tin xác thực
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      dispatch({ type: 'AUTH_LOGOUT' });
    } finally {
      dispatch({ type: 'AUTH_INITIALIZED' });
    }
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await apiAuth.login({ phone, password });

      if (response.success && response.data) {
        const { user, accessToken, refreshToken, tokenType, completed } =
          response.data;

        if (user && accessToken && refreshToken) {
          const tokens: AuthTokens = {
            accessToken,
            refreshToken,
            tokenType: tokenType || 'Bearer',
            completed: completed ?? false,
          };

          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user, tokens },
          });
        } else {
          throw new Error(
            'Response không có thông tin user hoặc tokens hợp lệ'
          );
        }
      } else {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Đăng nhập thất bại';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  }, []);

  const register = useCallback(
    async (phone: string, password: string, otpCode: string) => {
      try {
        dispatch({ type: 'AUTH_START' });

        const response = await apiAuth.register({ phone, password, otpCode });

        if (response.success && response.data) {
          const { user, accessToken, refreshToken, tokenType, completed } =
            response.data;

          if (user && accessToken && refreshToken) {
            const tokens: AuthTokens = {
              accessToken,
              refreshToken,
              tokenType: tokenType || 'Bearer',
              completed: completed ?? false,
            };

            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user, tokens },
            });
          } else {
            throw new Error(
              'Response không có thông tin user hoặc tokens hợp lệ'
            );
          }
        } else {
          throw new Error(response.message || 'Đăng ký thất bại');
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Đăng ký thất bại';
        dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      dispatch({ type: 'AUTH_START' });

      // Gọi API logout
      await apiAuth.logout();
    } catch (error) {
      console.error('Logout API error:', error);
      // Vẫn đăng xuất ngay cả khi API thất bại
    } finally {
      // Xóa thông tin local
      storageService.clearAuth();
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refreshTokenValue = storageService.getRefreshToken();

      if (!refreshTokenValue) {
        throw new Error('Không có refresh token');
      }

      const response = await apiAuth.refreshToken({
        refreshToken: refreshTokenValue,
      });

      if (response.success && response.data) {
        const {
          accessToken,
          refreshToken: newRefreshToken,
          tokenType,
          completed,
        } = response.data;

        if (accessToken && newRefreshToken) {
          const tokens: AuthTokens = {
            accessToken,
            refreshToken: newRefreshToken,
            tokenType: tokenType || 'Bearer',
            completed: completed ?? false,
          };

          // Cập nhật tokens mới
          if (state.user) {
            dispatch({
              type: 'AUTH_SUCCESS',
              payload: { user: state.user, tokens },
            });
          }
        }
      }
    } catch (error) {
      console.error('Refresh token failed:', error);
      // Refresh token thất bại, đăng xuất
      dispatch({ type: 'AUTH_LOGOUT' });
      throw error;
    }
  }, [state.user]);

  const updateUser = useCallback((user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
    storageService.setUserInfo(user);
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // ===== EFFECTS =====

  // Kiểm tra auth khi component mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Tự động cleanup tokens hết hạn
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      storageService.cleanupExpiredTokens();
    }, 60 * 1000); // Mỗi phút

    return () => clearInterval(cleanupInterval);
  }, []);

  // ===== CONTEXT VALUE =====

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshToken,
    updateUser,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// ===== AUTH HOOK =====

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

// ===== AUTH UTILITIES =====

export const useAuthUtils = () => {
  return {
    isAdmin: authUtils.isAdmin,
    isExpert: authUtils.isExpert,
    hasRole: authUtils.hasRole,
    isProfileCompleted: authUtils.isProfileCompleted,
  };
};
