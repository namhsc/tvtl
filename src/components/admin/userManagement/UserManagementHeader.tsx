import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface UserManagementHeaderProps {
  onRefresh: () => void;
  onImport: () => void;
  onExport: () => void;
  onAddUser: () => void;
  loading: boolean;
}

const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  onRefresh,
  onImport,
  onExport,
  onAddUser,
  loading,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography variant="h6" color="text.secondary">
          Quản lý tài khoản người dùng trong hệ thống
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={onImport}
          sx={{
            borderRadius: 2,
            borderColor: 'rgba(0, 128, 255, 0.3)',
            color: '#0056CC',
          }}
        >
          Nhập Dữ Liệu
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExport}
          sx={{
            borderRadius: 2,
            borderColor: 'rgba(0, 128, 255, 0.3)',
            color: '#0056CC',
          }}
        >
          Xuất Dữ Liệu
        </Button>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          disabled={loading}
          sx={{
            borderRadius: 2,
            borderColor: 'rgba(0, 128, 255, 0.3)',
            color: '#0056CC',
          }}
        >
          Làm Mới
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddUser}
          sx={{
            px: 3,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 15px rgba(0, 128, 255, 0.3)',
          }}
        >
          Thêm Người Dùng
        </Button>
      </Box>
    </Box>
  );
};

export default UserManagementHeader;
