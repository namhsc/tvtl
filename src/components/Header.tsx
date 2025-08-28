import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Menu,
  MenuItem,
  Divider,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Assessment,
  Person,
  Logout,
  Star,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { storageService } from '../services';
import logo from '../assets/logo.png';

// Component cho Logo
const Logo: React.FC = () => (
  <Typography
    variant="h6"
    component={Link}
    to="/"
    sx={{
      textDecoration: 'none',
      color: 'inherit',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
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
);

// Component cho Navigation Menu
const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const menuItems = [
    { text: 'Khảo sát', path: '/surveys', icon: <Assessment /> },
    { text: 'Chuyên gia', path: '/experts', icon: <Person /> },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {menuItems.map(item => (
        <Button
          key={item.text}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{
            color:
              location.pathname === item.path ? 'primary.main' : 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {item.text}
        </Button>
      ))}
    </Box>
  );
};

// Component cho Mobile Drawer
const MobileDrawer: React.FC<{
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  isAuthenticated: boolean;
}> = ({ mobileOpen, onDrawerToggle, isAuthenticated }) => {
  const location = useLocation();
  const menuItems = [
    { text: 'Khảo sát', path: '/surveys', icon: <Assessment /> },
    { text: 'Chuyên gia', path: '/experts', icon: <Person /> },
  ];

  const drawer = (
    <Box>
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={onDrawerToggle}
            sx={{
              color:
                location.pathname === item.path ? 'primary.main' : 'inherit',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        {/* Auth buttons for mobile */}
        {!isAuthenticated && (
          <>
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  width: '100%',
                }}
              >
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={onDrawerToggle}
                >
                  Đăng nhập
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onDrawerToggle}
                >
                  Đăng ký
                </Button>
              </Box>
            </ListItem>
          </>
        )}

        {/* User menu for mobile */}
        {isAuthenticated && (
          <>
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  width: '100%',
                }}
              >
                <Button
                  component={Link}
                  to="/expert-registration"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  startIcon={<Person />}
                  onClick={onDrawerToggle}
                >
                  Đăng ký làm chuyên gia
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<Logout />}
                  onClick={onDrawerToggle}
                >
                  Đăng xuất
                </Button>
              </Box>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 240,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

// Component cho Auth Buttons (Đăng ký/Đăng nhập)
const AuthButtons: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  if (isAuthenticated) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        color="primary"
        size="small"
      >
        Đăng nhập
      </Button>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        color="primary"
        size="small"
      >
        Đăng ký
      </Button>
    </Box>
  );
};

// Component cho User Menu
const UserMenu: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Lấy thông tin user từ storage
    const userInfo = storageService.getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
      // Refresh page để cập nhật state
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isAuthenticated) return null;

  const userName = user?.fullName || user?.phone;
  const userPoints = user?.point || 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* User Info Display */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        {userPoints > 0 && (
          <Chip
            icon={<Star sx={{ fontSize: 16 }} />}
            label={userPoints}
            size="small"
            color="warning"
            variant="outlined"
          />
        )}
      </Box>

      {/* Avatar Button */}
      <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
        <Avatar
          src={user?.avatar || undefined}
          sx={{
            width: 36,
            height: 36,
            mx: 'auto',
            mb: 0,
            border: '2px solid',
            borderColor: 'primary.main',
            bgcolor: 'white',
            color: !user?.avatar ? 'white' : 'transparent',
            fontSize: !user?.avatar ? 100 : 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!user?.avatar && (
            <Person sx={{ fontSize: 28, color: 'primary.main' }} />
          )}
        </Avatar>
      </IconButton>

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
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
            minWidth: 300,
            mt: 1,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            background: 'white',
          },
        }}
      >
        {/* User Profile Header */}
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleMenuClose}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            py: 2,
            px: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: '100%',
            }}
          >
            <Avatar
              src={user?.avatar || undefined}
              sx={{
                width: 36,
                height: 36,
                mx: 'auto',
                mb: 0,
                border: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'white',
                color: !user?.avatar ? 'white' : 'transparent',
                fontSize: !user?.avatar ? 100 : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!user?.avatar && (
                <Person sx={{ fontSize: 28, color: 'primary.main' }} />
              )}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  color: 'primary.main',
                  mb: 0.5,
                }}
              >
                {userName}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star
                  sx={{
                    fontSize: 20,
                    color: 'warning.main',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: 'warning.main',
                  }}
                >
                  {userPoints} điểm
                </Typography>
              </Box>
            </Box>
          </Box>
        </MenuItem>

        {/* Menu Items */}

        <MenuItem
          component={Link}
          to="/expert-registration"
          onClick={handleMenuClose}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Person sx={{ mr: 2, color: 'secondary.main' }} />
          <Typography sx={{ fontWeight: 500 }}>
            Đăng ký làm chuyên gia
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Logout sx={{ mr: 2, color: 'error.main' }} />
          <Typography sx={{ fontWeight: 500, color: 'error.main' }}>
            Đăng xuất
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

// Component cho Mobile Menu Button
const MobileMenuButton: React.FC<{
  onDrawerToggle: () => void;
}> = ({ onDrawerToggle }) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="start"
    onClick={onDrawerToggle}
  >
    <MenuIcon />
  </IconButton>
);

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // Kiểm tra authentication status
    const checkAuthStatus = () => {
      try {
        const accessToken = storageService.getAccessToken();
        const refreshToken = storageService.getRefreshToken();
        setIsAuthenticated(!!(accessToken && refreshToken));
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ bgcolor: 'white', color: 'text.primary' }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Logo />
            </Box>

            {isMobile ? (
              <MobileMenuButton onDrawerToggle={handleDrawerToggle} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <NavigationMenu />
                <AuthButtons isAuthenticated={isAuthenticated} />
                <UserMenu isAuthenticated={isAuthenticated} />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <MobileDrawer
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
};

export default Header;
