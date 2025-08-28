import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  School as SchoolIcon,
  FamilyRestroom as FamilyIcon,
  Psychology as ExpertIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

interface UserStatisticsCardsProps {
  countsByRole: {
    role: string;
    count: number;
  }[];
  totalUsers: number;
}

const UserStatisticsCards: React.FC<UserStatisticsCardsProps> = ({
  countsByRole,
}) => {
  // Ensure users is always an array
  const usersArray = Array.isArray(countsByRole) ? countsByRole : [];

  const totalUsers = usersArray.length;
  const activeUsers = usersArray.filter(u => u.role === 'STUDENT').length;
  const blockedUsers = usersArray.filter(u => u.role === 'STUDENT').length;
  const numberOfStudents = usersArray.filter(u => u.role === 'STUDENT').length;
  const numberOfParents = usersArray.filter(u => u.role === 'PARENT').length;
  const numberOfExperts = usersArray.filter(u => u.role === 'EXPERT').length;

  const stats = [
    {
      title: 'Tổng Người Dùng',
      value: totalUsers,
      color: '#6366F1',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      icon: TrendingIcon,
      bgColor: 'rgba(99, 102, 241, 0.1)',
    },
    {
      title: 'Học sinh',
      value: numberOfStudents,
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      icon: SchoolIcon,
      bgColor: 'rgba(16, 185, 129, 0.1)',
    },
    {
      title: 'Phụ huynh',
      value: numberOfParents,
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      icon: FamilyIcon,
      bgColor: 'rgba(245, 158, 11, 0.1)',
    },
    {
      title: 'Chuyên gia',
      value: numberOfExperts,
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      icon: ExpertIcon,
      bgColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      title: 'Hoạt Động',
      value: activeUsers,
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
      icon: CheckCircleIcon,
      bgColor: 'rgba(5, 150, 105, 0.1)',
    },
    {
      title: 'Người Dùng Bị Khóa',
      value: blockedUsers,
      color: '#DC2626',
      gradient: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
      icon: BlockIcon,
      bgColor: 'rgba(220, 38, 38, 0.1)',
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(6, 1fr)',
          },
          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
              border: `1px solid ${stat.bgColor}`,
              borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="flex-start" gap={2.5}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="h3"
                    color={stat.color}
                    fontWeight="700"
                    sx={{
                      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {stat.value.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.primary"
                    fontWeight="600"
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      mb: 0.5,
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default UserStatisticsCards;
