import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import { School, EmojiEvents } from '@mui/icons-material';

interface ExpertEducationProps {
  education: string[];
  certifications: string[];
}

const ExpertEducation: React.FC<ExpertEducationProps> = ({
  education,
  certifications,
}) => {
  return (
    <Card sx={{ borderRadius: 3, gridColumn: { xs: '1', md: '1 / -1' } }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Học vấn & Chứng chỉ
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <School /> Học vấn
          </Typography>
          <Stack spacing={1}>
            {education.map((edu, index) => (
              <Typography key={index} variant="body1" sx={{ pl: 2 }}>
                • {edu}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <EmojiEvents /> Chứng chỉ
          </Typography>
          <Stack spacing={1}>
            {certifications.map((cert, index) => (
              <Typography key={index} variant="body1" sx={{ pl: 2 }}>
                • {cert}
              </Typography>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpertEducation;
