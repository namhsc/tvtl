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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ArrowForward, QuestionAnswer, TrendingUp } from '@mui/icons-material';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import backgroundImg from '../assets/background.jpg';

const Surveys: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const surveys = [
    {
      id: 1,
      name: 'Khảo sát Stress & Lo âu',
      description: 'Đánh giá mức độ stress và lo âu trong cuộc sống hàng ngày.',
      number_of_questions: 20,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      topics: ['Tâm lý', 'Stress', 'Lo âu'],
      participants: 1250,
      init_participants: 5000,
      original_price: 150000,
      current_price: 120000,
      discount: 20,
      isSponsored: false,
      avatar:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
    },
    {
      id: 2,
      title: 'Kiểm tra IQ',
      description:
        'Đánh giá chỉ số thông minh qua các bài test logic và tư duy.',
      number_of_questions: 40,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      topics: ['Trí tuệ', 'IQ', 'Tư duy'],
      participants: 890,
      init_participants: 5000,
      original_price: 200000,
      current_price: 200000,
      isSponsored: false,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
    },
    {
      id: 3,
      title: 'Đánh giá EQ',
      description: 'Kiểm tra trí tuệ cảm xúc và khả năng hiểu biết cảm xúc.',
      number_of_questions: 30,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      topics: ['Cảm xúc', 'EQ', 'Trí tuệ cảm xúc'],
      participants: 1100,
      init_participants: 5000,
      original_price: 180000,
      current_price: 0,
      discount: 100,
      isSponsored: true,
      avatar:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&3',
    },
    {
      id: 4,
      title: 'Khảo sát Tâm lý Học đường',
      description:
        'Đánh giá các vấn đề tâm lý thường gặp ở học sinh, sinh viên.',
      number_of_questions: 25,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      topics: ['Học đường', 'Tâm lý học đường', 'Tâm lý học'],
      participants: 2100,
      init_participants: 5000,
      original_price: 120000,
      current_price: 90000,
      discount: 25,
      isSponsored: false,
      avatar:
        'https://images.unsplash.com/photo-1523240798139-2eaa5d5c8c3b?w=400&h=200&fit=crop&4',
    },
    {
      id: 5,
      title: 'Khảo sát Mối quan hệ',
      description: 'Đánh giá chất lượng các mối quan hệ trong cuộc sống.',
      number_of_questions: 22,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      topics: ['Quan hệ', 'Mối quan hệ', 'Tâm lý quan hệ'],
      participants: 950,
      init_participants: 5000,
      original_price: 100000,
      current_price: 0,
      discount: 100,
      isSponsored: true,
      avatar:
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop&5',
    },
    {
      id: 6,
      title: 'Kiểm tra Trí nhớ',
      description: 'Đánh giá khả năng ghi nhớ và xử lý thông tin.',
      number_of_questions: 35,
      color: '#0080FF',
      gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
      topics: ['Nhận thức', 'Trí nhớ', 'Xử lý thông tin'],
      participants: 650,
      init_participants: 5000,
      original_price: 250000,
      current_price: 200000,
      discount: 20,
      isSponsored: false,
      avatar:
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&6',
    },
  ];

  usePageTitle('Khảo sát Tâm lý - Tư vấn Tâm lý');

  const handleSurveyClick = (surveyId: number) => {
    if (isAuthenticated) {
      navigate(`/survey/${surveyId}`);
    } else {
      navigate('/login', { state: { redirectTo: `/survey/${surveyId}` } });
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
              Khảo sát Tâm lý
            </Typography>
            <Typography
              variant="h6"
              sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Khám phá bản thân qua các bài test chuyên nghiệp được thiết kế bởi
              các chuyên gia hàng đầu
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Surveys Grid */}
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
            Danh sách khảo sát
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Chọn bài khảo sát phù hợp với nhu cầu của bạn
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {surveys.map(survey => (
            <Box
              key={survey.id}
              sx={{
                flex: '1 1 300px',
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
                    '& .survey-header': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
                onClick={() => handleSurveyClick(survey.id)}
              >
                <Box
                  className="survey-header"
                  sx={{
                    height: 200,
                    background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%), url(${survey.avatar})`,
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
                />
                <CardContent
                  sx={{
                    p: 3,
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
                    sx={{ mb: 2 }}
                  >
                    {survey.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, lineHeight: 1.6, flex: 1 }}
                  >
                    {survey.description}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <TrendingUp
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {survey.participants.toLocaleString()} người
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <QuestionAnswer
                        sx={{ fontSize: 16, color: 'text.secondary' }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                      >
                        {survey.number_of_questions} câu
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price Section */}
                  <Box sx={{ mb: 2 }}>
                    {survey.isSponsored ? (
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
                        {survey.discount && survey.discount > 0 && (
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: 'line-through',
                              color: 'text.disabled',
                              fontSize: '0.8rem',
                            }}
                          >
                            {survey.original_price.toLocaleString()}đ
                          </Typography>
                        )}
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={
                            survey.discount && survey.discount > 0
                              ? 'error.main'
                              : 'primary.main'
                          }
                        >
                          {survey.current_price === 0
                            ? 'Miễn phí'
                            : `${survey.current_price.toLocaleString()}đ`}
                        </Typography>
                        {survey.discount && survey.discount > 0 && (
                          <Chip
                            label={`-${survey.discount}%`}
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
                    sx={{
                      borderRadius: 3,
                      background: `linear-gradient(135deg, ${survey.color} 0%, ${survey.color}dd 100%)`,
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.5,
                      px: 3,
                      boxShadow: `0 4px 12px ${survey.color}40`,
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
                        boxShadow: `0 8px 24px ${survey.color}60`,
                        '&::before': {
                          left: 100,
                        },
                      },
                      '&:active': {
                        transform: 'translateY(-1px) scale(0.98)',
                      },
                    }}
                  >
                    Bắt đầu khảo sát
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
              Chưa tìm thấy khảo sát phù hợp?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Liên hệ với chúng tôi để được tư vấn và tạo khảo sát riêng biệt
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

export default Surveys;
