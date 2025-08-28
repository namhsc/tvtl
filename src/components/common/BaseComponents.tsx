import React, { Component, ReactNode } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  AlertTitle,
} from '@mui/material';
import { Close, Error, Info, Warning, CheckCircle } from '@mui/icons-material';

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  message = 'Đang tải...',
  fullScreen = false,
}) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 3,
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

// Empty State Component
interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  image?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Không có dữ liệu',
  message = 'Hiện tại không có dữ liệu để hiển thị',
  icon,
  action,
  image,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 2,
        textAlign: 'center',
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt="Empty state"
          sx={{
            width: 120,
            height: 120,
            mb: 2,
            opacity: 0.6,
          }}
        />
      )}
      {icon && (
        <Box
          sx={{
            fontSize: 64,
            color: 'text.secondary',
            mb: 2,
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      {action && action}
    </Box>
  );
};

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            px: 2,
            textAlign: 'center',
          }}
        >
          <Error sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error.main" gutterBottom>
            Đã xảy ra lỗi
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Vui lòng thử lại sau hoặc liên hệ hỗ trợ
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {this.state.error?.message}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Modal Component
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  actions?: ReactNode;
  closeOnBackdropClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  actions,
  closeOnBackdropClick = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={closeOnBackdropClick ? onClose : undefined}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 1,
          }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent sx={{ pt: title ? 0 : 2 }}>{children}</DialogContent>
      {actions && (
        <DialogActions sx={{ px: 3, pb: 2 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
};

// Alert Component
interface AlertMessageProps {
  severity?: 'error' | 'warning' | 'info' | 'success';
  title?: string;
  message: string;
  onClose?: () => void;
  action?: ReactNode;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  severity = 'info',
  title,
  message,
  onClose,
  action,
}) => {
  const getIcon = () => {
    switch (severity) {
      case 'error':
        return <Error />;
      case 'warning':
        return <Warning />;
      case 'success':
        return <CheckCircle />;
      default:
        return <Info />;
    }
  };

  return (
    <Alert
      severity={severity}
      onClose={onClose}
      action={action}
      icon={getIcon()}
      sx={{
        borderRadius: 2,
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
};

// Skeleton Loading Component
interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}) => {
  return (
    <Box
      sx={{
        width: width || '100%',
        height: height || 20,
        backgroundColor: 'grey.200',
        borderRadius: variant === 'circular' ? '50%' : 1,
        animation: `${animation} 1.5s ease-in-out infinite`,
        '@keyframes pulse': {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.4,
          },
          '100%': {
            opacity: 1,
          },
        },
        '@keyframes wave': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      }}
    />
  );
};
