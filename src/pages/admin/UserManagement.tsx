import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import AdminLayout from '../../components/admin/AdminLayout';
import {
<<<<<<< HEAD
  UserManagementHeader,
  UserStatisticsCards,
  UserFilters,
  UsersTable,
  DeleteUserDialog,
  UserManagementSnackbar,
  AddUserModal,
  EditUserModal,
} from '../../components/admin/userManagement';
=======
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
  TextField,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
import { User } from '../../services/types/api.types';
import { apiUser } from '../../services/apiUser';

interface UserManagementState {
  users: User[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  searchTerm: string;
  statusFilter: string;
  roleFilter: string;
  selectedUser: User | null;
  editDialogOpen: boolean;
  deleteDialogOpen: boolean;
  addUserDialogOpen: boolean;
  totalPages: number;
  totalElements: number;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  };
}

const UserManagement: React.FC = () => {
  const [state, setState] = useState<UserManagementState>({
    users: [],
    loading: true,
    page: 0,
    rowsPerPage: 10,
    searchTerm: '',
    statusFilter: 'all',
    roleFilter: 'all',
    selectedUser: null,
    editDialogOpen: false,
    deleteDialogOpen: false,
    addUserDialogOpen: false,
    totalPages: 0,
    totalElements: 0,
    snackbar: {
      open: false,
      message: '',
      severity: 'info',
    },
  });

  useEffect(() => {
    loadUsers();
  }, [
    state.page,
    state.rowsPerPage,
    state.searchTerm,
    state.statusFilter,
    state.roleFilter,
  ]);

  const loadUsers = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));

      // Gọi API với các tham số lọc và phân trang
      const response = await apiUser.getUserList(
        state.page,
        state.rowsPerPage,
        state.searchTerm || '',
        state.statusFilter,
        state.roleFilter
      );

      console.log(response.data);
      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          users: response.data.content,
          loading: false,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
        }));
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setState(prev => ({ ...prev, loading: false }));
      showSnackbar('Lỗi khi tải danh sách người dùng', 'error');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchTerm: event.target.value, page: 0 }));
  };

  const handleStatusFilterChange = (event: any) => {
    setState(prev => ({ ...prev, statusFilter: event.target.value, page: 0 }));
  };

  const handleRoleFilterChange = (event: any) => {
    setState(prev => ({ ...prev, roleFilter: event.target.value, page: 0 }));
  };

  const clearFilters = () => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      statusFilter: 'all',
      roleFilter: 'all',
      page: 0,
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prev => ({
      ...prev,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  const handleEditUser = (user: User) => {
    setState(prev => ({ ...prev, selectedUser: user, editDialogOpen: true }));
  };

  const handleDeleteUser = (user: User) => {
    setState(prev => ({ ...prev, selectedUser: user, deleteDialogOpen: true }));
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      // TODO: Gọi API để thay đổi trạng thái người dùng
      // Sau khi thay đổi thành công, reload data từ server
      showSnackbar(
        `Đã ${user.active ? 'khóa' : 'mở khóa'} người dùng ${user.fullName}`,
        'success'
      );
      // Reload data để cập nhật trạng thái mới
      await loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      showSnackbar('Lỗi khi thay đổi trạng thái người dùng', 'error');
    }
  };

  const handleSaveUser = async (_updatedUser: Partial<User>) => {
    try {
      // TODO: Gọi API để cập nhật thông tin người dùng
      setState(prev => ({
        ...prev,
        editDialogOpen: false,
      }));
      showSnackbar('Đã cập nhật thông tin người dùng thành công', 'success');
      // Reload data để cập nhật thông tin mới
      await loadUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      showSnackbar('Lỗi khi cập nhật thông tin người dùng', 'error');
    }
  };

  const handleDeleteUserConfirm = async () => {
    if (!state.selectedUser) return;

    try {
      // TODO: Gọi API để xóa người dùng
      setState(prev => ({
        ...prev,
        deleteDialogOpen: false,
      }));
      showSnackbar('Đã xóa người dùng thành công', 'success');
      // Reload data để cập nhật danh sách
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showSnackbar('Lỗi khi xóa người dùng', 'error');
    }
  };

  const handleAddUser = () => {
    setState(prev => ({ ...prev, addUserDialogOpen: true }));
  };

  const handleSaveNewUser = async (_userData: Partial<User>) => {
    try {
      // TODO: Gọi API để tạo người dùng mới
      setState(prev => ({
        ...prev,
        addUserDialogOpen: false,
      }));
      showSnackbar('Đã tạo người dùng mới thành công', 'success');
      // Reload data để cập nhật danh sách
      await loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      showSnackbar('Lỗi khi tạo người dùng mới', 'error');
    }
  };

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => {
    setState(prev => ({
      ...prev,
      snackbar: { open: true, message, severity },
    }));
  };

  const closeSnackbar = () => {
    setState(prev => ({
      ...prev,
      snackbar: { ...prev.snackbar, open: false },
    }));
  };

  const exportUsers = () => {
    // TODO: Implement export functionality
    showSnackbar('Tính năng xuất dữ liệu đang được phát triển', 'info');
  };

  const importUsers = () => {
    // TODO: Implement import functionality
    showSnackbar('Tính năng nhập dữ liệu đang được phát triển', 'info');
  };

  return (
<<<<<<< HEAD
    <AdminLayout title="Quản Lý Người Dùng">
      <Box>
=======
    <AdminLayout>
      <Box sx={{ p: 3 }}>
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
        {/* Header */}
        <UserManagementHeader
          onRefresh={loadUsers}
          onImport={importUsers}
          onExport={exportUsers}
          onAddUser={handleAddUser}
          loading={state.loading}
        />

        {/* Statistics Cards */}
        {/* <UserStatisticsCards countsByRole={state.countsByRole} /> */}

        {/* Filters */}
        <UserFilters
          searchTerm={state.searchTerm}
          statusFilter={state.statusFilter}
          roleFilter={state.roleFilter}
          onSearchChange={handleSearch}
          onStatusFilterChange={handleStatusFilterChange}
          onRoleFilterChange={handleRoleFilterChange}
          onClearFilters={clearFilters}
        />

        {/* Users Table */}
        <UsersTable
          users={state.users}
          loading={state.loading}
          page={state.page}
          rowsPerPage={state.rowsPerPage}
          totalElements={state.totalElements}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onToggleUserStatus={handleToggleUserStatus}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Edit User Modal */}
        <EditUserModal
          open={state.editDialogOpen}
          user={state.selectedUser}
          onClose={() => setState(prev => ({ ...prev, editDialogOpen: false }))}
          onSave={handleSaveUser}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteUserDialog
          open={state.deleteDialogOpen}
          user={state.selectedUser}
          onClose={() =>
            setState(prev => ({ ...prev, deleteDialogOpen: false }))
          }
          onConfirm={handleDeleteUserConfirm}
        />

        {/* Add User Modal */}
        <AddUserModal
          open={state.addUserDialogOpen}
          onClose={() =>
            setState(prev => ({ ...prev, addUserDialogOpen: false }))
          }
          onSave={handleSaveNewUser}
        />

        {/* Snackbar */}
        <UserManagementSnackbar
          open={state.snackbar.open}
          message={state.snackbar.message}
          severity={state.snackbar.severity}
          onClose={closeSnackbar}
        />
      </Box>
    </AdminLayout>
  );
};

export default UserManagement;
