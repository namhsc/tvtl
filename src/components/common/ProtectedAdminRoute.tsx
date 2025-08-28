import React from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '../../services';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component bảo vệ route chỉ dành cho Admin
 * Nếu user không có quyền Admin, sẽ chuyển hướng hoặc hiển thị fallback
 */
export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
  fallback,
  redirectTo = '/access-denied',
}) => {
  const currentUser = authUtils.getCurrentUser();

  // Nếu chưa đăng nhập
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Nếu không có quyền Admin
  if (!authUtils.hasRole(['ADMIN'])) {
    // Nếu có fallback, hiển thị fallback
    if (fallback) {
      return <>{fallback}</>;
    }

    // Nếu không có fallback, chuyển hướng
    return <Navigate to={redirectTo} replace />;
  }

  // Nếu có quyền Admin, hiển thị children
  return <>{children}</>;
};

/**
 * Component hiển thị khi không có quyền truy cập
 */
export const AccessDenied: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authUtils.getCurrentUser();

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
          Bạn không có quyền truy cập trang này.
        </Typography>

        {currentUser && (
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Thông tin tài khoản:
            </Typography>
            <Typography variant="body2">
              <strong>Vai trò:</strong> {currentUser.roles.join(', ')}
            </Typography>
            <Typography variant="body2">
              <strong>Số điện thoại:</strong> {currentUser.phone}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Về Trang Chủ
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Quay Lại
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

/**
 * Component hiển thị khi cần quyền Admin
 */
export const AdminRequired: React.FC<{ message?: string }> = ({
  message = 'Trang này yêu cầu quyền Admin',
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <Typography variant="h6" color="warning" gutterBottom>
          🔒 Quyền Admin Cần Thiết
        </Typography>

        <Typography variant="body2" paragraph>
          {message}
        </Typography>

        <Button variant="contained" onClick={() => navigate('/')}>
          Về Trang Chủ
        </Button>
      </Paper>
    </Box>
  );
};

export default ProtectedAdminRoute;
