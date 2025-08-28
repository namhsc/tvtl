import { useState, useCallback, useRef } from 'react';
import { debounce, throttle } from '../services/axiosConfig';

interface UseApiCallOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  debounceMs?: number;
  throttleMs?: number;
  preventDuplicate?: boolean;
  maxRetries?: number;
}

interface UseApiCallReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
  clearError: () => void;
}

/**
 * Custom hook để quản lý việc gọi API một cách thông minh
 * Tránh gọi API quá nhiều lần và cung cấp các tính năng bảo vệ
 */
export function useApiCall<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiCallOptions<T> = {}
): UseApiCallReturn<T> {
  const {
    onSuccess,
    onError,
    debounceMs,
    throttleMs,
    preventDuplicate = true,
    maxRetries = 3,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref để track request hiện tại
  const currentRequestRef = useRef<Promise<T> | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const retryCountRef = useRef<number>(0);

  // Reset state
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    retryCountRef.current = 0;
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Base execute function
  const executeBase = useCallback(
    async (...args: any[]): Promise<T | null> => {
      // Kiểm tra xem có đang gọi API không
      if (preventDuplicate && currentRequestRef.current) {
        console.log('[useApiCall] Request already in progress, skipping...');
        return currentRequestRef.current;
      }

      // Kiểm tra throttle
      if (throttleMs) {
        const now = Date.now();
        if (now - lastCallTimeRef.current < throttleMs) {
          console.log(`[useApiCall] Throttled request, skipping... (${throttleMs}ms)`);
          return null;
        }
        lastCallTimeRef.current = now;
      }

      try {
        setLoading(true);
        setError(null);

        // Tạo request mới
        const requestPromise = apiFunction(...args);
        currentRequestRef.current = requestPromise;

        const result = await requestPromise;

        setData(result);
        onSuccess?.(result);
        retryCountRef.current = 0;

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        onError?.(err);

        // Retry logic
        if (retryCountRef.current < maxRetries) {
          retryCountRef.current++;
          console.log(`[useApiCall] Retrying... (${retryCountRef.current}/${maxRetries})`);

          // Delay trước khi retry
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCountRef.current));

          // Recursive retry
          return executeBase(...args);
        }

        throw err;
      } finally {
        setLoading(false);
        currentRequestRef.current = null;
      }
    },
    [apiFunction, onSuccess, onError, preventDuplicate, throttleMs, maxRetries]
  );

  // Wrap với debounce nếu cần
  const executeWithDebounce = useCallback(
    debounceMs ? debounce(executeBase, debounceMs) : executeBase,
    [executeBase, debounceMs]
  );

  // Wrap với throttle nếu cần
  const executeWithThrottle = useCallback(
    throttleMs ? throttle(executeBase, throttleMs) : executeWithDebounce,
    [executeBase, throttleMs, executeWithDebounce]
  );

  return {
    data,
    loading,
    error,
    execute: executeWithThrottle as (...args: any[]) => Promise<T | null>,
    reset,
    clearError,
  };
}

/**
 * Hook đặc biệt cho việc gọi API với debounce
 */
export function useDebouncedApiCall<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  delayMs: number = 300,
  options: Omit<UseApiCallOptions<T>, 'debounceMs'> = {}
): UseApiCallReturn<T> {
  return useApiCall(apiFunction, { ...options, debounceMs: delayMs });
}

/**
 * Hook đặc biệt cho việc gọi API với throttle
 */
export function useThrottledApiCall<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  limitMs: number = 1000,
  options: Omit<UseApiCallOptions<T>, 'throttleMs'> = {}
): UseApiCallReturn<T> {
  return useApiCall(apiFunction, { ...options, throttleMs: limitMs });
}

/**
 * Hook đặc biệt cho việc gọi API một lần duy nhất
 */
export function useSingleApiCall<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: Omit<UseApiCallOptions<T>, 'preventDuplicate'> = {}
): UseApiCallReturn<T> {
  return useApiCall(apiFunction, { ...options, preventDuplicate: true });
}
