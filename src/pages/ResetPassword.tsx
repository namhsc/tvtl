import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Alert, Link } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { PublicRoute } from '../components/common';
import AuthLayout from '../components/AuthLayout';
import CustomButton from '../components/CustomButton';
import PasswordField from '../components/PasswordField';
import { errorHandler } from '../services';

interface ResetPasswordProps {
  contact: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ contact }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [fieldError, setFieldError] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const location = useLocation();

  const { resetPassword, loading, error } = useAuth();
  usePageTitle('Đặt lại mật khẩu');

  // Lấy thông tin từ location state
  const phone = location.state?.phone || contact;
  const otp = location.state?.otp || '';
  const otpVerified = location.state?.otpVerified || false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFieldError({ ...fieldError, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newError: typeof fieldError = {};

    if (!formData.newPassword) {
      newError.newPassword = 'Vui lòng nhập mật khẩu mới';
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newError.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newError.confirmPassword = 'Mật khẩu xác nhận không khớp';
      valid = false;
    }

    setFieldError(newError);
    if (!valid) return;

    try {
      await resetPassword({
        phone: phone,
        otCode: otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  };

  // Kiểm tra xem đã xác thực OTP chưa
  if (!otpVerified) {
    return (
      <PublicRoute>
        <AuthLayout
          title="Lỗi truy cập"
          subtitle="Vui lòng xác thực OTP trước khi đặt lại mật khẩu"
        >
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Bạn cần xác thực OTP trước khi có thể đặt lại mật khẩu.
            </Typography>
            <Link
              component={RouterLink}
              to="/forgot-password"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Quay lại quên mật khẩu
            </Link>
          </Box>
        </AuthLayout>
      </PublicRoute>
    );
  }

  return (
    <PublicRoute>
      <AuthLayout
        title="Đặt lại mật khẩu"
        subtitle="Nhập mật khẩu mới cho tài khoản của bạn"
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <PasswordField
            label="Mật khẩu mới"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldError.newPassword}
            helperText={fieldError.newPassword}
          />

          <PasswordField
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldError.confirmPassword}
            helperText={fieldError.confirmPassword}
          />

          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Đang đặt lại mật khẩu...' : 'Đặt lại mật khẩu'}
          </CustomButton>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Nhớ mật khẩu?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Đăng nhập ngay
              </Link>
            </Typography>
          </Box>
        </Box>
      </AuthLayout>
    </PublicRoute>
  );
};

export default ResetPassword;
