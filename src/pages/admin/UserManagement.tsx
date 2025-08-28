import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import AdminLayout from '../../components/admin/AdminLayout';
import {
  UserManagementHeader,
  UserStatisticsCards,
  UserFilters,
  UsersTable,
  DeleteUserDialog,
  UserManagementSnackbar,
  AddUserModal,
  EditUserModal,
} from '../../components/admin/userManagement';
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
  }, [state.page, state.rowsPerPage, state.searchTerm, state.statusFilter, state.roleFilter]);

  const loadUsers = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const response = await apiUser.getUserList(
        state.page,
        state.rowsPerPage,
        state.searchTerm || undefined,
        state.statusFilter !== 'all' ? state.statusFilter : undefined,
        state.roleFilter !== 'all' ? state.roleFilter : undefined
      );

      if (response.success) {
        setState(prev => ({
          ...prev,
          users: response.data?.content || [],
          totalPages: response.data?.totalPages || 0,
          totalElements: response.data?.totalElements || 0,
          loading: false,
        }));
      } else {
        throw new Error(response.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Error loading users:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        snackbar: {
          open: true,
          message: 'Lỗi khi tải danh sách người dùng',
          severity: 'error',
        },
      }));
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchTerm: event.target.value, page: 0 }));
  };

  const handleStatusFilter = (event: any) => {
    setState(prev => ({ ...prev, statusFilter: event.target.value, page: 0 }));
  };

  const handleRoleFilter = (event: any) => {
    setState(prev => ({ ...prev, roleFilter: event.target.value, page: 0 }));
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, rowsPerPage: parseInt(event.target.value, 10), page: 0 }));
  };

  const handleAddUser = () => {
    setState(prev => ({ ...prev, addUserDialogOpen: true }));
  };

  const handleEditUser = (user: User) => {
    setState(prev => ({ ...prev, selectedUser: user, editDialogOpen: true }));
  };

  const handleDeleteUser = (user: User) => {
    setState(prev => ({ ...prev, selectedUser: user, deleteDialogOpen: true }));
  };

  const handleUserUpdated = () => {
    loadUsers();
    setState(prev => ({ ...prev, editDialogOpen: false, selectedUser: null }));
    showSnackbar('Cập nhật người dùng thành công', 'success');
  };

  const handleUserDeleted = () => {
    loadUsers();
    setState(prev => ({ ...prev, deleteDialogOpen: false, selectedUser: null }));
    showSnackbar('Xóa người dùng thành công', 'success');
  };

  const handleUserAdded = () => {
    loadUsers();
    setState(prev => ({ ...prev, addUserDialogOpen: false }));
    showSnackbar('Thêm người dùng thành công', 'success');
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      // TODO: Gọi API để thay đổi trạng thái người dùng
      showSnackbar(
        `Đã ${user.active ? 'khóa' : 'mở khóa'} người dùng ${user.fullName}`,
        'success'
      );
      await loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      showSnackbar('Lỗi khi thay đổi trạng thái người dùng', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
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

  // Tạo dữ liệu thống kê theo role
  const getCountsByRole = () => {
    const roleCounts = state.users.reduce((acc, user) => {
      user.roles?.forEach(role => {
        acc[role] = (acc[role] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(roleCounts).map(([role, count]) => ({
      role,
      count,
    }));
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <UserManagementHeader 
          onRefresh={loadUsers}
          onImport={() => showSnackbar('Tính năng nhập dữ liệu đang được phát triển', 'info')}
          onExport={() => showSnackbar('Tính năng xuất dữ liệu đang được phát triển', 'info')}
          onAddUser={handleAddUser}
          loading={state.loading}
        />
        
        <UserStatisticsCards 
          countsByRole={getCountsByRole()}
          totalUsers={state.totalElements}
        />

        <UserFilters
          searchTerm={state.searchTerm}
          statusFilter={state.statusFilter}
          roleFilter={state.roleFilter}
          onSearchChange={handleSearch}
          onStatusFilterChange={handleStatusFilter}
          onRoleFilterChange={handleRoleFilter}
          onClearFilters={() => {
            setState(prev => ({
              ...prev,
              searchTerm: '',
              statusFilter: 'all',
              roleFilter: 'all',
              page: 0,
            }));
          }}
        />

        <UsersTable
          users={state.users}
          loading={state.loading}
          page={state.page}
          rowsPerPage={state.rowsPerPage}
          totalElements={state.totalElements}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onToggleUserStatus={handleToggleUserStatus}
        />

        <AddUserModal
          open={state.addUserDialogOpen}
          onClose={() => setState(prev => ({ ...prev, addUserDialogOpen: false }))}
          onSave={async (userData: Partial<User>) => {
            try {
              // TODO: Gọi API để tạo người dùng mới
              // const response = await apiUser.createUser(userData);
              // if (response.success) {
              //   handleUserAdded();
              // }
              handleUserAdded();
            } catch (error) {
              console.error('Error creating user:', error);
              setState(prev => ({
                ...prev,
                snackbar: {
                  open: true,
                  message: 'Lỗi khi tạo người dùng mới',
                  severity: 'error',
                },
              }));
            }
          }}
        />

        <EditUserModal
          open={state.editDialogOpen}
          user={state.selectedUser}
          onClose={() => setState(prev => ({ ...prev, editDialogOpen: false, selectedUser: null }))}
          onSave={async (userData: Partial<User>) => {
            try {
              // TODO: Gọi API để cập nhật thông tin người dùng
              // const response = await apiUser.updateUser(userData);
              // if (response.success) {
              //   handleUserUpdated();
              // }
              handleUserUpdated();
            } catch (error) {
              console.error('Error updating user:', error);
              setState(prev => ({
                ...prev,
                snackbar: {
                  open: true,
                  message: 'Lỗi khi cập nhật thông tin người dùng',
                  severity: 'error',
                },
              }));
            }
          }}
        />

        <DeleteUserDialog
          open={state.deleteDialogOpen}
          user={state.selectedUser}
          onClose={() => setState(prev => ({ ...prev, deleteDialogOpen: false, selectedUser: null }))}
          onConfirm={handleUserDeleted}
        />

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
