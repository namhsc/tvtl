import React from 'react';
import { Container, Alert } from '@mui/material';

interface ProfileWelcomeMessageProps {
  isNewUser: boolean;
  welcomeMessage: string;
}

const ProfileWelcomeMessage: React.FC<ProfileWelcomeMessageProps> = ({
  isNewUser,
  welcomeMessage,
}) => {
  if (!isNewUser || !welcomeMessage) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Alert
        severity="success"
        sx={{
          mb: 2,
          borderRadius: 2,
          '& .MuiAlert-message': {
            fontSize: '1rem',
            fontWeight: 500,
          },
        }}
      >
        {welcomeMessage}
      </Alert>
    </Container>
  );
};

export default ProfileWelcomeMessage;
