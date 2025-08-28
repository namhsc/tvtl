import { toast, ToastOptions } from 'react-toastify';

// ===== TOAST CONFIGURATION =====

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const errorToastOptions: ToastOptions = {
  ...defaultToastOptions,
  autoClose: 4000,
};

const warningToastOptions: ToastOptions = {
  ...defaultToastOptions,
  autoClose: 4000,
};

// ===== TOAST SERVICE =====

export const toastService = {
  /**
   * Hiển thị toast thành công
   */
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      ...defaultToastOptions,
      ...options,
    });
  },

  /**
   * Hiển thị toast lỗi
   */
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...errorToastOptions,
      ...options,
    });
  },

  /**
   * Hiển thị toast thông tin
   */
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      ...defaultToastOptions,
      ...options,
    });
  },

  /**
   * Hiển thị toast cảnh báo
   */
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      ...warningToastOptions,
      ...options,
    });
  },

  /**
   * Hiển thị toast lỗi database
   */
  databaseError: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      ...errorToastOptions,
      autoClose: 6000, // Hiển thị lâu hơn cho lỗi database
      ...options,
    });
  },

  /**
   * Hiển thị toast loading
   */
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, {
      ...defaultToastOptions,
      ...options,
    });
  },

  /**
   * Cập nhật toast loading thành success
   */
  updateSuccess: (
    toastId: string | number,
    message: string,
    options?: ToastOptions
  ) => {
    toast.update(toastId, {
      render: message,
      type: 'success',
      isLoading: false,
      autoClose: 3000,
      ...options,
    });
  },

  /**
   * Cập nhật toast loading thành error
   */
  updateError: (
    toastId: string | number,
    message: string,
    options?: ToastOptions
  ) => {
    toast.update(toastId, {
      render: message,
      type: 'error',
      isLoading: false,
      autoClose: 4000,
      ...options,
    });
  },

  /**
   * Đóng toast
   */
  dismiss: (toastId: string | number) => {
    toast.dismiss(toastId);
  },

  /**
   * Đóng tất cả toast
   */
  dismissAll: () => {
    toast.dismiss();
  },
};
