import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminStats from '../../components/admin/AdminStats';

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
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats({
        totalUsers: 1247,
        totalExperts: 89,
        totalSurveys: 156,
        activeUsers: 892,
        pendingExperts: 12,
        completedSurveys: 134,
        monthlyGrowth: 15,
        weeklyActiveUsers: 456,
      });

      setRecentActivities([
        {
          id: '1',
          type: 'USER_REGISTER',
          description: 'Người dùng mới đăng ký: Nguyễn Văn A',
          timestamp: '2 phút trước',
          status: 'SUCCESS',
          user: 'Nguyễn Văn A',
        },
        {
          id: '2',
          type: 'EXPERT_APPROVED',
          description: 'Chuyên gia được phê duyệt: Dr. Trần Thị B',
          timestamp: '15 phút trước',
          status: 'SUCCESS',
          user: 'Dr. Trần Thị B',
        },
        {
          id: '3',
          type: 'SURVEY_CREATED',
          description: 'Khảo sát mới được tạo: Đánh giá chất lượng dịch vụ',
          timestamp: '1 giờ trước',
          status: 'SUCCESS',
          user: 'Admin',
        },
        {
          id: '4',
          type: 'SYSTEM_UPDATE',
          description: 'Hệ thống được cập nhật thành công',
          timestamp: '2 giờ trước',
          status: 'SUCCESS',
          user: 'System',
        },
      ]);

      setSystemHealth([
        {
          service: 'API Gateway',
          status: 'HEALTHY',
          uptime: 99.9,
          responseTime: 45,
        },
        {
          service: 'Database',
          status: 'HEALTHY',
          uptime: 99.8,
          responseTime: 12,
        },
        {
          service: 'File Storage',
          status: 'WARNING',
          uptime: 98.5,
          responseTime: 89,
        },
        {
          service: 'Email Service',
          status: 'HEALTHY',
          uptime: 99.7,
          responseTime: 23,
        },
      ]);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
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
        return <SettingsIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getActivityStatusColor = (status: string) => {
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

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Tổng quan hệ thống và thống kê
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadDashboardData}
              disabled={loading}
            >
              Làm mới
            </Button>
            <Button
              variant="contained"
              startIcon={<SettingsIcon />}
              onClick={() => navigate('/admin/settings')}
              sx={{ px: 3 }}
            >
              Cài Đặt Hệ Thống
            </Button>
          </Box>
        </Box>

        {/* Statistics Cards */}
        <AdminStats
          stats={stats}
          onRefresh={loadDashboardData}
          loading={loading}
        />

        {/* Recent Activities */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Hoạt động gần đây
          </Typography>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              border: '1px solid rgba(0, 128, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
            }}
          >
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem
                    sx={{
                      px: 0,
                      py: 2,
                      '&:hover': {
                        bgcolor: 'action.hover',
                        borderRadius: 2,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: getActivityStatusColor(activity.status),
                        minWidth: 40,
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.description}
                      secondary={activity.timestamp}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '0.95rem',
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.85rem',
                      }}
                    />
                    <Chip
                      label={activity.status}
                      size="small"
                      color={getActivityStatusColor(activity.status) as any}
                      sx={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && (
                    <Divider sx={{ mx: 2 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* System Health */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tình trạng hệ thống
          </Typography>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              border: '1px solid rgba(0, 128, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
            }}
          >
            <Stack spacing={2}>
              {systemHealth.map((service, index) => (
                <Box
                  key={service.service}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={service.status}
                      size="small"
                      color={getHealthStatusColor(service.status) as any}
                      sx={{ fontWeight: 600, minWidth: 80 }}
                    />
                    <Typography variant="body2" fontWeight="500">
                      {service.service}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', minWidth: 80 }}>
                      <Typography variant="caption" color="text.secondary">
                        Uptime
                      </Typography>
                      <Typography variant="body2" fontWeight="600">
                        {service.uptime}%
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', minWidth: 80 }}>
                      <Typography variant="caption" color="text.secondary">
                        Response
                      </Typography>
                      <Typography variant="body2" fontWeight="600">
                        {service.responseTime}ms
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Quick Actions */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Thao tác nhanh
          </Typography>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              border: '1px solid rgba(0, 128, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 128, 255, 0.08)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                startIcon={<PeopleIcon />}
                onClick={() => navigate('/admin/users')}
                sx={{ px: 3 }}
              >
                Quản lý người dùng
              </Button>
              <Button
                variant="outlined"
                startIcon={<SchoolIcon />}
                onClick={() => navigate('/admin/experts')}
                sx={{ px: 3 }}
              >
                Quản lý chuyên gia
              </Button>
              <Button
                variant="outlined"
                startIcon={<AssessmentIcon />}
                onClick={() => navigate('/admin/surveys')}
                sx={{ px: 3 }}
              >
                Quản lý khảo sát
              </Button>
              <Button
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => navigate('/admin/settings')}
                sx={{ px: 3 }}
              >
                Cài đặt hệ thống
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
