import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { RoleBasedRedirect, AuthWrapper } from '../components/common';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user: authUser, isAuthenticated, loading } = useAuth();
  usePageTitle('Dashboard');

  return (
    <AuthWrapper requireAuth={true} showLoading={true}>
      {authState => {
        // Nếu đang loading, hiển thị loading
        if (authState.loading) {
          return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
              <Alert severity="info">Đang tải thông tin người dùng...</Alert>
            </Container>
          );
        }

        // Nếu chưa đăng nhập, chuyển hướng về login
        if (!authState.isAuthenticated || !authUser) {
          navigate('/login');
          return null;
        }

        // Tự động chuyển hướng Admin về trang Admin
        if (authUser.roles?.includes('ADMIN')) {
          return <RoleBasedRedirect />;
        }

        const handleLogout = () => {
          logout();
        };

        return (
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                  🎉 Chào mừng đến với hệ thống!
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Bạn đã đăng nhập thành công
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Thông tin tài khoản:
                </Typography>
                <Paper elevation={1} sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Số điện thoại:</strong>{' '}
                    {authUser.phone || 'Không có'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Trạng thái:</strong> Đã xác thực
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Vai trò:</strong>{' '}
                    {authUser.roles?.join(', ') || 'Không có'}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Thời gian đăng nhập:</strong>{' '}
                    {new Date().toLocaleString('vi-VN')}
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Đây là trang Dashboard mẫu. Bạn có thể thêm các tính năng khác
                  vào đây.
                </Typography>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  sx={{ minWidth: 200 }}
                >
                  Đăng xuất
                </Button>
              </Box>
            </Paper>
          </Container>
        );
      }}
    </AuthWrapper>
  );
};

export default Dashboard;
