import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';

interface SurveyHeroProps {
  title: string;
  subtitle?: string;
  gradient: string;
}

const SurveyHero: React.FC<SurveyHeroProps> = ({
  title,
  subtitle,
  gradient,
}) => {
  return (
    <Box
      sx={{
        background: gradient,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          filter: 'blur(4px)',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 6, md: 8 }, position: 'relative' }}
      >
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SurveyHero;
