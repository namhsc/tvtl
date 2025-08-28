import React from 'react';
import { Box, Container } from '@mui/material';
import ExpertAbout from './ExpertAbout';
import ExpertEducation from './ExpertEducation';
import ExpertExpertise from './ExpertExpertise';
import ExpertAchievements from './ExpertAchievements';
import { Expert } from './types';

interface ExpertContentProps {
  expert: Expert;
}

const ExpertContent: React.FC<ExpertContentProps> = ({ expert }) => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 4,
        }}
      >
        <ExpertAbout fullDescription={expert.fullDescription} />
        <ExpertEducation
          education={expert.education}
          certifications={expert.certifications}
        />
        <ExpertExpertise expertise={expert.expertise} />
        <ExpertAchievements achievements={expert.achievements} />
      </Box>
    </Container>
  );
};

export default ExpertContent;
