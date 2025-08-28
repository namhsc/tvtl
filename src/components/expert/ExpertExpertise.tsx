import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';

interface ExpertExpertiseProps {
  expertise: string[];
}

const ExpertExpertise: React.FC<ExpertExpertiseProps> = ({ expertise }) => {
  return (
    <Card sx={{ borderRadius: 3, gridColumn: { xs: '1', md: '1 / -1' } }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Chuyên môn
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {expertise.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertExpertise;
