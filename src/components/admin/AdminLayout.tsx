import React, { useState } from 'react';
import {
  Box,
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
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png';

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
      text: 'Quản Lý Khảo Sát',
      icon: <AssessmentIcon />,
      path: '/admin/surveys',
      badge: 8,
      color: 'success',
    },

  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo và Title */}
          <Typography
        variant="h6"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          pt: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 40,
            width: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        />
      </Typography>



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
      {/* User Info */}
      <Box sx={{ p: 2}}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
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
        <MenuItem onClick={() => navigate('/admin/profile')}>
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
    </Box>
  );
};

export default AdminLayout;
