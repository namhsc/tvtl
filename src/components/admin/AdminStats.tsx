import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    totalExperts: number;
    totalSurveys: number;
    activeUsers: number;
    pendingExperts: number;
    completedSurveys: number;
  };
  onRefresh?: () => void;
  loading?: boolean;
}

const AdminStats: React.FC<AdminStatsProps> = ({
  stats,
  onRefresh,
  loading = false,
}) => {
  const statCards = [
    {
      title: 'Tổng Người Dùng',
      value: stats.totalUsers,
      icon: <PeopleIcon />,
      color: 'primary',
      description: 'Tổng số người dùng đã đăng ký',
      trend: '+12%',
      trendDirection: 'up',
      progress: 75,
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Tổng Chuyên Gia',
      value: stats.totalExperts,
      icon: <SchoolIcon />,
      color: 'secondary',
      description: 'Tổng số chuyên gia trong hệ thống',
      trend: '+8%',
      trendDirection: 'up',
      progress: 60,
      bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Tổng Khảo Sát',
      value: stats.totalSurveys,
      icon: <AssessmentIcon />,
      color: 'info',
      description: 'Tổng số khảo sát đã tạo',
      trend: '+15%',
      trendDirection: 'up',
      progress: 85,
      bgGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      title: 'Người Dùng Hoạt Động',
      value: stats.activeUsers,
      icon: <TrendingUpIcon />,
      color: 'success',
      description: 'Số người dùng đang hoạt động',
      trend: '+5%',
      trendDirection: 'up',
      progress: 90,
      bgGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      title: 'Chuyên Gia Chờ Duyệt',
      value: stats.pendingExperts,
      icon: <WarningIcon />,
      color: 'warning',
      description: 'Số chuyên gia đang chờ phê duyệt',
      trend: '-3%',
      trendDirection: 'down',
      progress: 25,
      bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      title: 'Khảo Sát Hoàn Thành',
      value: stats.completedSurveys,
      icon: <CheckCircleIcon />,
      color: 'success',
      description: 'Số khảo sát đã hoàn thành',
      trend: '+20%',
      trendDirection: 'up',
      progress: 95,
      bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    },
  ];

  const getColorValue = (color: string) => {
    switch (color) {
      case 'primary':
        return 'primary.main';
      case 'secondary':
        return 'secondary.main';
      case 'info':
        return 'info.main';
      case 'success':
        return 'success.main';
      case 'warning':
        return 'warning.main';
      case 'error':
        return 'error.main';
      default:
        return 'primary.main';
    }
  };

  return (
    <Box>
      {/* Header với nút refresh */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="text.primary"
            gutterBottom
          >
            📊 Thống Kê Tổng Quan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Theo dõi hiệu suất và tình trạng hệ thống
          </Typography>
        </Box>
        {onRefresh && (
          <Tooltip title="Làm mới dữ liệu">
            <IconButton
              onClick={onRefresh}
              disabled={loading}
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.main',
                p: 1.5,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'rotate(180deg)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {statCards.map((stat, index) => (
          <Box key={index}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                  '& .stat-icon': {
                    transform: 'scale(1.1) rotate(5deg)',
                  },
                  '& .stat-progress': {
                    width: '100%',
                  },
                },
                border: 'none',
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              {/* Background gradient overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: stat.bgGradient,
                }}
              />

              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    mb: 3,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h3"
                      component="div"
                      color={getColorValue(stat.color)}
                      fontWeight="bold"
                      sx={{ mb: 1, lineHeight: 1 }}
                    >
                      {stat.value.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight="600"
                      color="text.primary"
                      sx={{ mb: 1 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.5, mb: 2 }}
                    >
                      {stat.description}
                    </Typography>

                    {/* Progress bar */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Tiến độ
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="600"
                          color="text.primary"
                        >
                          {stat.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={stat.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            background: stat.bgGradient,
                          },
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Icon container */}
                  <Box
                    className="stat-icon"
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: stat.bgGradient,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 64,
                      minHeight: 64,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 3,
                        background: 'rgba(255,255,255,0.1)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      fontSize: 'large',
                      sx: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' },
                    })}
                  </Box>
                </Box>

                {/* Trend indicator */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Chip
                    icon={
                      stat.trendDirection === 'up' ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      )
                    }
                    label={stat.trend}
                    size="small"
                    color={stat.trendDirection === 'up' ? 'success' : 'error'}
                    variant="outlined"
                    sx={{
                      fontWeight: '600',
                      '& .MuiChip-icon': {
                        fontSize: '1rem',
                      },
                    }}
                  />

                  <Typography variant="caption" color="text.secondary">
                    So với tháng trước
                  </Typography>
                </Box>
              </CardContent>

              {/* Animated progress line */}
              <Box
                className="stat-progress"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: 3,
                  background: stat.bgGradient,
                  width: '0%',
                  transition: 'width 0.8s ease',
                }}
              />
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AdminStats;
