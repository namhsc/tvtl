import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Alert,
  Link,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { PublicRoute } from '../components/common';
import AuthLayout from '../components/AuthLayout';
import CustomTextField from '../components/CustomTextField';
import CustomButton from '../components/CustomButton';
import PasswordField from '../components/PasswordField';
import { errorHandler } from '../services';

function validatePhoneVN(phone: string) {
  return /^0\d{9}$/.test(phone);
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    method: 'ZALO',
  });
  const [fieldError, setFieldError] = useState<{
    phone?: string;
    password?: string;
  }>({});
  const [databaseError, setDatabaseError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { sendOtp, loading, error } = useAuth();
  usePageTitle('Đăng ký');

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
    } else if (!validatePhoneVN(formData.phone)) {
      newError.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
      valid = false;
    }

    if (!formData.password) {
      newError.password = 'Vui lòng nhập mật khẩu';
      valid = false;
    } else if (formData.password.length < 6) {
      newError.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      valid = false;
    }

    setFieldError(newError);
    if (!valid) return;

    // Reset database error
    setDatabaseError(null);

    try {
      const response = await sendOtp({
        phone: formData.phone,
        method: formData.method as 'SMS' | 'ZALO',
      });
      if (response?.success === true) {
        navigate('/verify-otp', { state: { phone: formData.phone, password: formData.password, method: formData.method as 'SMS' | 'ZALO', type: 'register' } });
      } else {
        setDatabaseError(response?.message ?? 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRefreshCaptcha = () => {
    // Implement captcha refresh logic here
    console.log('Refreshing captcha...');
  };

  return (
    <PublicRoute>
      <AuthLayout
        title="Tạo tài khoản mới"
        subtitle="Đăng ký để sử dụng dịch vụ tư vấn tâm lý"
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {databaseError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {databaseError}
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

          <FormControl component="fieldset" margin="normal">
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Phương thức nhận mã OTP:
            </Typography>
            <RadioGroup
              name="method"
              value={formData.method}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="ZALO"
                control={<Radio />}
                label="Zalo"
              />
              <FormControlLabel
                value="SMS"
                control={<Radio />}
                label="SMS"
              />
            </RadioGroup>
          </FormControl>

          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Đang gửi mã OTP...' : 'Gửi mã OTP'}
          </CustomButton>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Đã có tài khoản?{' '}
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

export default Register;
