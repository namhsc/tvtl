import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Storage as StorageIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import AdminLayout from '../../components/admin/AdminLayout';

interface SystemSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;

  // Security Settings
  passwordMinLength: number;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;

  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;

  // Storage Settings
  maxFileSize: number;
  allowedFileTypes: string[];
  enableCloudStorage: boolean;
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'TVTL - Hệ thống Tư vấn Trực tuyến',
    siteDescription: 'Nền tảng tư vấn trực tuyến cho gia đình và trẻ em',
    maintenanceMode: false,
    allowRegistration: true,
    passwordMinLength: 8,
    requireEmailVerification: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maxFileSize: 10,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    enableCloudStorage: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    try {
      // TODO: Gọi API để lưu cài đặt
      console.log('Saving settings:', settings);
      showSnackbar('Đã lưu cài đặt thành công', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      showSnackbar('Lỗi khi lưu cài đặt', 'error');
    }
  };

  const handleResetSettings = () => {
    // TODO: Reset về cài đặt mặc định
    showSnackbar('Đã khôi phục cài đặt mặc định', 'info');
  };

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              ⚙️ Cài Đặt Hệ Thống
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Quản lý cấu hình và thiết lập hệ thống
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleResetSettings}
            >
              Khôi Phục Mặc Định
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Lưu Cài Đặt
            </Button>
          </Box>
        </Box>

        {/* Settings Sections */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
            },
            gap: 3,
          }}
        >
          {/* General Settings */}
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <SettingsIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Cài Đặt Chung
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Tên trang web"
                  value={settings.siteName}
                  onChange={e =>
                    handleSettingChange('siteName', e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Mô tả trang web"
                  multiline
                  rows={2}
                  value={settings.siteDescription}
                  onChange={e =>
                    handleSettingChange('siteDescription', e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.maintenanceMode}
                      onChange={e =>
                        handleSettingChange('maintenanceMode', e.target.checked)
                      }
                    />
                  }
                  label="Chế độ bảo trì"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.allowRegistration}
                      onChange={e =>
                        handleSettingChange(
                          'allowRegistration',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Cho phép đăng ký mới"
                />
              </Box>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <SecurityIcon color="error" />
                <Typography variant="h6" fontWeight="bold">
                  Cài Đặt Bảo Mật
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Độ dài mật khẩu tối thiểu"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={e =>
                    handleSettingChange(
                      'passwordMinLength',
                      parseInt(e.target.value)
                    )
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Thời gian timeout phiên (phút)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={e =>
                    handleSettingChange(
                      'sessionTimeout',
                      parseInt(e.target.value)
                    )
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Số lần đăng nhập tối đa"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={e =>
                    handleSettingChange(
                      'maxLoginAttempts',
                      parseInt(e.target.value)
                    )
                  }
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.requireEmailVerification}
                      onChange={e =>
                        handleSettingChange(
                          'requireEmailVerification',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Yêu cầu xác thực email"
                />
              </Box>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <NotificationsIcon color="info" />
                <Typography variant="h6" fontWeight="bold">
                  Cài Đặt Thông Báo
                </Typography>
              </Box>
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={e =>
                        handleSettingChange(
                          'emailNotifications',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Thông báo qua email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={e =>
                        handleSettingChange(
                          'smsNotifications',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Thông báo qua SMS"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={e =>
                        handleSettingChange(
                          'pushNotifications',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Thông báo đẩy"
                />
              </Box>
            </CardContent>
          </Card>

          {/* Storage Settings */}
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <StorageIcon color="success" />
                <Typography variant="h6" fontWeight="bold">
                  Cài Đặt Lưu Trữ
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Kích thước file tối đa (MB)"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={e =>
                    handleSettingChange('maxFileSize', parseInt(e.target.value))
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Loại file được phép"
                  value={settings.allowedFileTypes.join(', ')}
                  onChange={e =>
                    handleSettingChange(
                      'allowedFileTypes',
                      e.target.value.split(', ')
                    )
                  }
                  helperText="Các loại file được phân cách bằng dấu phẩy"
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.enableCloudStorage}
                      onChange={e =>
                        handleSettingChange(
                          'enableCloudStorage',
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="Sử dụng lưu trữ đám mây"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* System Status */}
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              🏥 Trạng Thái Hệ Thống
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 3,
              }}
            >
              <Box textAlign="center" p={2}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" color="success.main">
                  Hoạt Động Tốt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  API Server
                </Typography>
              </Box>
              <Box textAlign="center" p={2}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" color="success.main">
                  Hoạt Động Tốt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Database
                </Typography>
              </Box>
              <Box textAlign="center" p={2}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" color="success.main">
                  Hoạt Động Tốt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  File Storage
                </Typography>
              </Box>
              <Box textAlign="center" p={2}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" color="success.main">
                  Hoạt Động Tốt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email Service
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">⚙️ Cài Đặt Nâng Cao</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                },
                gap: 3,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Cài Đặt Cache
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Redis Cache"
                      secondary="Trạng thái: Hoạt động"
                    />
                    <Chip label="Enabled" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Memory Cache"
                      secondary="Trạng thái: Hoạt động"
                    />
                    <Chip label="Enabled" color="success" size="small" />
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Cài Đặt Log
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary="Log Level" secondary="INFO" />
                    <Chip label="INFO" color="primary" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary="Log Retention" secondary="30 ngày" />
                    <Chip label="30d" color="primary" size="small" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default SystemSettings;
