import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

interface AuthWrapperProps {
  children: (authState: {
    isAuthenticated: boolean;
    loading: boolean;
    isInitialized: boolean;
  }) => React.ReactNode;
  requireAuth?: boolean;
  showLoading?: boolean;
}

/**
 * Component wrapper để xử lý trạng thái authentication
 * Đảm bảo rằng useAuth hook được sử dụng đúng cách
 */
const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requireAuth = true,
  showLoading = true,
}) => {
  const { isAuthenticated, loading, isInitialized } = useAuth();

  // Nếu chưa khởi tạo xong, hiển thị loading
  if (!isInitialized && showLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Đang khởi tạo hệ thống...
        </Typography>
      </Box>
    );
  }

  // Nếu đang loading, hiển thị loading
  if (loading && showLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Đang xác thực...
        </Typography>
      </Box>
    );
  }

  // Nếu yêu cầu auth nhưng chưa đăng nhập
  if (requireAuth && !isAuthenticated) {
    return null; // Sẽ được xử lý bởi RoleBasedRoute
  }

  // Hiển thị children với render prop pattern
  return <>{children({ isAuthenticated, loading, isInitialized })}</>;
};

export default AuthWrapper;
