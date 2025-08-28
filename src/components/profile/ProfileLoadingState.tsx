import React from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

const ProfileLoadingState: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
      <CircularProgress size={60} />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
        Đang tải thông tin người dùng...
      </Typography>
    </Container>
  );
};

export default ProfileLoadingState;
