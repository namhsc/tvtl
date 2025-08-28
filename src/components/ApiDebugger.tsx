import React, { useState } from 'react';
import { Box, Button, Typography, Paper, TextField, Alert } from '@mui/material';
import { apiAuth } from '../services/apiAuth';

const ApiDebugger: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    if (!phone || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiAuth.login({ phone, password });
      setResponse(result);
      console.log('Login test result:', result);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
      console.error('Login test error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    if (!phone || !password || !otpCode) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiAuth.register({ phone, password, otpCode });
      setResponse(result);
      console.log('Register test result:', result);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
      console.error('Register test error:', err);
    } finally {
      setLoading(false);
    }
  };

  const testSendOtp = async () => {
    if (!phone) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await apiAuth.sendOtp({ phone, method: 'SMS' });
      setResponse(result);
      console.log('Send OTP test result:', result);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
      console.error('Send OTP test error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        API Debugger
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Component này giúp debug và kiểm tra cấu trúc response từ API
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Data
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0123456789"
            size="small"
          />
          <TextField
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
            size="small"
          />
          <TextField
            label="Mã OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="123456"
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={testSendOtp}
            disabled={loading || !phone}
          >
            Test Send OTP
          </Button>
          <Button
            variant="contained"
            onClick={testLogin}
            disabled={loading || !phone || !password}
          >
            Test Login
          </Button>
          <Button
            variant="contained"
            onClick={testRegister}
            disabled={loading || !phone || !password || !otpCode}
          >
            Test Register
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            API Response
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: '#f5f5f5',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              fontSize: '12px',
            }}
          >
            {JSON.stringify(response, null, 2)}
          </Box>
        </Paper>
      )}

      {loading && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography>Đang xử lý...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ApiDebugger;
