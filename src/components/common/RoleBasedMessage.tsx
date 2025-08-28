import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authUtils } from '../../services';
import AuthWrapper from './AuthWrapper';

interface RoleBasedMessageProps {
  title?: string;
  message?: string;
  showUserInfo?: boolean;
  showNavigationButtons?: boolean;
}

/**
 * Component hiển thị thông báo dựa trên role của user
 */
const RoleBasedMessage: React.FC<RoleBasedMessageProps> = ({
  title = 'Thông Báo',
  message = 'Chào mừng bạn đến với hệ thống!',
  showUserInfo = true,
  showNavigationButtons = true,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <AuthWrapper requireAuth={false} showLoading={false}>
      {_authState => {
        const handleGoToAdmin = () => {
          navigate('/admin');
        };

        const handleGoToDashboard = () => {
          navigate('/dashboard');
        };

        const handleGoHome = () => {
          navigate('/');
        };

        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              p: 3,
            }}
          >
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 500,
              }}
            >
              <Typography variant="h4" color="primary" gutterBottom>
                {title}
              </Typography>

              <Typography variant="body1" paragraph>
                {message}
              </Typography>

              {showUserInfo && user && (
                <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Thông tin tài khoản:
                  </Typography>
                  <Typography variant="body2">
                    <strong>Vai trò:</strong>{' '}
                    {user.roles?.join(', ') || 'Không có'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Số điện thoại:</strong> {user.phone || 'Không có'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Trạng thái:</strong>{' '}
                    {authUtils.isAdmin() ? 'Admin' : 'Người dùng thường'}
                  </Typography>
                </Box>
              )}

              {showNavigationButtons && (
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {authUtils.isAdmin() ? (
                    <Button variant="contained" onClick={handleGoToAdmin}>
                      Vào Trang Admin
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleGoToDashboard}>
                      Vào Dashboard
                    </Button>
                  )}
                  <Button variant="outlined" onClick={handleGoHome}>
                    Về Trang Chủ
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>
        );
      }}
    </AuthWrapper>
  );
};

export default RoleBasedMessage;
