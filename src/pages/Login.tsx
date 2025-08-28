import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Alert, Link } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { PublicRoute } from '../components/common';
import AuthLayout from '../components/AuthLayout';
import CustomTextField from '../components/CustomTextField';
import CustomButton from '../components/CustomButton';
import PasswordField from '../components/PasswordField';
import { errorHandler, toastService } from '../services';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [fieldError, setFieldError] = useState<{
    phone?: string;
    password?: string;
  }>({});
  const location = useLocation();
  const navigate = useNavigate();
  const successMessage = location.state?.message;

  const { login, loading, error } = useAuth();
  usePageTitle('Đăng nhập');

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

    if (!formData.phone) {
      newError.phone = 'Vui lòng nhập số điện thoại';
      valid = false;
    }

    if (!formData.password) {
      newError.password = 'Vui lòng nhập mật khẩu';
      valid = false;
    }

    setFieldError(newError);
    if (!valid) {
      toastService.warning('Vui lòng kiểm tra lại thông tin đăng nhập');
      return;
    }

    try {
      const response = await login(formData);
      const from = location.state?.from?.pathname;

      if (response?.success) {
<<<<<<< HEAD
        if (response?.data?.user?.roles.includes('ADMIN')) {
          navigate('/admin');
          return;
        }
        if (response?.data?.completed === false) {
=======
        if (
          response?.data?.completed === false &&
          !response?.data?.user?.roles.includes('ADMIN')
        ) {
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
          const message =
            'Vui lòng hoàn thiện thông tin cá nhân để tiếp tục sử dụng dịch vụ';
          toastService.info(message);
          navigate('/profile', { state: { message } });
          return;
        }
        toastService.success('Đăng nhập thành công!');
        if (from && from !== '/login') {
          navigate(from);
        } else {
          navigate('/');
        }
      } else {
        toastService.error(response?.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      errorHandler.handle(error, true);
    }
  };

  return (
    <PublicRoute>
      <AuthLayout
        title="Chào mừng trở lại!"
        subtitle="Đăng nhập để tiếp tục sử dụng dịch vụ tư vấn tâm lý"
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <CustomTextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
            placeholder="0123456789"
            error={!!fieldError.phone}
            helperText={fieldError.phone}
          />
          <PasswordField
            label="Mật khẩu"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            error={!!fieldError.password}
            helperText={fieldError.password}
          />

          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </CustomButton>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Quên mật khẩu?
            </Link>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Chưa có tài khoản?{' '}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </Box>
      </AuthLayout>
    </PublicRoute>
  );
};

export default Login;
