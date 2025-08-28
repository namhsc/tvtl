import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Alert, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useApiCall } from '../hooks/useApiCall';
import { usePageTitle } from '../hooks/usePageTitle';
import { PublicRoute } from '../components/common';
import AuthLayout from '../components/AuthLayout';
import OtpInput from '../components/OtpInput';
import { errorHandler } from '../services';

const OtpVerification: React.FC = () => {
  const [otpError, setOtpError] = useState('');
  const [countdown, setCountdown] = useState(60); // Start with 60s countdown
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { register, sendOtp, loading: authLoading, error: authError } = useAuth();

  // Sử dụng custom hook để quản lý API calls
  const { execute: executeRegister, loading: registerLoading, error: registerError } = useApiCall(
    register,
    {
      preventDuplicate: true,
      maxRetries: 2,
      onSuccess: (response) => {
        console.log('Register success:', response);
        setIsVerified(true);
      },
      onError: (error) => {
        console.error('Register error:', error);
        setOtpError(error instanceof Error ? error.message : 'Lỗi xác thực OTP');
      }
    }
  );

  const { execute: executeSendOtp, loading: sendOtpLoading, error: sendOtpError } = useApiCall(
    sendOtp,
    {
      preventDuplicate: true,
      throttleMs: 1000, // Chỉ cho phép gửi OTP mỗi 1 giây
      maxRetries: 1,
      onSuccess: (response) => {
        console.log('Send OTP success:', response);
        // Reset OTP input
        if (typeof window !== 'undefined' && (window as any).resetOtpInput) {
          (window as any).resetOtpInput();
        }
      },
      onError: (error) => {
        console.error('Send OTP error:', error);
        setOtpError(error instanceof Error ? error.message : 'Lỗi gửi OTP');
      }
    }
  );

  // Lấy thông tin từ location state
  const { phone, password, method, type } = location.state || {};
  const isSignUp = type === 'register';

  // Set page title based on context
  usePageTitle(isSignUp ? 'Xác thực đăng ký' : 'Xác thực đặt lại mật khẩu');

  // Memoize context messages to prevent unnecessary re-creation
  const messages = useMemo(() => {
    if (isSignUp) {
      return {
        title: 'Xác thực đăng ký',
        subtitle: 'Nhập mã OTP để hoàn tất đăng ký tài khoản',
        successMessage: 'Xác thực thành công! Tài khoản của bạn đã được tạo. Bây giờ hãy hoàn thiện thông tin cá nhân.',
        resendMessage: 'Không nhận được mã?',
        backButtonText: 'Quay lại đăng ký',
        backButtonAction: () =>
          navigate('/register', { state: { phone: phone } }),
      };
    } else {
      return {
        title: 'Xác thực đặt lại mật khẩu',
        subtitle: 'Nhập mã OTP để đặt lại mật khẩu',
        successMessage: 'Xác thực thành công! Vui lòng đặt lại mật khẩu mới.',
        resendMessage: 'Không nhận được mã?',
        backButtonText: 'Quay lại quên mật khẩu',
        backButtonAction: () => navigate('/forgot-password'),
      };
    }
  }, [isSignUp, navigate, phone]);

  // Memoize OTP completion handler to prevent unnecessary re-renders
  const handleOtpComplete = useCallback(async (otpCode: string) => {
    if (isVerified || registerLoading) return; // Prevent multiple calls

    setOtpError('');

    // Tự động gửi khi nhập đủ 6 số
    if (otpCode.length === 6) {
      console.log('Submitting OTP with data:', { phone, password: '***', otpCode, method, type });

      try {
        await executeRegister({ phone, password, otpCode });
      } catch (error) {
        console.error('OTP verification error:', error);
        // Error đã được xử lý trong useApiCall
      }
    }
  }, [isVerified, registerLoading, executeRegister, phone, password, method, type]);

  // Memoize resend OTP handler
  const handleResendOtp = useCallback(async () => {
    if (countdown > 0 || !canResend || sendOtpLoading) return;

    try {
      console.log('Resending OTP with data:', { phone, method });

      // Gửi lại OTP
      setCountdown(60);
      setCanResend(false);
      await executeSendOtp({ phone, method });
    } catch (error) {
      console.error('Resend OTP error:', error);
      // Error đã được xử lý trong useApiCall
      // Reset countdown nếu có lỗi
      setCountdown(60);
      setCanResend(false);
    }
  }, [countdown, canResend, sendOtpLoading, executeSendOtp, phone, method]);

  // Memoize back button handlers
  const handleBackToForgotPassword = useCallback(() => {
    navigate('/forgot-password');
  }, [navigate]);

  const handleBackToRegister = useCallback(() => {
    navigate('/register', { state: { phone: phone } });
  }, [navigate, phone]);

  const handleCompleteProfile = useCallback(() => {
    navigate('/profile', {
      state: {
        isNewUser: true,
        message: 'Chào mừng bạn! Vui lòng hoàn thiện thông tin cá nhân.'
      }
    });
  }, [navigate]);

  const handleResetPassword = useCallback(() => {
    navigate('/reset-password', {
      state: {
        phone,
        otpVerified: true,
      },
    });
  }, [navigate, phone]);

  // Countdown timer - optimized to prevent unnecessary re-renders
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Kiểm tra xem có đủ dữ liệu cần thiết không
  if (!phone || !password || !method || !type) {
    console.log('Missing data:', { phone: !!phone, password: !!password, method: !!method, type: !!type });
    return (
      <PublicRoute>
        <AuthLayout title="Lỗi" subtitle="Thiếu thông tin cần thiết">
          <Alert severity="error" sx={{ mb: 3 }}>
            Không thể truy cập trang xác thực OTP. Vui lòng quay lại trang đăng ký.
            <br />
            Thiếu: {[
              !phone && 'số điện thoại',
              !password && 'mật khẩu',
              !method && 'phương thức',
              !type && 'loại xác thực'
            ].filter(Boolean).join(', ')}
          </Alert>
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{ minWidth: 200 }}
            >
              Quay lại đăng ký
            </Button>
          </Box>
        </AuthLayout>
      </PublicRoute>
    );
  }

  // Combine loading states
  const isLoading = registerLoading || sendOtpLoading || authLoading;
  // Combine error states
  const error = registerError || sendOtpError || authError || otpError;

  return (
    <PublicRoute>
      <AuthLayout title={messages.title} subtitle={messages.subtitle}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isVerified && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {messages.successMessage}
          </Alert>
        )}

        <Box>
          <OtpInput
            onComplete={handleOtpComplete}
            error={!!otpError}
            disabled={isLoading || isVerified}
            helperText={otpError || undefined}
          />

          {isLoading && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {isSignUp ? 'Đang xác thực đăng ký...' : 'Đang xác thực OTP...'}
              </Typography>
            </Box>
          )}

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {messages.resendMessage}{' '}
              {countdown > 0 ? (
                <Typography
                  component="span"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  Gửi lại sau {countdown}s
                </Typography>
              ) : (
                <Typography
                  component="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || isLoading}
                  sx={{
                    color: canResend && !isLoading ? '#0080FF' : 'text.disabled',
                    textDecoration: 'none',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: canResend && !isLoading ? 'pointer' : 'not-allowed',
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    '&:hover': {
                      textDecoration: canResend && !isLoading ? 'underline' : 'none',
                    },
                    '&:disabled': {
                      cursor: 'not-allowed',
                      opacity: 0.6,
                    },
                  }}
                >
                  Gửi lại
                </Typography>
              )}
            </Typography>
          </Box>

          {/* Back button */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button
              variant="text"
              onClick={isSignUp ? handleBackToRegister : handleBackToForgotPassword}
              sx={{
                color: 'text.secondary',
                textTransform: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {messages.backButtonText}
            </Button>
          </Box>

          {/* Success actions */}
          {isVerified && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              {isSignUp ? (
                <Button
                  variant="contained"
                  onClick={handleCompleteProfile}
                  sx={{ minWidth: 200 }}
                >
                  Hoàn thiện thông tin cá nhân
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleResetPassword}
                  sx={{ minWidth: 200 }}
                >
                  Đặt lại mật khẩu
                </Button>
              )}
            </Box>
          )}
        </Box>
      </AuthLayout>
    </PublicRoute>
  );
};

export default OtpVerification;
