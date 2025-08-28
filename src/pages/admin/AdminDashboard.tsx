import React, { useState, useEffect } from 'react';
import {
  Box,
<<<<<<< HEAD
  Card,
  CardContent,
=======
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Divider,
  LinearProgress,
  Avatar,
  Stack,
} from '@mui/material';

import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
<<<<<<< HEAD
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  Dashboard as DashboardIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
=======
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminStats from '../../components/admin/AdminStats';
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150

interface DashboardStats {
  totalUsers: number;
  totalExperts: number;
  totalSurveys: number;
  activeUsers: number;
  pendingExperts: number;
  completedSurveys: number;
  monthlyGrowth: number;
  weeklyActiveUsers: number;
}

interface RecentActivity {
  id: string;
  type:
    | 'USER_REGISTER'
    | 'EXPERT_APPROVED'
    | 'SURVEY_CREATED'
    | 'SYSTEM_UPDATE';
  description: string;
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'ERROR';
  user?: string;
}

interface SystemHealth {
  service: string;
  status: 'HEALTHY' | 'WARNING' | 'ERROR';
  uptime: number;
  responseTime: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalExperts: 0,
    totalSurveys: 0,
    activeUsers: 0,
    pendingExperts: 0,
    completedSurveys: 0,
    monthlyGrowth: 0,
    weeklyActiveUsers: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    []
  );
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data - thay thế bằng API call thực tế
      setStats({
        totalUsers: 1250,
        totalExperts: 89,
        totalSurveys: 45,
        activeUsers: 890,
        pendingExperts: 12,
        completedSurveys: 38,
        monthlyGrowth: 15.2,
        weeklyActiveUsers: 456,
      });

      setRecentActivities([
        {
          id: '1',
          type: 'USER_REGISTER',
          description: 'Người dùng mới đăng ký',
          timestamp: new Date().toISOString(),
          status: 'SUCCESS',
          user: '0123456789',
        },
        {
          id: '2',
          type: 'EXPERT_APPROVED',
          description: 'Chuyên gia được phê duyệt',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'SUCCESS',
          user: 'Nguyễn Văn A',
        },
        {
          id: '3',
          type: 'SURVEY_CREATED',
          description: 'Khảo sát mới được tạo',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'SUCCESS',
          user: 'Khảo sát về giáo dục',
        },
        {
          id: '4',
          type: 'SYSTEM_UPDATE',
          description: 'Cập nhật hệ thống hoàn tất',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          status: 'SUCCESS',
        },
      ]);

      setSystemHealth([
        {
          service: 'API Server',
          status: 'HEALTHY',
          uptime: 99.9,
          responseTime: 120,
        },
        {
          service: 'Database',
          status: 'HEALTHY',
          uptime: 99.8,
          responseTime: 45,
        },
        {
          service: 'File Storage',
          status: 'WARNING',
          uptime: 98.5,
          responseTime: 200,
        },
        {
          service: 'Email Service',
          status: 'HEALTHY',
          uptime: 99.7,
          responseTime: 80,
        },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'ERROR':
        return 'error';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'USER_REGISTER':
        return <PeopleIcon />;
      case 'EXPERT_APPROVED':
        return <SchoolIcon />;
      case 'SURVEY_CREATED':
        return <AssessmentIcon />;
      case 'SYSTEM_UPDATE':
        return <DashboardIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

<<<<<<< HEAD
  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return 'success';
      case 'WARNING':
        return 'warning';
      case 'ERROR':
        return 'error';
      default:
        return 'default';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':
        return <CheckCircleIcon />;
      case 'WARNING':
        return <WarningIcon />;
      case 'ERROR':
        return <ErrorIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    subtitle?: string;
    icon: React.ReactNode;
    color: string;
    trend?: number;
    onClick?: () => void;
  }> = ({ title, value, subtitle, icon, color, trend, onClick }) => (
    <Card
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        height: '100%',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        border: '1px solid rgba(0, 128, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
        '&:hover': onClick
          ? {
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 40px rgba(0, 128, 255, 0.15)',
              border: '1px solid rgba(0, 128, 255, 0.2)',
            }
          : {},
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${color}.light 0%, ${color}.main 100%)`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              boxShadow: `0 4px 15px rgba(0, 128, 255, 0.2)`,
            }}
          >
            {icon}
          </Box>
          {trend !== undefined && (
            <Box display="flex" alignItems="center" gap={0.5}>
              {trend > 0 ? (
                <ArrowUpwardIcon color="success" fontSize="small" />
              ) : (
                <ArrowDownwardIcon color="error" fontSize="small" />
              )}
              <Typography
                variant="caption"
                color={trend > 0 ? 'success.main' : 'error.main'}
                fontWeight="bold"
              >
                {Math.abs(trend)}%
              </Typography>
            </Box>
          )}
        </Box>
        <Typography
          variant="h4"
          component="div"
          sx={{
            background: `linear-gradient(135deg, ${color}.main 0%, ${color}.dark 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            mb: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {value.toLocaleString()}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          gutterBottom
          sx={{ fontWeight: 600, mb: 0.5 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ opacity: 0.8 }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <AdminLayout title="Bảng Điều Khiển">
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Bảng Điều Khiển">
      <Box>
=======
  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              🎯 Bảng Điều Khiển
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Chào mừng trở lại! Đây là tổng quan hệ thống của bạn
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Tooltip title="Làm mới dữ liệu">
              <IconButton
                onClick={loadDashboardData}
                disabled={loading}
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/admin/settings')}
              sx={{ px: 3 }}
            >
              Cài Đặt Hệ Thống
            </Button>
          </Box>
        </Box>

        {/* Statistics Cards */}
<<<<<<< HEAD
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <StatCard
              title="Tổng Người Dùng"
              value={stats.totalUsers}
              subtitle="Tăng 12% so với tháng trước"
              icon={<PeopleIcon />}
              color="primary"
              trend={12}
              onClick={() => navigate('/admin/users')}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <StatCard
              title="Tổng Chuyên Gia"
              value={stats.totalExperts}
              subtitle="8 chuyên gia mới trong tuần"
              icon={<SchoolIcon />}
              color="secondary"
              trend={8}
              onClick={() => navigate('/admin/experts')}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <StatCard
              title="Tổng Khảo Sát"
              value={stats.totalSurveys}
              subtitle="3 khảo sát mới"
              icon={<AssessmentIcon />}
              color="info"
              trend={3}
              onClick={() => navigate('/admin/surveys')}
            />
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <StatCard
              title="Người Dùng Hoạt Động"
              value={stats.activeUsers}
              subtitle="71% tổng số người dùng"
              icon={<TrendingUpIcon />}
              color="success"
              trend={stats.monthlyGrowth}
            />
          </Box>
        </Box>
=======
        <AdminStats
          stats={stats}
          onRefresh={loadDashboardData}
          loading={loading}
        />
>>>>>>> f717baaa4be23e0c7a3206f9034c0913d4b47150

        {/* Additional Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid rgba(0, 128, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 128, 255, 0.12)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: 'warning.light',
                      color: 'warning.main',
                      background:
                        'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                      boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
                    }}
                  >
                    <SchoolIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="warning.main"
                    >
                      {stats.pendingExperts}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chuyên gia chờ duyệt
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid rgba(0, 128, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 128, 255, 0.12)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: 'success.light',
                      color: 'success.main',
                      background:
                        'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    <AssessmentIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                    >
                      {stats.completedSurveys}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Khảo sát hoàn thành
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid rgba(0, 128, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 128, 255, 0.12)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: 'info.light',
                      color: 'info.main',
                      background:
                        'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                      boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                    }}
                  >
                    <TrendingUpIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="info.main"
                    >
                      {stats.weeklyActiveUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Người dùng tuần này
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid rgba(0, 128, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 128, 255, 0.12)',
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      background:
                        'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
                      boxShadow: '0 4px 15px rgba(0, 128, 255, 0.3)',
                    }}
                  >
                    <PeopleIcon />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {Math.round((stats.activeUsers / stats.totalUsers) * 100)}
                      %
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tỷ lệ hoạt động
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Main Content Grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Quick Actions */}
          <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                🚀 Hành Động Nhanh
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<PeopleIcon />}
                  onClick={() => navigate('/admin/users')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Quản Lý Người Dùng
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SchoolIcon />}
                  onClick={() => navigate('/admin/experts')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Quản Lý Chuyên Gia
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AssessmentIcon />}
                  onClick={() => navigate('/admin/surveys')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Quản Lý Khảo Sát
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DashboardIcon />}
                  onClick={() => navigate('/admin/settings')}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                >
                  Cài Đặt Hệ Thống
                </Button>
              </Stack>
            </Paper>
          </Box>

          {/* Recent Activities */}
          <Box sx={{ flex: '1 1 600px', minWidth: 0 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                📊 Hoạt Động Gần Đây
              </Typography>
              <List dense>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon
                        sx={{ color: 'primary.main', minWidth: 40 }}
                      >
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body2" fontWeight="medium">
                              {activity.description}
                            </Typography>
                            {activity.user && (
                              <Chip
                                label={activity.user}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            )}
                          </Box>
                        }
                        secondary={new Date(activity.timestamp).toLocaleString(
                          'vi-VN'
                        )}
                      />
                      <Chip
                        label={activity.status}
                        size="small"
                        color={getStatusColor(activity.status) as any}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>

        {/* System Health */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            🏥 Tình Trạng Hệ Thống
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {systemHealth.map((service, index) => (
              <Box sx={{ flex: '1 1 300px', minWidth: 0 }} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: `${getHealthStatusColor(service.status)}.light`,
                          color: `${getHealthStatusColor(service.status)}.main`,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {getHealthStatusIcon(service.status)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {service.service}
                        </Typography>
                        <Chip
                          label={service.status}
                          size="small"
                          color={getHealthStatusColor(service.status) as any}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Uptime: {service.uptime}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Response: {service.responseTime}ms
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
