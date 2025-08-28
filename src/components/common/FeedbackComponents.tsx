import React from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Rating,
  Typography,
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  Close,
  Notifications,
} from '@mui/icons-material';

// Toast Component
interface ToastProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
  action?: React.ReactNode;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

export const Toast: React.FC<ToastProps> = ({
  open,
  message,
  severity = 'info',
  duration = 6000,
  onClose,
  action,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
}) => {
  const getIcon = () => {
    switch (severity) {
      case 'success':
        return <CheckCircle />;
      case 'error':
        return <Error />;
      case 'warning':
        return <Warning />;
      default:
        return <Info />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      sx={{
        '& .MuiSnackbarContent-root': {
          borderRadius: 2,
          minWidth: 300,
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        icon={getIcon()}
        action={action}
        sx={{
          width: '100%',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

// Confirm Dialog Component
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  severity?: 'info' | 'warning' | 'error';
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  severity = 'info',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  const getIcon = () => {
    switch (severity) {
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pb: 1,
        }}
      >
        {getIcon()}
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Box
          component="button"
          onClick={onCancel}
          disabled={loading}
          sx={{
            px: 3,
            py: 1,
            border: '1px solid #ccc',
            borderRadius: 2,
            backgroundColor: 'white',
            color: 'text.primary',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          {cancelText}
        </Box>
        <Box
          component="button"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            px: 3,
            py: 1,
            border: 'none',
            borderRadius: 2,
            backgroundColor:
              severity === 'error' ? 'error.main' : 'primary.main',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
            '&:hover': {
              backgroundColor:
                severity === 'error' ? 'error.dark' : 'primary.dark',
            },
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          }}
        >
          {loading ? 'Đang xử lý...' : confirmText}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

// Enhanced Rating Component
interface EnhancedRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  precision?: number;
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
  showValue?: boolean;
  color?: string;
}

export const EnhancedRating: React.FC<EnhancedRatingProps> = ({
  value,
  onChange,
  max = 5,
  precision = 0.5,
  size = 'medium',
  readOnly = false,
  showValue = false,
  color = '#FFD700',
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        value={value}
        onChange={(_, newValue) => onChange(newValue || 0)}
        max={max}
        precision={precision}
        size={size}
        readOnly={readOnly}
        sx={{
          '& .MuiRating-iconFilled': {
            color: color,
          },
          '& .MuiRating-iconHover': {
            color: color,
          },
        }}
      />
      {showValue && (
        <Typography variant="body2" color="text.secondary">
          {value}/{max}
        </Typography>
      )}
    </Box>
  );
};

// Notification Center Component
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
  open: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  maxHeight?: number;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  open,
  onClose,
  onMarkAllAsRead,
  onDelete,
  maxHeight = 400,
}) => {
  const theme = useTheme();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'error':
        return <Error color="error" />;
      case 'warning':
        return <Warning color="warning" />;
      default:
        return <Info color="info" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 64,
        right: 16,
        width: 360,
        maxHeight: maxHeight,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: theme.shadows[8],
        border: `1px solid ${theme.palette.divider}`,
        zIndex: 1300,
        display: open ? 'block' : 'none',
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge badgeContent={unreadCount} color="error">
            <Notifications />
          </Badge>
          <Typography variant="h6">Thông báo</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {unreadCount > 0 && (
            <Typography
              variant="caption"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={onMarkAllAsRead}
            >
              Đánh dấu đã đọc
            </Typography>
          )}
          <IconButton size="small" onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ maxHeight: maxHeight - 80, overflow: 'auto' }}>
        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Không có thông báo mới
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    backgroundColor: notification.read
                      ? 'transparent'
                      : 'action.hover',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'transparent' }}>
                      {getIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: notification.read ? 400 : 600 }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(notification.timestamp)}
                          </Typography>
                          {notification.action && (
                            <Typography
                              variant="caption"
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              onClick={notification.action.onClick}
                            >
                              {notification.action.label}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={() => onDelete(notification.id)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};
