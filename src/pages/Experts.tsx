import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Rating,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import backgroundImg from '../assets/background.jpg';

const Experts: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const experts = [
    {
      id: 1,
      name: 'TS. Nguyễn Thị Hương',
      position: 'Chuyên gia Tâm lý Trẻ em',
      description:
        'Chuyên gia tư vấn tâm lý trẻ em với hơn 15 năm kinh nghiệm. Tốt nghiệp Đại học Y Hà Nội, chuyên ngành Tâm lý học lâm sàng.',
      avatar:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
      rating: 4.9,
      reviews: 245,
      experience: '15+ năm',
      education: ['Tiến sĩ Tâm lý học', 'Đại học Y Hà Nội'],
      certificate: ['Chứng chỉ Tâm lý học', 'Chứng chỉ Tâm lý trẻ em'],
      awards: ['Giải thưởng Tâm lý học', 'Giải thưởng Tâm lý trẻ em'],
      specializations: ['Trẻ em', 'Gia đình', 'Học đường'],
      original_price: 600000,
      current_price: 500000,
      discount: 17,
      isSponsored: false,
      isAvailable: true,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
    },
    {
      id: 2,
      name: 'PGS.TS. Trần Văn Minh',
      title: 'Chuyên gia Tâm lý Người lớn',
      description:
        'Chuyên gia tư vấn tâm lý người lớn, chuyên về stress, lo âu và trầm cảm. Có kinh nghiệm làm việc tại các bệnh viện tâm thần hàng đầu.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
      rating: 4.8,
      reviews: 189,
      experience: '12+ năm',
      education: ['Phó Giáo sư Tâm lý học', 'Đại học Y Hà Nội'],
      certificate: ['Chứng chỉ Tâm lý học', 'Chứng chỉ Tâm lý người lớn'],
      awards: ['Giải thưởng Tâm lý học', 'Giải thưởng Tâm lý người lớn'],
      specializations: ['Stress', 'Lo âu', 'Trầm cảm'],
      original_price: 700000,
      current_price: 600000,
      discount: 14,
      isSponsored: false,
      isAvailable: true,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
    },
    {
      id: 3,
      name: 'ThS. Lê Thị Lan',
      title: 'Chuyên gia Tư vấn Hôn nhân',
      description:
        'Chuyên gia tư vấn hôn nhân và gia đình với chuyên môn sâu về các vấn đề mối quan hệ, giao tiếp và giải quyết xung đột.',
      avatar:
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop&3',
      rating: 4.7,
      reviews: 156,
      experience: '10+ năm',
      education: ['Thạc sĩ Tâm lý học', 'Đại học Y Hà Nội'],
      certificate: ['Chứng chỉ Tâm lý học', 'Chứng chỉ Tư vấn hôn nhân'],
      awards: ['Giải thưởng Tâm lý học', 'Giải thưởng Tư vấn hôn nhân'],
      specializations: ['Hôn nhân', 'Gia đình', 'Mối quan hệ'],
      original_price: 500000,
      current_price: 0,
      discount: 100,
      isSponsored: true,
      isAvailable: true,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      image:
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop&3',
    },
    {
      id: 4,
      name: 'BS. Phạm Văn Hùng',
      title: 'Bác sĩ Tâm thần',
      description:
        'Bác sĩ chuyên khoa tâm thần với kinh nghiệm điều trị các rối loạn tâm thần nghiêm trọng và tư vấn dược lý.',
      avatar:
        'https://images.unsplash.com/photo-1523240798139-2eaa5d5c8c3b?w=400&h=200&fit=crop&4',
      rating: 4.9,
      reviews: 203,
      experience: '18+ năm',
      education: ['Bác sĩ Tâm thần', 'Đại học Y Hà Nội'],
      certificate: ['Chứng chỉ Tâm thần', 'Chứng chỉ Dược lý'],
      awards: ['Giải thưởng Tâm lý học', 'Giải thưởng Tâm thần'],
      specializations: ['Tâm thần', 'Dược lý', 'Rối loạn tâm thần'],
      original_price: 900000,
      current_price: 800000,
      discount: 11,
      isSponsored: false,
      isAvailable: true,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      image:
        'https://images.unsplash.com/photo-1523240798139-2eaa5d5c8c3b?w=400&h=200&fit=crop&4',
    },
    {
      id: 5,
      name: 'ThS. Hoàng Thị Mai',
      title: 'Chuyên gia Tâm lý Học đường',
      description:
        'Chuyên gia tư vấn tâm lý học đường, chuyên về các vấn đề học tập, bắt nạt và phát triển kỹ năng xã hội.',
      avatar:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&5',
      rating: 4.6,
      reviews: 134,
      experience: '8+ năm',
      education: ['Thạc sĩ Tâm lý học', 'Đại học Y Hà Nội'],
      certificate: ['Chứng chỉ Tâm lý học', 'Chứng chỉ Tâm lý học đường'],
      awards: ['Giải thưởng Tâm lý học', 'Giải thưởng Tâm lý học đường'],
      specializations: ['Học đường', 'Bắt nạt', 'Kỹ năng xã hội'],
      original_price: 450000,
      current_price: 0,
      discount: 100,
      isSponsored: true,
      isAvailable: true,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      image:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&5',
    },
    {
      id: 6,
      name: 'TS. Vũ Thị Thanh',
      title: 'Chuyên gia Tâm lý Công việc',
      description:
        'Chuyên gia tư vấn tâm lý công việc, chuyên về stress công sở, burnout và phát triển sự nghiệp.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&6',
      rating: 4.5,
      reviews: 98,
      experience: '11+ năm',
      education: ['Tiến sĩ Tâm lý học', 'Đại học Y Hà Nội'],
      certificate: ['Chứng chỉ Tâm lý học', 'Chứng chỉ Tâm lý công việc'],
      awards: ['Giải thưởng Tâm lý học', 'Giải thưởng Tâm lý công việc'],
      specializations: ['Công việc', 'Stress', 'Sự nghiệp'],
      original_price: 650000,
      current_price: 550000,
      discount: 15,
      isSponsored: false,
      isAvailable: true,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&6',
    },
  ];

  usePageTitle('Chuyên gia Tư vấn Tâm lý - Tư vấn Tâm lý');

  const handleExpertClick = (expertId: number) => {
    if (isAuthenticated) {
      navigate(`/expert/${expertId}`);
    } else {
      navigate('/login', { state: { redirectTo: `/expert/${expertId}` } });
    }
  };

  const handleBookingClick = (expertId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên card
    if (isAuthenticated) {
      navigate(`/booking-consultation/${expertId}`);
    } else {
      navigate('/login', {
        state: { redirectTo: `/booking-consultation/${expertId}` },
      });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />

      {/* Hero Section */}
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
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 3 }}
            >
              Chuyên gia Tư vấn Tâm lý
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Đội ngũ chuyên gia hàng đầu với kinh nghiệm chuyên sâu trong lĩnh
              vực tâm lý học
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Experts Grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            component="h2"
            gutterBottom
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            Danh sách chuyên gia
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Chọn chuyên gia phù hợp với nhu cầu của bạn
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {experts.map(expert => (
            <Box
              key={expert.id}
              sx={{
                flex: '1 1 350px',
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 16px)',
                  lg: 'calc(33.333% - 16px)',
                },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    '& .expert-header': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
                onClick={() => handleExpertClick(expert.id)}
              >
                <Box
                  className="expert-header"
                  sx={{
                    height: 200,
                    background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%), url(${expert.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.3s ease',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                    },
                  }}
                >
                  {/* Avatar tròn */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -40,
                      left: 20,
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      border: '4px solid white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                      overflow: 'hidden',
                      background: 'white',
                      zIndex: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={expert.avatar}
                      alt={expert.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Box>
                <CardContent
                  sx={{
                    p: 3,
                    pt: 8, // Tăng padding top để tránh bị che bởi avatar
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {expert.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontWeight: 'medium' }}
                  >
                    {expert.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6, flex: 1 }}
                  >
                    {expert.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {expert.specializations.slice(0, 2).map(spec => (
                      <Chip
                        key={spec}
                        label={spec}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Rating
                      value={expert.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography variant="body2" color="text.secondary">
                      ({expert.reviews} đánh giá)
                    </Typography>
                  </Box>

                  {/* Price Section */}
                  <Box sx={{ mb: 2 }}>
                    {expert.isSponsored ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'success.light',
                          color: 'success.contrastText',
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ fontSize: '0.9rem' }}
                        >
                          🎁 Được tài trợ
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {expert.discount > 0 && (
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.disabled',
                              fontSize: '0.8rem',
                            }}
                          >
                            {expert.original_price.toLocaleString()}đ
                          </Typography>
                        )}
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={
                            expert.discount > 0 ? 'error.main' : 'primary.main'
                          }
                        >
                          {expert.current_price === 0
                            ? 'Miễn phí'
                            : `${expert.current_price.toLocaleString()}đ`}
                        </Typography>
                        {expert.discount > 0 && (
                          <Chip
                            label={`-${expert.discount}%`}
                            size="small"
                            color="error"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={event => handleBookingClick(expert.id, event)}
                    sx={{
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${expert.color} 0%, ${expert.color}dd 100%)`,
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.5,
                      px: 3,
                      boxShadow: `0 4px 12px ${expert.color}40`,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: -100,
                        width: '100%',
                        height: '100%',
                        background:
                          'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover': {
                        transform: 'translateY(-3px) scale(1.02)',
                        boxShadow: `0 8px 24px ${expert.color}60`,
                        '&::before': {
                          left: 100,
                        },
                      },
                      '&:active': {
                        transform: 'translateY(-1px) scale(0.98)',
                      },
                    }}
                  >
                    Đặt lịch tư vấn
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Chưa tìm thấy chuyên gia phù hợp?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Liên hệ với chúng tôi để được tư vấn và kết nối với chuyên gia phù
              hợp
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              Liên hệ tư vấn
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Experts;
