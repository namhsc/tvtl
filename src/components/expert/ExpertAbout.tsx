import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface ExpertAboutProps {
  fullDescription: string;
}

const ExpertAbout: React.FC<ExpertAboutProps> = ({ fullDescription }) => {
  return (
    <Card sx={{ borderRadius: 3, gridColumn: { xs: '1', md: '1 / -1' } }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Giới thiệu
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
          {fullDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExpertAbout;
