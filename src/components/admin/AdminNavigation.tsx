import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { storageService } from '../../services';
import logo from '../../assets/logo.png';

interface AdminNavigationProps {
  open: boolean;
  onClose: () => void;
  width: number;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({
  open,
  onClose,
  width,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/admin',
      description: 'Tổng quan hệ thống',
    },
    {
      title: 'Quản Lý Người Dùng',
      icon: <PeopleIcon />,
      path: '/admin/users',
      description: 'Quản lý tài khoản người dùng',
    },
    {
      title: 'Quản Lý Chuyên Gia',
      icon: <SchoolIcon />,
      path: '/admin/experts',
      description: 'Quản lý chuyên gia tư vấn',
    },
    {
      title: 'Quản Lý Khảo Sát',
      icon: <AssessmentIcon />,
      path: '/admin/surveys',
      description: 'Quản lý khảo sát và đánh giá',
    },
    {
      title: 'Cài Đặt Hệ Thống',
      icon: <SettingsIcon />,
      path: '/admin/settings',
      description: 'Cấu hình hệ thống',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleLogout = () => {
    storageService.clearAuth();
    navigate('/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          borderRight: '1px solid rgba(0, 128, 255, 0.1)',
          boxShadow: '4px 0 20px rgba(0, 128, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
          gap: 1,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            height: 48,
            width: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          }}
        />
      </Typography>

      {/* Navigation Menu */}
      <List sx={{ pt: 2 }}>
        <Divider sx={{ my: 2, mx: 2, borderColor: 'rgba(0, 128, 255, 0.1)' }} />

        {menuItems.map(item => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                background: isActive(item.path)
                  ? 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)'
                  : 'transparent',
                color: isActive(item.path) ? 'white' : 'text.primary',
                '&:hover': {
                  background: isActive(item.path)
                    ? 'linear-gradient(135deg, #0066CC 0%, #004499 100%)'
                    : 'linear-gradient(135deg, #F0F8FF 0%, #E3F2FD 100%)',
                  transform: 'translateX(4px)',
                  boxShadow: isActive(item.path)
                    ? '0 4px 12px rgba(0, 128, 255, 0.3)'
                    : '0 4px 12px rgba(0, 128, 255, 0.1)',
                },
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  boxShadow: '0 4px 12px rgba(0, 128, 255, 0.2)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 40,
                  filter: isActive(item.path)
                    ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    : 'none',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 700 : 600,
                  fontSize: '1rem',
                }}
                secondary={item.description}
                secondaryTypographyProps={{
                  fontSize: '0.8rem',
                  sx: {
                    opacity: isActive(item.path) ? 0.8 : 0.6,
                    color: isActive(item.path) ? 'white' : 'text.primary',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 2, mx: 2, borderColor: 'rgba(0, 128, 255, 0.1)' }} />

        {/* Logout Button */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A52 100%)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #EE5A52 0%, #D63031 100%)',
                transform: 'translateX(4px)',
                boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Đăng Xuất"
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Footer */}
      <Box
        sx={{
          mt: 'auto',
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 128, 255, 0.1)',
          background: 'rgba(248, 250, 252, 0.8)',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © 2025 TVTL Admin
        </Typography>
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Phiên bản 1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default AdminNavigation;
