import React from 'react';
import { AccessDenied } from '../components/common';

/**
 * Trang hiển thị khi người dùng không có quyền truy cập
 */
const AccessDeniedPage: React.FC = () => {
  return (
    <AccessDenied
      message="Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn cần quyền truy cập."
      showUserInfo={true}
    />
  );
};

export default AccessDeniedPage;
