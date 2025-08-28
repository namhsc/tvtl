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
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

// Data Table Component
interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  page: number;
  rowsPerPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  loading?: boolean;
  actions?: (row: any) => React.ReactNode;
  onRowClick?: (row: any) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  page,
  rowsPerPage,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  actions,
  onRowClick,
}) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: 'background.paper',
                    fontWeight: 600,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions && <TableCell align="center">Thao tác</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                  <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (actions ? 1 : 0)}
                  align="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': onRowClick
                      ? { backgroundColor: 'action.hover' }
                      : {},
                  }}
                >
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell align="center">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`
        }
      />
    </Paper>
  );
};

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = '#0080FF',
  onClick,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        '&:hover': onClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            }
          : {},
        border: `1px solid ${color}20`,
        background: `linear-gradient(135deg, ${color}08 0%, ${color}02 100%)`,
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          {value}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subtitle}
          </Typography>
        )}

        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend.isPositive ? (
              <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />
            )}
            <Typography
              variant="caption"
              color={trend.isPositive ? 'success.main' : 'error.main'}
              sx={{ fontWeight: 600 }}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// Progress Card Component
interface ProgressCardProps {
  title: string;
  value: number;
  maxValue: number;
  subtitle?: string;
  color?: string;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  value,
  maxValue,
  subtitle,
  color = '#0080FF',
  showPercentage = true,
  size = 'medium',
}) => {
  const percentage = Math.round((value / maxValue) * 100);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { p: 2, '& .MuiTypography-h6': { fontSize: '1.1rem' } };
      case 'large':
        return { p: 4, '& .MuiTypography-h6': { fontSize: '1.5rem' } };
      default:
        return { p: 3 };
    }
  };

  return (
    <Card sx={{ height: '100%', ...getSizeStyles() }}>
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {showPercentage && (
            <Typography
              variant="h6"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              {percentage}%
            </Typography>
          )}
        </Box>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}

        <Box sx={{ mb: 1 }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: `${color}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
                borderRadius: 4,
              },
            }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          {value} / {maxValue}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Data Grid Component
interface DataGridProps {
  data: any[];
  columns: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  spacing?: number;
}

export const DataGrid: React.FC<DataGridProps> = ({
  data,
  columns,
  renderItem,
  loading = false,
  emptyMessage = 'Không có dữ liệu',
  spacing = 2,
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: spacing }}>
        {Array.from({ length: columns * 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              flex: `1 1 ${100 / columns}%`,
              minWidth: `${100 / columns}%`,
              height: 200,
              backgroundColor: 'grey.100',
              borderRadius: 2,
            }}
          />
        ))}
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: spacing }}>
      {data.map((item, index) => (
        <Box
          key={index}
          sx={{
            flex: `1 1 ${100 / columns}%`,
            minWidth: `${100 / columns}%`,
          }}
        >
          {renderItem(item, index)}
        </Box>
      ))}
    </Box>
  );
};

// Action Buttons Component
interface ActionButtonsProps {
  actions: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    disabled?: boolean;
  }[];
  size?: 'small' | 'medium' | 'large';
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  actions,
  size = 'small',
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {actions.map((action, index) => (
        <Tooltip key={index} title={action.label}>
          <IconButton
            size={size}
            onClick={action.onClick}
            disabled={action.disabled}
            color={action.color}
            sx={{
              '&:hover': {
                backgroundColor: `${action.color || 'primary'}.light`,
              },
            }}
          >
            {action.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};
