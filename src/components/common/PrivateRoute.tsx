import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { storageService } from '../../services';

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component bảo vệ các trang private (cần đăng nhập)
 * Chuyển hướng về trang đăng nhập nếu chưa có access token
 * Tự động chuyển hướng về trang được chỉ định nếu đã đăng nhập
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirectTo = '/login'
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Memoize checkAuthStatus function để tránh tạo mới mỗi lần render
  const checkAuthStatus = useCallback(() => {
    try {
      // Tự động cleanup tokens hết hạn trước
      storageService.cleanupExpiredTokens();

      // Sử dụng phương thức isAuthenticated để kiểm tra
      const authState = storageService.getAuthState();
      setIsAuthenticated(authState.isAuthenticated);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();

    // Thêm interval để kiểm tra auth status mỗi phút
    const interval = setInterval(checkAuthStatus, 60 * 1000);

    return () => clearInterval(interval);
  }, [checkAuthStatus]);

  // Memoize loading component để tránh re-render
  const loadingComponent = useMemo(() => (
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
        Đang kiểm tra quyền truy cập...
      </Typography>
    </Box>
  ), []);

  // Hiển thị loading khi đang kiểm tra
  if (isChecking) {
    return loadingComponent;
  }

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  if (!isAuthenticated) {
    console.log(`[PrivateRoute] User not authenticated, redirecting to ${redirectTo}`);
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung
  return <>{children}</>;
};

export default PrivateRoute;
