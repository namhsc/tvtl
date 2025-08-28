import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authUtils } from '../../services';
import AuthWrapper from './AuthWrapper';

interface AccessDeniedProps {
  message?: string;
  showUserInfo?: boolean;
}

/**
 * Component hiển thị khi người dùng không có quyền truy cập
 */
const AccessDenied: React.FC<AccessDeniedProps> = ({
  message = 'Bạn không có quyền truy cập trang này.',
  showUserInfo = true,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <AuthWrapper requireAuth={false} showLoading={false}>
      {authState => {
        const handleGoHome = () => {
          if (authUtils.isAdmin()) {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        };

        const handleGoBack = () => {
          navigate(-1);
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
              <Typography variant="h4" color="error" gutterBottom>
                ⚠️ Không Có Quyền Truy Cập
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

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button variant="contained" onClick={handleGoHome}>
                  {authUtils.isAdmin() ? 'Về Trang Admin' : 'Về Dashboard'}
                </Button>
                <Button variant="outlined" onClick={handleGoBack}>
                  Quay Lại
                </Button>
              </Box>
            </Paper>
          </Box>
        );
      }}
    </AuthWrapper>
  );
};

export default AccessDenied;
