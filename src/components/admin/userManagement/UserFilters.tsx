import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

interface UserFiltersProps {
  searchTerm: string;
  statusFilter: string;
  roleFilter: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (event: any) => void;
  onRoleFilterChange: (event: any) => void;
  onClearFilters: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  statusFilter,
  roleFilter,
  onSearchChange,
  onStatusFilterChange,
  onRoleFilterChange,
  onClearFilters,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search term changes
  useEffect(() => {
    if (localSearchTerm !== searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        // Simulate the change event
        const event = {
          target: { value: localSearchTerm },
        } as React.ChangeEvent<HTMLInputElement>;
        onSearchChange(event);
        setIsSearching(false);
      }, 300); // 300ms delay

      return () => clearTimeout(timer);
    }
  }, [localSearchTerm, searchTerm, onSearchChange]);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    onClearFilters();
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== 'all' || roleFilter !== 'all';

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Tooltip title="Tìm kiếm sẽ tự động áp dụng sau khi bạn ngừng gõ">
            <TextField
              fullWidth
              label="Tìm kiếm"
              placeholder="Tên, số điện thoại, email..."
              value={localSearchTerm}
              onChange={handleSearchInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {isSearching && (
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                    )}
                    {localSearchTerm && (
                      <IconButton size="small" onClick={handleClearSearch}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Tooltip>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <FormControl fullWidth>
            <InputLabel>Vai trò</InputLabel>
            <Select
              value={roleFilter}
              label="Vai trò"
              onChange={onRoleFilterChange}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="STUDENT">Học sinh</MenuItem>
              <MenuItem value="PARENT">Phụ huynh</MenuItem>
              <MenuItem value="EXPERT">Chuyên gia</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={statusFilter}
              label="Trạng thái"
              onChange={onStatusFilterChange}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="active">Hoạt động</MenuItem>
              <MenuItem value="inactive">Bị khóa</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {hasActiveFilters && (
          <Box sx={{ flex: '0 0 auto' }}>
            <Tooltip title="Xóa tất cả bộ lọc">
              <IconButton
                onClick={onClearFilters}
                color="primary"
                size="small"
                sx={{
                  border: '1px solid',
                  borderColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default UserFilters;
