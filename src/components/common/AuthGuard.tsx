import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

// ===== AUTH GUARD TYPES =====

interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
  requireProfileCompleted?: boolean;
}

// ===== LOADING COMPONENT =====

const LoadingComponent: React.FC<{ message: string }> = ({ message }) => (
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
      {message}
    </Typography>
  </Box>
);

// ===== AUTH GUARD COMPONENT =====

/**
 * Component bảo vệ các trang dựa trên trạng thái xác thực
 * Hỗ trợ nhiều loại bảo vệ khác nhau:
 * - requireAuth: true = cần đăng nhập, false = không được đăng nhập
 * - allowedRoles: danh sách roles được phép truy cập
 * - requireProfileCompleted: yêu cầu profile đã hoàn thành
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  redirectTo,
  allowedRoles = [],
  requireProfileCompleted = false,
}) => {
  const { isAuthenticated, user, loading, isInitialized } = useAuth();
  const location = useLocation();

  // Hiển thị loading khi đang khởi tạo
  if (!isInitialized || loading) {
    return (
      <LoadingComponent
        message={
          requireAuth
            ? 'Đang kiểm tra quyền truy cập...'
            : 'Đang kiểm tra trạng thái đăng nhập...'
        }
      />
    );
  }

  // Xử lý logic bảo vệ
  if (requireAuth) {
    // Trang cần đăng nhập
    if (!isAuthenticated || !user) {
      const loginPath = redirectTo || '/login';
      console.log(
        `[AuthGuard] User not authenticated, redirecting to ${loginPath}`
      );
      return <Navigate to={loginPath} replace state={{ from: location }} />;
    }

    // Kiểm tra roles nếu có yêu cầu
    if (allowedRoles.length > 0) {
      const hasRequiredRole = allowedRoles.some(
        role => user.roles && user.roles.includes(role)
      );

      if (!hasRequiredRole) {
        const unauthorizedPath = redirectTo || '/unauthorized';
        console.log(
          `[AuthGuard] User doesn't have required roles, redirecting to ${unauthorizedPath}`
        );
        return (
          <Navigate to={unauthorizedPath} replace state={{ from: location }} />
        );
      }
    }

    // Kiểm tra profile đã hoàn thành nếu có yêu cầu
    if (requireProfileCompleted) {
      const completed = localStorage.getItem('completed');
      if (completed !== 'true') {
        const profilePath = redirectTo || '/profile';
        console.log(
          `[AuthGuard] Profile not completed, redirecting to ${profilePath}`
        );
        return <Navigate to={profilePath} replace state={{ from: location }} />;
      }
    }
  } else {
    // Trang không được phép đăng nhập (login, register)
    if (isAuthenticated && user) {
      const homePath = redirectTo || '/home';
      console.log(
        `[AuthGuard] User already authenticated, redirecting to ${homePath}`
      );
      return <Navigate to={homePath} replace state={{ from: location }} />;
    }
  }

  // Tất cả điều kiện đều thỏa mãn, hiển thị nội dung
  return <>{children}</>;
};

// ===== CONVENIENCE COMPONENTS =====

/**
 * Component bảo vệ trang private (cần đăng nhập)
 */
export const PrivateRoute: React.FC<
  Omit<AuthGuardProps, 'requireAuth'>
> = props => <AuthGuard {...props} requireAuth={true} />;

/**
 * Component bảo vệ trang public (không được đăng nhập)
 */
export const PublicRoute: React.FC<
  Omit<AuthGuardProps, 'requireAuth'> & { redirectTo?: string }
> = props => (
  <AuthGuard
    {...props}
    requireAuth={false}
    redirectTo={props.redirectTo || '/home'}
  />
);

/**
 * Component bảo vệ trang admin (cần role ADMIN)
 */
export const AdminRoute: React.FC<
  Omit<AuthGuardProps, 'requireAuth' | 'allowedRoles'> & { redirectTo?: string }
> = props => (
  <AuthGuard
    {...props}
    requireAuth={true}
    allowedRoles={['ADMIN']}
    redirectTo={props.redirectTo || '/unauthorized'}
  />
);

/**
 * Component bảo vệ trang expert (cần role EXPERT hoặc ADMIN)
 */
export const ExpertRoute: React.FC<
  Omit<AuthGuardProps, 'requireAuth' | 'allowedRoles'> & { redirectTo?: string }
> = props => (
  <AuthGuard
    {...props}
    requireAuth={true}
    allowedRoles={['EXPERT', 'ADMIN']}
    redirectTo={props.redirectTo || '/unauthorized'}
  />
);

/**
 * Component bảo vệ trang cần profile hoàn thành
 */
export const ProfileRequiredRoute: React.FC<
  Omit<AuthGuardProps, 'requireAuth' | 'requireProfileCompleted'> & {
    redirectTo?: string;
  }
> = props => (
  <AuthGuard
    {...props}
    requireAuth={true}
    requireProfileCompleted={true}
    redirectTo={props.redirectTo || '/profile'}
  />
);

export default AuthGuard;
