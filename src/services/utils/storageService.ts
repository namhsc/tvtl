import { STORAGE_KEYS } from '../constants/api.constants';
import { AuthTokens, User } from '../types/api.types';

// ===== STORAGE SERVICE =====

export class StorageService {
  private static instance: StorageService;
  private storage: globalThis.Storage;
  private cache: Map<string, any> = new Map();
  private cacheTimeout: Map<string, number> = new Map();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 phút

  private constructor() {
    this.storage = window.localStorage;
    this.initializeCache();
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // ===== CACHE MANAGEMENT =====

  private initializeCache(): void {
    // Cache các giá trị thường xuyên sử dụng
    this.cache.set('isAuthenticated', this.checkIsAuthenticated());
    this.cache.set('userInfo', this.getUserInfoFromStorage());
    this.cache.set('tokens', this.getTokensFromStorage());
  }

  private getCachedValue<T>(key: string): T | null {
    const cached = this.cache.get(key);
    const timeout = this.cacheTimeout.get(key);

    if (cached && timeout && Date.now() < timeout) {
      return cached;
    }

    // Xóa cache hết hạn
    this.cache.delete(key);
    this.cacheTimeout.delete(key);
    return null;
  }

  private setCachedValue<T>(
    key: string,
    value: T,
    ttl: number = this.CACHE_TTL
  ): void {
    this.cache.set(key, value);
    this.cacheTimeout.set(key, Date.now() + ttl);
  }

  private invalidateCache(keys: string[]): void {
    keys.forEach(key => {
      this.cache.delete(key);
      this.cacheTimeout.delete(key);
    });
  }

  // ===== TOKEN MANAGEMENT =====

  /**
   * Lưu tokens
   */
  setTokens(tokens: AuthTokens): void {
    // Kiểm tra an toàn trước khi lưu
    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      console.error('Invalid tokens provided to setTokens:', tokens);
      throw new Error('Tokens không hợp lệ');
    }

    this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    this.storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    this.storage.setItem(STORAGE_KEYS.COMPLETED, tokens.completed.toString());
    // Lưu thời gian tạo token để tracking
    this.storage.setItem(STORAGE_KEYS.TOKEN_CREATED_AT, Date.now().toString());

    // Invalidate cache
    this.invalidateCache(['isAuthenticated', 'tokens']);

    // Update cache
    this.setCachedValue('tokens', tokens);
  }

  /**
   * Lấy access token
   */
  getAccessToken(): string | null {
    const token = this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    // Kiểm tra token có hết hạn không
    if (token && this.isTokenExpired(token)) {
      console.warn('Access token đã hết hạn, tự động xóa');
      this.clearTokens();
      return null;
    }

    return token;
  }

  /**
   * Lấy refresh token
   */
  getRefreshToken(): string | null {
    const token = this.storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    // Kiểm tra refresh token có hết hạn không
    if (token && this.isTokenExpired(token)) {
      console.warn('Refresh token đã hết hạn, tự động xóa');
      this.clearTokens();
      return null;
    }

    return token;
  }

  /**
   * Lấy tokens từ storage
   */
  private getTokensFromStorage(): AuthTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const completed = this.storage.getItem(STORAGE_KEYS.COMPLETED);

