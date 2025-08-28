import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authUtils } from '../../services';
import { Box, CircularProgress, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';

interface RoleBasedRedirectProps {
  children?: React.ReactNode;
  showLoading?: boolean;
}

/**
 * Component tự động chuyển hướng người dùng dựa trên role
 * - Admin: chuyển hướng về /admin
 * - User thường: chuyển hướng về /dashboard
 */
const RoleBasedRedirect: React.FC<RoleBasedRedirectProps> = ({
  children,
  showLoading = true,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <AuthWrapper requireAuth={true} showLoading={showLoading}>
      {authState => {
        useEffect(() => {
          if (!authState.loading && authState.isAuthenticated && user) {
            const isAdmin = authUtils.isAdmin();

            if (isAdmin) {
              // Nếu là Admin, chuyển hướng về trang Admin
              navigate('/admin', { replace: true });
            } else {
              // Nếu là user thường, chuyển hướng về Dashboard
              navigate('/dashboard', { replace: true });
            }
          }
        }, [navigate, user, authState.isAuthenticated, authState.loading]);

        // Hiển thị children nếu có
        return <>{children}</>;
      }}
    </AuthWrapper>
  );
};

export default RoleBasedRedirect;
