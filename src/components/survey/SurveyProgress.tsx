import React from 'react';
import { Box, Container, Typography, LinearProgress } from '@mui/material';

interface SurveyProgressProps {
  answeredQuestions: number;
  totalQuestions: number;
  progress: number;
  color: string;
}

const SurveyProgress: React.FC<SurveyProgressProps> = ({
  answeredQuestions,
  totalQuestions,
  progress,
  color,
}) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: 'white',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Tiến độ: {answeredQuestions}/{totalQuestions}
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {Math.round(progress)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: color,
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default SurveyProgress;
