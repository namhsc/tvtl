import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Alert,
  Button,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import Header from './Header';
import { AdminNavigation } from './admin';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showHeader?: boolean;
  isAdminPage?: boolean;
  successMessage?: string;
  onSuccessClose?: () => void;
  sx?: any;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  children,
  maxWidth = 'md',
  showHeader = true,
  isAdminPage = false,
  successMessage,
  onSuccessClose,
  sx,
}) => {
  const [adminNavOpen, setAdminNavOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {showHeader && <Header />}

      {/* Admin App Bar */}
      {isAdminPage && (
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setAdminNavOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <AdminIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Admin Navigation */}
      {isAdminPage && (
        <AdminNavigation
          open={adminNavOpen}
          onClose={() => setAdminNavOpen(false)}
          width={280}
        />
      )}

      <Container maxWidth={maxWidth} sx={{ py: { xs: 4, md: 8 }, ...sx }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>

          {successMessage && (
            <Alert
              severity="success"
              sx={{ mb: 3 }}
              action={
                onSuccessClose && (
                  <Button color="inherit" size="small" onClick={onSuccessClose}>
                    Đóng
                  </Button>
                )
              }
            >
              {successMessage}
            </Alert>
          )}

          {children}
        </Paper>
      </Container>
    </Box>
  );
};

export default PageLayout;
