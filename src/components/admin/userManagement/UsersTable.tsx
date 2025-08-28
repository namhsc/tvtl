import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../services/types/api.types';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  totalElements: number;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onToggleUserStatus: (user: User) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  loading,
  page,
  rowsPerPage,
  totalElements,
  onEditUser,
  onDeleteUser,
  onToggleUserStatus,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const navigate = useNavigate();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '#DC2626';
      case 'EXPERT':
        return '#F59E0B';
      case 'STUDENT':
        return '#10B981';
      case 'PARENT':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getUserStatus = (user: User) => {
    if (
      user.active &&
      (user.roles?.includes('STUDENT') ||
        user.roles?.includes('PARENT') ||
        (user.roles?.includes('EXPERT') && user?.expert?.status === 'APPROVED'))
    ) {
      return { label: 'Hoạt động', color: 'success' };
    }

    if (
      user.active &&
      user.roles?.includes('EXPERT') &&
      user?.expert?.status === 'PENDING'
    ) {
      return { label: 'Chờ duyệt', color: 'warning' };
    }

    return { label: 'Bị khóa', color: 'error' };
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', width: '80px' }}>
                STT
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Người dùng</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Thông tin liên hệ
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Vai trò</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Điểm</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ngày tạo</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? // Loading skeletons
                Array.from(new Array(rowsPerPage || 10)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={40} height={24} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box>
                          <Skeleton variant="text" width={120} height={24} />
                          <Skeleton variant="text" width={80} height={20} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} height={24} />
                      <Skeleton variant="text" width={150} height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={32} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={60} height={24} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} height={32} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} height={24} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1} justifyContent="center">
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              : (users || []).map((user, index) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {page * rowsPerPage + index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ width: 40, height: 40 }}>
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {user.fullName || 'Chưa cập nhật'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {user.phone}
                        </Typography>
                        {user.email && (
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {(user.roles || []).map(role => (
                          <Chip
                            key={role}
                            label={role}
                            size="small"
                            color="default"
                            sx={{
                              fontWeight: 'bold',
                              backgroundColor: getRoleColor(role),
                              color: 'white',
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {user.point || 0}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const { label, color } = getUserStatus(user);
                        return (
                          <Chip
                            label={label}
                            color={color as any}
                            size="small"
                          />
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString('vi-VN')
                          : ''}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                            sx={{ color: 'info.main' }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => onEditUser(user)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={user.active ? 'Khóa' : 'Mở khóa'}>
                          <IconButton
                            size="small"
                            color={user.active ? 'warning' : 'success'}
                            onClick={() => onToggleUserStatus(user)}
                          >
                            {user.active ? <BlockIcon /> : <CheckCircleIcon />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDeleteUser(user)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={totalElements || 0}
        rowsPerPage={rowsPerPage || 10}
        page={page || 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Số dòng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trong tổng số ${count !== -1 ? count : `hơn ${to}`}`
        }
      />
    </Paper>
  );
};

export default UsersTable;
