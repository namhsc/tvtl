import React from 'react';
import { Container, Alert } from '@mui/material';

interface ProfileErrorStateProps {
  error: string;
}

const ProfileErrorState: React.FC<ProfileErrorStateProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        {error}
      </Alert>
    </Container>
  );
};

export default ProfileErrorState;
