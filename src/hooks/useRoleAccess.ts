import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authUtils } from '../services';

/**
 * Hook để kiểm tra quyền truy cập dựa trên role
 */
export const useRoleAccess = () => {
  const { user, isAuthenticated } = useAuth();

  const roleAccess = useMemo(() => {
    if (!isAuthenticated || !user) {
      return {
        isAdmin: false,
        isExpert: false,
        isUser: false,
        canAccessAdmin: false,
        canAccessRegular: true,
        roles: [],
        hasRole: (_roles: string[]) => false,
      };
    }

    const roles = user.roles || [];
    const isAdmin = authUtils.isAdmin();
    const isExpert = authUtils.isExpert();

    return {
      isAdmin,
      isExpert,
      isUser: !isAdmin && !isExpert,
      canAccessAdmin: isAdmin,
      canAccessRegular: true, // Tất cả user đã đăng nhập đều có thể truy cập trang thường
      roles,
      hasRole: (requiredRoles: string[]) => authUtils.hasRole(requiredRoles),
    };
  }, [user, isAuthenticated]);

  return roleAccess;
};

export default useRoleAccess;