    if (!accessToken || !refreshToken) return null;

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      completed: completed === 'true',
    };
  }

  /**
   * Xóa tokens
   */
  clearTokens(): void {
    this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    this.storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    this.storage.removeItem(STORAGE_KEYS.TOKEN_CREATED_AT);
    this.storage.removeItem(STORAGE_KEYS.COMPLETED);

    // Invalidate cache
    this.invalidateCache(['isAuthenticated', 'tokens']);
  }

  /**
   * Kiểm tra token có hết hạn không
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();

      // Thêm buffer 30 giây để tránh edge case
      return now >= exp - 30000;
    } catch (error) {
      console.error('Error parsing token:', error);
      // Nếu không parse được token, coi như đã hết hạn
      return true;
    }
  }

  /**
   * Kiểm tra token có sắp hết hạn không (trong vòng 5 phút)
   */
  isTokenExpiringSoon(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      return exp - now < fiveMinutes;
    } catch (error) {
      console.error('Error parsing token:', error);
      return false;
    }
  }

  /**
   * Lấy thời gian còn lại của token (tính bằng giây)
   */
  getTokenTimeRemaining(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();

      return Math.max(0, Math.floor((exp - now) / 1000));
    } catch (error) {
      console.error('Error parsing token:', error);
      return 0;
    }
  }

  /**
   * Tự động cleanup tokens hết hạn
   */
  cleanupExpiredTokens(): void {
    const accessToken = this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = this.storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    let hasExpired = false;

    if (accessToken && this.isTokenExpired(accessToken)) {
      console.warn('Access token đã hết hạn, tự động xóa');
      hasExpired = true;
    }

    if (refreshToken && this.isTokenExpired(refreshToken)) {
      console.warn('Refresh token đã hết hạn, tự động xóa');
      hasExpired = true;
    }

    if (hasExpired) {
      this.clearTokens();
      this.clearUserInfo();
    }
  }

  /**
   * Kiểm tra và xử lý token expiration một cách nhất quán
   * Trả về true nếu tokens còn hợp lệ, false nếu đã hết hạn
   */
  validateAndCleanupTokens(): boolean {
    this.cleanupExpiredTokens();

    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    // Nếu không có tokens hoặc tokens đã hết hạn
    if (!accessToken || !refreshToken) {
      return false;
    }

    // Kiểm tra xem tokens có sắp hết hạn không
    if (this.isTokenExpiringSoon(accessToken)) {
      console.warn('Access token sắp hết hạn, cần refresh');
      // Không xóa tokens ở đây, để axios interceptor xử lý refresh
    }

    return true;
  }

  // ===== USER INFO MANAGEMENT =====

  /**
   * Lưu thông tin user
   */
  setUserInfo(userInfo: User): void {
    this.storage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));

    // Update cache
    this.setCachedValue('userInfo', userInfo);
  }

  /**
   * Lấy thông tin user từ storage
   */
  private getUserInfoFromStorage(): User | null {
    const userStr = this.storage.getItem(STORAGE_KEYS.USER_INFO);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Lấy thông tin user
   */
  getUserInfo(): User | null {
    // Kiểm tra cache trước
    const cached = this.getCachedValue<User>('userInfo');
    if (cached) return cached;

    // Nếu không có cache, lấy từ storage và cache lại
    const user = this.getUserInfoFromStorage();
    if (user) {
      this.setCachedValue('userInfo', user);
    }
    return user;
  }

  /**
   * Xóa thông tin user
   */
  clearUserInfo(): void {
    this.storage.removeItem(STORAGE_KEYS.USER_INFO);

    // Invalidate cache
    this.invalidateCache(['userInfo']);
  }

  // ===== AUTH STATE MANAGEMENT =====

  /**
   * Kiểm tra user đã đăng nhập chưa (sử dụng cache)
   */
  private checkIsAuthenticated(): boolean {
    // Tự động cleanup tokens hết hạn trước khi kiểm tra
    this.cleanupExpiredTokens();

    const hasToken = !!this.getAccessToken();
    return hasToken;
  }

  /**
   * Kiểm tra user đã đăng nhập chưa
   */
  isAuthenticated(): boolean {
    // Kiểm tra cache trước
    const cached = this.getCachedValue<boolean>('isAuthenticated');
    if (cached !== null) return cached;

    // Nếu không có cache, kiểm tra và cache lại
    const result = this.checkIsAuthenticated();
    this.setCachedValue('isAuthenticated', result, 30 * 1000); // Cache 30 giây
    return result;
  }

  /**
   * Lấy trạng thái xác thực
   */
  getAuthState(): {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    tokenTimeRemaining?: number;
  } {
    // Tự động cleanup tokens hết hạn
    this.cleanupExpiredTokens();

    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    return {
      isAuthenticated: !!accessToken,
      user: this.getUserInfo(),
      accessToken,
      refreshToken,
      tokenTimeRemaining: accessToken
        ? this.getTokenTimeRemaining(accessToken)
        : undefined,
    };
  }

  /**
   * Xóa toàn bộ dữ liệu xác thực
   */
  clearAuth(): void {
    this.clearTokens();
    this.clearUserInfo();

    // Clear toàn bộ cache
    this.cache.clear();
    this.cacheTimeout.clear();

    // Reinitialize cache
    this.initializeCache();
  }

  // ===== UTILITY METHODS =====

  /**
   * Lưu dữ liệu tùy ý
   */
  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  /**
   * Lấy dữ liệu tùy ý
   */
  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  /**
   * Xóa dữ liệu tùy ý
   */
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  /**
   * Kiểm tra storage có hỗ trợ không
   */
  isSupported(): boolean {
    try {
      const test = '__storage_test__';
      this.storage.setItem(test, test);
      this.storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clear toàn bộ cache (để debug)
   */
  clearCache(): void {
    this.cache.clear();
    this.cacheTimeout.clear();
  }
}

// Export instance mặc định
export const storageService = StorageService.getInstance();

// ===== HOOKS FOR REACT =====

export const useStorage = () => {
  return {
    // Token methods
    setTokens: storageService.setTokens.bind(storageService),
    getAccessToken: storageService.getAccessToken.bind(storageService),
    getRefreshToken: storageService.getRefreshToken.bind(storageService),
    clearTokens: storageService.clearTokens.bind(storageService),
    isTokenExpired: storageService.isTokenExpired.bind(storageService),
    isTokenExpiringSoon:
      storageService.isTokenExpiringSoon.bind(storageService),
    getTokenTimeRemaining:
      storageService.getTokenTimeRemaining.bind(storageService),
    cleanupExpiredTokens:
      storageService.cleanupExpiredTokens.bind(storageService),
    validateAndCleanupTokens:
      storageService.validateAndCleanupTokens.bind(storageService),

    // User methods
    setUserInfo: storageService.setUserInfo.bind(storageService),
    getUserInfo: storageService.getUserInfo.bind(storageService),
    clearUserInfo: storageService.clearUserInfo.bind(storageService),

    // Auth state methods
    isAuthenticated: storageService.isAuthenticated.bind(storageService),
    getAuthState: storageService.getAuthState.bind(storageService),
    clearAuth: storageService.clearAuth.bind(storageService),

    // Utility methods
    setItem: storageService.setItem.bind(storageService),
    getItem: storageService.getItem.bind(storageService),
    removeItem: storageService.removeItem.bind(storageService),

    // Cache methods
    clearCache: storageService.clearCache.bind(storageService),
  };
};
