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
      
      const response = await apiUser.getUsers({
        page: state.page,
        size: state.rowsPerPage,
        search: state.searchTerm || undefined,
        status: state.statusFilter !== 'all' ? state.statusFilter : undefined,
        role: state.roleFilter !== 'all' ? state.roleFilter : undefined,
      });

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

  const handleSearch = (searchTerm: string) => {
    setState(prev => ({ ...prev, searchTerm, page: 0 }));
  };

  const handleStatusFilter = (status: string) => {
    setState(prev => ({ ...prev, statusFilter: status, page: 0 }));
  };

  const handleRoleFilter = (role: string) => {
    setState(prev => ({ ...prev, roleFilter: role, page: 0 }));
  };

  const handlePageChange = (newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setState(prev => ({ ...prev, rowsPerPage: newRowsPerPage, page: 0 }));
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

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <UserManagementHeader onAddUser={handleAddUser} />
        
        <UserStatisticsCards 
          totalUsers={state.totalElements}
          activeUsers={state.users.filter(u => u.status === 'ACTIVE').length}
          pendingUsers={state.users.filter(u => u.status === 'PENDING').length}
          blockedUsers={state.users.filter(u => u.status === 'BLOCKED').length}
        />

        <UserFilters
          searchTerm={state.searchTerm}
          statusFilter={state.statusFilter}
          roleFilter={state.roleFilter}
          onSearch={handleSearch}
          onStatusFilter={handleStatusFilter}
          onRoleFilter={handleRoleFilter}
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
        />

        <AddUserModal
          open={state.addUserDialogOpen}
          onClose={() => setState(prev => ({ ...prev, addUserDialogOpen: false }))}
          onSuccess={handleUserAdded}
        />

        <EditUserModal
          open={state.editDialogOpen}
          user={state.selectedUser}
          onClose={() => setState(prev => ({ ...prev, editDialogOpen: false, selectedUser: null }))}
          onSuccess={handleUserUpdated}
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
