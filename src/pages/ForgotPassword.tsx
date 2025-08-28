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
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { PublicRoute } from '../components/common';
import AuthLayout from '../components/AuthLayout';
import CustomTextField from '../components/CustomTextField';
import CustomButton from '../components/CustomButton';
import { errorHandler } from '../services';

function validatePhoneVN(phone: string) {
  return /^0\d{9}$/.test(phone);
}

const ForgotPassword: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState<'SMS' | 'ZALO'>('ZALO');
  const [fieldError, setFieldError] = useState<{
    phone?: string;
  }>({});

  const navigate = useNavigate();
  const { sendOtp, loading, error } = useAuth();
  usePageTitle('Quên mật khẩu');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newError: typeof fieldError = {};

    if (!phone) {
      newError.phone = 'Vui lòng nhập số điện thoại';
      valid = false;
    } else if (!validatePhoneVN(phone)) {
      newError.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
      valid = false;
    }

    setFieldError(newError);
    if (!valid) return;

    try {
      await sendOtp({ phone, method });
    } catch (error) {
      throw errorHandler.handle(error, false);
    }
  };

  return (
    <PublicRoute>
      <AuthLayout
        title="Quên mật khẩu?"
        subtitle="Nhập số điện thoại để nhận mã OTP"
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <CustomTextField
            fullWidth
            label="Số điện thoại"
            type="tel"
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
              setFieldError({ ...fieldError, phone: undefined });
            }}
            margin="normal"
            required
            placeholder="0123456789"
            error={!!fieldError.phone}
            helperText={fieldError.phone}
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Chọn phương thức nhận OTP:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={method}
                onChange={e => setMethod(e.target.value as 'SMS' | 'ZALO')}
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
          </Box>

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

export default ForgotPassword;
