import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowBack, Star, VerifiedUser } from '@mui/icons-material';
import backgroundImg from '../../assets/background.jpg';
import { Expert } from './types';

interface ExpertHeroProps {
  expert: Expert;
  isAuthenticated: boolean;
}

const ExpertHero: React.FC<ExpertHeroProps> = ({ expert, isAuthenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        py: { xs: 6, md: 8 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: `linear-gradient(135deg, rgba(0, 128, 255, 0.85) 0%, rgba(0, 86, 204, 0.85) 50%, rgba(0, 68, 153, 0.85) 100%), url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
        },
        '& > *': { position: 'relative', zIndex: 1 },
      }}
    >
      <Container maxWidth="lg">
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBack />}
          sx={{
            color: 'white',
            mb: 4,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          Quay lại trang chủ
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 3, md: 6 },
            flexWrap: 'wrap',
          }}
        >
          <Avatar
            src={expert.avatar}
            sx={{
              width: { xs: 120, md: 160 },
              height: { xs: 120, md: 160 },
              border: '4px solid white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Typography variant={isMobile ? 'h4' : 'h3'} fontWeight="bold">
                {expert.name}
              </Typography>
              {expert.verified && (
                <VerifiedUser sx={{ color: '#4caf50', fontSize: 28 }} />
              )}
            </Stack>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
              {expert.specialization}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              {expert.fullDescription}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Star sx={{ color: '#ffc107', fontSize: 24 }} />
                <Typography variant="h6" fontWeight="bold">
                  {expert.rating}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  ({expert.reviews} đánh giá)
                </Typography>
              </Stack>
            </Stack>

            {/* Pricing Section - Single Row with Button */}
            <Box
              sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: 'white',
                    textDecoration: 'line-through',
                    opacity: 0.8,
                  }}
                >
                  {expert.original_price.toLocaleString('vi-VN')}đ
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: '#FFD700' }}
                >
                  {expert.current_price.toLocaleString('vi-VN')}đ
                </Typography>
                <Box
                  sx={{
                    bgcolor: '#FF6B35',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    sx={{ fontSize: '1rem' }}
                  >
                    -{expert.discount}%
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  if (isAuthenticated) {
                    navigate(`/booking/${expert.id}`);
                  } else {
                    navigate('/login', {
                      state: { redirectTo: `/booking/${expert.id}` },
                    });
                  }
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  bgcolor: '#FF6B35',
                  color: 'white',
                  boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)',
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#E55A2B',
                    color: 'white',
                    boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Đặt lịch tư vấn
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ExpertHero;
