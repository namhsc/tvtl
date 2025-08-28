import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import backgroundImg from '../../assets/background.jpg';

interface ProfileHeroProps {
  isNewUser: boolean;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ isNewUser }) => {
  return (
    <Box
      sx={{
        color: 'white',
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, rgba(0, 128, 255, 0.9) 0%, rgba(0, 86, 204, 0.9) 50%, rgba(0, 68, 153, 0.9) 100%), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
          zIndex: 0,
        },
        '& > *': { position: 'relative', zIndex: 1 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
            sx={{
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              mb: 2,
            }}
          >
            {isNewUser ? 'Hoàn thiện hồ sơ cá nhân' : 'Hồ sơ người dùng'}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              lineHeight: 1.6,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            {isNewUser
              ? 'Vui lòng cung cấp thông tin cá nhân để hoàn tất hồ sơ của bạn'
              : 'Quản lý thông tin cá nhân và cập nhật hồ sơ của bạn'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileHero;
