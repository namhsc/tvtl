import React, { useState } from 'react';
import {
  Box,
<<<<<<< HEAD
  AppBar,
  Toolbar,
  Typography,
  IconButton,
=======
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
  Avatar,
  Menu,
  MenuItem,
  Badge,
<<<<<<< HEAD
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import { storageService } from '../../services';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title = 'Admin Panel',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = storageService.getUserInfo();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/admin/profile');
  };

  const handleSettings = () => {
    handleMenuClose();
    navigate('/admin/settings');
  };

  const handleLogout = () => {
    handleMenuClose();
    storageService.clearAuth();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <AdminNavigation
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        width={280}
      />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Modern AppBar với gradient */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
            color: 'white',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
                sx={{
                  display: { md: 'none' },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box display="flex" alignItems="center" gap={1}>
                <AdminIcon
                  sx={{
                    fontSize: 28,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    background:
                      'linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                color="inherit"
                size="large"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                size="large"
                sx={{
                  ml: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background:
                      'linear-gradient(135deg, #FFFFFF 0%, #E3F2FD 100%)',
                    color: '#0056CC',
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  {user?.fullName?.charAt(0) || user?.phone?.charAt(0) || 'A'}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="primary.main"
            >
              {user?.fullName || 'Admin User'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.phone || 'admin@example.com'}
            </Typography>
          </Box>
          <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
            <AccountCircleIcon sx={{ mr: 2, color: 'primary.main' }} /> Hồ sơ
          </MenuItem>
          <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
            <SettingsIcon sx={{ mr: 2, color: 'primary.main' }} /> Cài đặt
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
            <LogoutIcon sx={{ mr: 2, color: 'error.main' }} /> Đăng xuất
          </MenuItem>
        </Menu>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            minHeight: 'calc(100vh - 64px)',
            bgcolor: '#f8fafc',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          }}
        >
          {children}
        </Box>
      </Box>
=======
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  Close as CloseIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] =
    useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin',
      badge: null,
      color: 'primary',
    },
    {
      text: 'Quản Lý Người Dùng',
      icon: <PeopleIcon />,
      path: '/admin/users',
      badge: 12,
      color: 'info',
    },
    {
      text: 'Quản Lý Chuyên Gia',
      icon: <SchoolIcon />,
      path: '/admin/experts',
      badge: 5,
      color: 'warning',
    },
    {
      text: 'Quản Lý Khảo Sát',
      icon: <AssessmentIcon />,
      path: '/admin/surveys',
      badge: 8,
      color: 'success',
    },
    {
      text: 'Cài Đặt Hệ Thống',
      icon: <SettingsIcon />,
      path: '/admin/settings',
      badge: null,
      color: 'secondary',
    },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo và Title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          minHeight: 80,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
            🚀 ADMIN PANEL
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Quản lý hệ thống
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        )}
        {/* Background decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
          }}
        />
      </Box>

      {/* User Info */}
      <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            bgcolor: 'white',
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: 'primary.main',
              mr: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {user?.phone?.charAt(0)?.toUpperCase() || 'A'}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle1" fontWeight="600" noWrap>
              {user?.phone || 'Admin'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.roles?.join(', ') || 'Administrator'}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleProfileMenuOpen}
            sx={{ color: 'primary.main' }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ pt: 1, flex: 1 }}>
        {menuItems.map(item => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                borderRadius: 2,
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: `${item.color}.light`,
                  color: `${item.color}.main`,
                  '&:hover': {
                    bgcolor: `${item.color}.light`,
                  },
                  '& .MuiListItemIcon-root': {
                    color: `${item.color}.main`,
                  },
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? 'inherit'
                      : 'text.secondary',
                  minWidth: 40,
                  transition: 'color 0.2s ease',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? '600' : '500',
                  fontSize: '0.95rem',
                }}
              />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color={item.color as any}
                  sx={{
                    minWidth: 24,
                    height: 24,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Bottom Actions */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'grey.50',
          }}
        >
          <Tooltip title="Thông báo">
            <IconButton
              size="small"
              onClick={handleNotificationsOpen}
              sx={{ color: 'text.secondary' }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Đăng xuất">
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{ color: 'error.main' }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: 3,
              bgcolor: 'white',
            },
          }}
          open
        >
          {drawer}
        </Drawer>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={open && isMobile}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: 3,
              bgcolor: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'grey.50',
        }}
      >
        {/* Mobile Header */}
        {isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              bgcolor: 'white',
              boxShadow: 1,
              mb: 2,
            }}
          >
            <IconButton onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="600">
              {menuItems.find(item => item.path === location.pathname)?.text ||
                'Admin Panel'}
            </Typography>
          </Box>
        )}

        {children}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            boxShadow: 3,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          Hồ sơ cá nhân
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Đăng xuất
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 300,
            maxHeight: 400,
            boxShadow: 3,
            borderRadius: 2,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight="600">
            Thông báo
          </Typography>
        </Box>
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="body2" fontWeight="500">
              Người dùng mới đăng ký
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2 phút trước
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="body2" fontWeight="500">
              Chuyên gia cần phê duyệt
            </Typography>
            <Typography variant="caption" color="text.secondary">
              15 phút trước
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography variant="body2" fontWeight="500">
              Khảo sát mới được tạo
            </Typography>
            <Typography variant="caption" color="text.secondary">
              1 giờ trước
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
    </Box>
  );
};

export default AdminLayout;
