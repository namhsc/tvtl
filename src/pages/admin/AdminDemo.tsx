import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminDemo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Demo Admin Panel">
      <Box>
        {/* Welcome Section */}
        <Paper sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            🎉 Chào Mừng Đến Với Admin Panel Mới!
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Giao diện Admin Panel đã được thiết kế lại hoàn toàn với layout hiện
            đại và trải nghiệm người dùng tốt hơn.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Hãy khám phá các tính năng mới và giao diện được cải tiến.
          </Typography>
        </Paper>

        {/* Feature Grid */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                🎯 Dashboard Mới
              </Typography>
              <Typography variant="body1" paragraph>
                Dashboard được thiết kế lại với:
              </Typography>
              <ul>
                <li>Statistics cards với trend indicators</li>
                <li>Quick actions cho navigation nhanh</li>
                <li>Recent activities timeline</li>
                <li>System health monitoring</li>
              </ul>
              <Button
                variant="contained"
                onClick={() => navigate('/admin')}
                sx={{ mt: 2 }}
              >
                Xem Dashboard
              </Button>
            </Paper>
          </Box>

          <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                👥 Quản Lý Người Dùng
              </Typography>
              <Typography variant="body1" paragraph>
                Giao diện quản lý người dùng mới với:
              </Typography>
              <ul>
                <li>Advanced filters và search</li>
                <li>Interactive table với pagination</li>
                <li>Bulk actions (import/export)</li>
                <li>Real-time status updates</li>
              </ul>
              <Button
                variant="contained"
                onClick={() => navigate('/admin/users')}
                sx={{ mt: 2 }}
              >
                Quản Lý Người Dùng
              </Button>
            </Paper>
          </Box>
        </Box>

        {/* Layout Features */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            🎨 Tính Năng Layout Mới
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Box textAlign="center" p={2}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Sidebar Cố Định
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Navigation menu luôn hiển thị trên desktop, tự động chuyển
                  sang drawer trên mobile
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Box textAlign="center" p={2}>
                <Typography variant="h6" color="success.main" gutterBottom>
                  Responsive Design
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tối ưu hóa cho mọi kích thước màn hình với breakpoints thông
                  minh
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Box textAlign="center" p={2}>
                <Typography variant="h6" color="info.main" gutterBottom>
                  Modern UI/UX
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sử dụng Material-UI v5 với design system nhất quán và
                  animations mượt mà
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Quick Navigation */}
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            🚀 Điều Hướng Nhanh
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin')}
                sx={{ py: 2 }}
              >
                Dashboard
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin/users')}
                sx={{ py: 2 }}
              >
                Users
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin/experts')}
                sx={{ py: 2 }}
              >
                Experts
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin/surveys')}
                sx={{ py: 2 }}
              >
                Surveys
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/admin/settings')}
                sx={{ py: 2 }}
              >
                Settings
              </Button>
            </Box>
            <Box sx={{ flex: '1 1 150px', minWidth: 0 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/dashboard')}
                sx={{ py: 2 }}
              >
                User Dashboard
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDemo;
