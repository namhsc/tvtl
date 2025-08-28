import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { storageService } from '../../services';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Component bảo vệ các trang public (đăng nhập, đăng ký, quên mật khẩu)
 * Ngăn người dùng đã đăng nhập truy cập vào các trang này
 * Tự động chuyển hướng về trang Home nếu đã có access token
 */
const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/home'
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Memoize checkAuthStatus function để tránh tạo mới mỗi lần render
  const checkAuthStatus = useCallback(() => {
    try {
      // Kiểm tra access token
      const accessToken = storageService.getAccessToken();
      const refreshToken = storageService.getRefreshToken();

      if (accessToken && refreshToken) {
        // Có thể thêm validation token ở đây nếu cần
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
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
        Đang kiểm tra trạng thái đăng nhập...
      </Typography>
    </Box>
  ), []);

  // Hiển thị loading khi đang kiểm tra
  if (isChecking) {
    return loadingComponent;
  }

  // Nếu đã đăng nhập, chuyển hướng về trang được chỉ định
  if (isAuthenticated) {
    console.log(`[PublicRoute] User already authenticated, redirecting to ${redirectTo}`);
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Nếu chưa đăng nhập, hiển thị nội dung
  return <>{children}</>;
};

export default PublicRoute;
