import React from 'react';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

interface ExpertAchievementsProps {
  achievements: string[];
}

const ExpertAchievements: React.FC<ExpertAchievementsProps> = ({
  achievements,
}) => {
  return (
    <Card sx={{ borderRadius: 3, gridColumn: { xs: '1', md: '1 / -1' } }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Thành tựu
        </Typography>
        <Stack spacing={2}>
          {achievements.map((achievement, index) => (
            <Box
              key={index}
              sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#0080FF',
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {achievement}
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ExpertAchievements;
