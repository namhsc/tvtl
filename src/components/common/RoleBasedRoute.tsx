import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { authUtils } from '../../services';
import AccessDenied from './AccessDenied';
import AuthWrapper from './AuthWrapper';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
  showLoading?: boolean;
}

/**
 * Component bảo vệ route dựa trên role của user
 * - Nếu user có role ADMIN: chỉ được truy cập trang Admin
 * - Nếu user có role khác: chỉ được truy cập trang thường (không phải Admin)
 * - Tự động chuyển hướng nếu không có quyền truy cập
 */
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo,
  showLoading = true,
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Sử dụng AuthWrapper để xử lý trạng thái authentication
  return (
    <AuthWrapper requireAuth={true} showLoading={showLoading}>
      {authState => {
        // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
        if (!authState.isAuthenticated || !user) {
          return <Navigate to="/login" replace state={{ from: location }} />;
        }

        // Kiểm tra role nếu có yêu cầu cụ thể
        if (allowedRoles && !authUtils.hasRole(allowedRoles)) {
          // Nếu không có role được yêu cầu, hiển thị AccessDenied
          return (
            <AccessDenied
              message={`Bạn cần có quyền ${allowedRoles.join(' hoặc ')} để truy cập trang này.`}
            />
          );
        }

        // Kiểm tra quyền truy cập dựa trên role
        const isAdmin = authUtils.isAdmin();
        const isAdminRoute = location.pathname.startsWith('/admin');
        const isRegularRoute = !isAdminRoute;

        // Nếu là Admin và cố gắng truy cập trang thường
        if (isAdmin && isRegularRoute) {
          // Admin có thể truy cập tất cả trang, nhưng khuyến khích sử dụng trang Admin
          console.log(
            '[RoleBasedRoute] Admin accessing regular route, allowing access'
          );
        }

        // Nếu không phải Admin và cố gắng truy cập trang Admin
        if (!isAdmin && isAdminRoute) {
          console.log(
            '[RoleBasedRoute] Non-admin user trying to access admin route, showing access denied'
          );
          return (
            <AccessDenied message="Bạn cần có quyền Admin để truy cập trang này." />
          );
        }

        // Nếu tất cả điều kiện đều thỏa mãn, hiển thị nội dung
        return <>{children}</>;
      }}
    </AuthWrapper>
  );
};

export default RoleBasedRoute;
