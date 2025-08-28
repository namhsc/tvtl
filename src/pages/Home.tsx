import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import {
  Assessment,
  Support,
  VerifiedUser,
  Star,
  ArrowForward,
  PlayArrow,
  Phone,
  Security,
  Speed,
  Devices,
  School,
} from '@mui/icons-material';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import ResponsiveCard from '../components/ResponsiveCard';
import backgroundImg from '../assets/background.jpg';

const Home: React.FC = () => {
  usePageTitle('Trang chủ - Tư vấn Tâm lý');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    {
      label: 'Chuyên gia',
      value: '50+',
      icon: <VerifiedUser />,
      color: '#0080FF',
    },
    {
      label: 'Khách hàng',
      value: '10,000+',
      icon: <Support />,
      color: '#0080FF',
    },
    {
      label: 'Bài khảo sát',
      value: '20+',
      icon: <Assessment />,
      color: '#0080FF',
    },
    { label: 'Đánh giá', value: '4.9/5', icon: <Star />, color: '#0080FF' },
  ];

  const features = [
    { icon: <Phone />, title: 'Tư vấn 24/7', desc: 'Hỗ trợ mọi lúc, mọi nơi' },
    {
      icon: <Security />,
      title: 'Bảo mật tuyệt đối',
      desc: 'Thông tin được mã hóa an toàn',
    },
    { icon: <Speed />, title: 'Kết quả nhanh', desc: 'Nhận kết quả trong 24h' },
    {
      icon: <Devices />,
      title: 'Đa nền tảng',
      desc: 'Sử dụng trên mọi thiết bị',
    },
  ];

  const handleExpertClick = (expertId: number) => {
    navigate(`/expert/${expertId}`);
  };

  const handleRegisterClick = () => {
    navigate('/experts');
  };

  const handleSurveyClick = () => {
    navigate('/surveys');
  };

  const handleSurveyCardClick = (surveyId: number) => {
    navigate(`/survey/${surveyId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          color: 'white',
          py: { xs: 8, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(0, 128, 255, 0.85) 0%, rgba(0, 86, 204, 0.85) 50%, rgba(0, 68, 153, 0.85) 100%), url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(8px)',
            zIndex: 0,
          },
          '& > *': { position: 'relative', zIndex: 1 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 4, md: 8 },
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box sx={{ flex: '1 1 500px', minWidth: 0 }}>
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                gutterBottom
                fontWeight="bold"
                sx={{
                  lineHeight: 1.2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Tư vấn Tâm lý
                <br />
              </Typography>
              <Typography
                variant={isMobile ? 'h6' : 'h6'}
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.6,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                Hỗ trợ bạn vượt qua những khó khăn tâm lý với đội ngũ chuyên gia
                giàu kinh nghiệm và phương pháp khoa học tiên tiến
              </Typography>

              {/* Features Grid */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                  }}
                >
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        minWidth: {
                          xs: 'calc(50% - 8px)',
                          sm: 'calc(25% - 12px)',
                        },
                        flex: '1 1 auto',
                      }}
                    >
                      <Box sx={{ color: 'primary.light', mb: 1 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ mb: 0.5 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {feature.desc}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={handleRegisterClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                    color: 'primary.main',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  Đăng ký tư vấn
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={handleSurveyClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    borderColor: 'white',
                    fontSize: '1.1rem',
                    borderRadius: 3,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Khảo sát miễn phí
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="text.primary"
              sx={{ mb: 2 }}
            >
              Thống kê ấn tượng
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Những con số minh chứng cho chất lượng dịch vụ và sự tin tưởng của
              khách hàng
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  py: { xs: 3, md: 4 },
                  textAlign: 'center',
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                  border: '1px solid',
                  borderColor: `${stat.color}20`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${stat.color}10 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    boxShadow: `0 24px 48px ${stat.color}20`,
                    borderColor: `${stat.color}40`,
                    '&::after': {
                      opacity: 1,
                    },
                    '& .stat-icon': {
                      transform: 'scale(1.15) rotate(5deg)',
                      color: stat.color,
                    },
                    '& .stat-value': {
                      transform: 'scale(1.05)',
                      color: stat.color,
                    },
                    '& .stat-label': {
                      color: 'text.primary',
                    },
                  },
                }}
              >
                <Box
                  className="stat-icon"
                  sx={{
                    color: `${stat.color}dd`,
                    mb: 3,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    justifyContent: 'center',
                    '& > svg': {
                      fontSize: { xs: 40, md: 48 },
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    },
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  className="stat-value"
                  variant={isMobile ? 'h4' : 'h3'}
                  component="div"
                  fontWeight="bold"
                  sx={{
                    mb: 1,
                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  className="stat-label"
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.9rem',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Additional Stats Info */}
          <Box sx={{ mt: { xs: 6, md: 8 }, textAlign: 'center' }}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              Với hơn <strong>10,000+</strong> khách hàng đã tin tưởng và sử
              dụng dịch vụ, chúng tôi tự hào mang đến những giải pháp tâm lý
              hiệu quả và chuyên nghiệp nhất.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Surveys Section */}
      <Box sx={{ bgcolor: '#ffffff', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="text.primary"
              sx={{ mb: 2 }}
            >
              Bài khảo sát nổi bật
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Khám phá bản thân qua các bài test chuyên nghiệp được thiết kế bởi
              các chuyên gia hàng đầu
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[
              {
                id: 1,
                title: 'Khảo sát Stress & Lo âu',
                description:
                  'Đánh giá mức độ stress và lo âu trong cuộc sống hàng ngày.',
                questions: 20,
                color: '#0080FF',
                gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
                category: '',
                participants: 1250,
                originalPrice: 150000,
                currentPrice: 120000,
                discount: 20,
                isSponsored: false,
                image:
                  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
              },
              {
                id: 2,
                title: 'Kiểm tra IQ',
                description:
                  'Đánh giá chỉ số thông minh qua các bài test logic và tư duy.',
                questions: 40,
                color: '#0080FF',
                gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
                category: '',
                participants: 890,
                originalPrice: 200000,
                currentPrice: 200000,
                isSponsored: false,
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
              },
              {
                id: 3,
                title: 'Đánh giá EQ',
                description:
                  'Kiểm tra trí tuệ cảm xúc và khả năng hiểu biết cảm xúc.',
                questions: 30,
                color: '#0080FF',
                gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
                category: '',
                participants: 1100,
                originalPrice: 180000,
                currentPrice: 0,
                discount: 100,
                isSponsored: true,
                image:
                  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&3',
              },
            ].map(survey => (
              <ResponsiveCard
                key={survey.id}
                title={survey.title}
                description={survey.description}
                image={survey.image}
                questions={survey.questions}
                participants={survey.participants}
                originalPrice={survey.originalPrice}
                currentPrice={survey.currentPrice}
                discount={survey.discount}
                isSponsored={survey.isSponsored}
                color={survey.color}
                gradient={survey.gradient}
                buttonText="Bắt đầu khảo sát"
                onButtonClick={() => handleSurveyCardClick(survey.id)}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Experts Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h2"
              gutterBottom
              fontWeight="bold"
              color="text.primary"
              sx={{ mb: 2 }}
            >
              Chuyên gia hàng đầu
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Đội ngũ chuyên gia giàu kinh nghiệm với chuyên môn sâu trong lĩnh
              vực tâm lý học
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {[
              {
                id: 1,
                name: 'TS. Nguyễn Thị Hương',
                title: 'Chuyên gia Tâm lý Trẻ em',
                description:
                  'Chuyên gia tư vấn tâm lý trẻ em với hơn 15 năm kinh nghiệm. Tốt nghiệp Đại học Y Hà Nội, chuyên ngành Tâm lý học lâm sàng.',
                rating: 4.9,
                reviews: 245,
                originalPrice: 600000,
                currentPrice: 500000,
                discount: 17,
                isSponsored: false,
                color: '#0080FF',
                avatar:
                  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
                image:
                  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
              },
              {
                id: 2,
                name: 'PGS.TS. Trần Văn Minh',
                title: 'Chuyên gia Tâm lý Người lớn',
                description:
                  'Chuyên gia tư vấn tâm lý người lớn, chuyên về stress, lo âu và trầm cảm. Có kinh nghiệm làm việc tại các bệnh viện tâm thần hàng đầu.',
                rating: 4.8,
                reviews: 189,
                originalPrice: 700000,
                currentPrice: 600000,
                discount: 14,
                isSponsored: false,
                color: '#0080FF',
                avatar:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
              },
              {
                id: 3,
                name: 'ThS. Lê Thị Lan',
                title: 'Chuyên gia Tư vấn Hôn nhân',
                description:
                  'Chuyên gia tư vấn hôn nhân và gia đình với chuyên môn sâu về các vấn đề mối quan hệ, giao tiếp và giải quyết xung đột.',
                rating: 4.7,
                reviews: 156,
                originalPrice: 500000,
                currentPrice: 0,
                discount: 100,
                isSponsored: true,
                color: '#0080FF',
                avatar:
                  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop&3',
                image:
                  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop&3',
              },
            ].map(expert => (
              <ResponsiveCard
                key={expert.id}
                title={expert.name}
                description={expert.description}
                image={expert.image}
                avatar={expert.avatar}
                rating={expert.rating}
                reviews={expert.reviews}
                originalPrice={expert.originalPrice}
                currentPrice={expert.currentPrice}
                discount={expert.discount}
                isSponsored={expert.isSponsored}
                color={expert.color}
                buttonText="Đặt lịch tư vấn"
                onButtonClick={() => handleExpertClick(expert.id)}
                isExpert={true}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* App Download Section */}
      <Box
        sx={{
          bgcolor: 'linear-gradient(90deg, #fffbe6 0%, #e3f0ff 100%)',
          py: { xs: 5, md: 7 },
          px: 2,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Box sx={{ fontSize: 64, color: '#0080FF', mb: { xs: 2, md: 0 } }}>
              <School sx={{ fontSize: 64 }} />
            </Box>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                fontWeight="bold"
                gutterBottom
              >
                Đăng ký làm chuyên gia tư vấn tâm lý
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Tham gia đội ngũ chuyên gia của chúng tôi để cùng lan tỏa giá
                trị tích cực và hỗ trợ cộng đồng vượt qua khó khăn tâm lý.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<School />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                }}
                onClick={() => navigate('/expert-registration')}
              >
                Đăng ký ngay
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* App Download Section */}
      <Box
        sx={{
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(135deg, #0080FF 0%, #0056CC 50%, #004499 100%)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 6, md: 8 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              component="h2"
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 3 }}
            >
              Tải ứng dụng di động
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                opacity: 0.9,
                lineHeight: 1.6,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Trải nghiệm dịch vụ tư vấn tâm lý chuyên nghiệp ngay trên điện
              thoại của bạn
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: 'center',
              gap: { xs: 6, lg: 8 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* App Features */}
            <Box
              sx={{
                flex: '1',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 3,
                maxWidth: { xs: '100%', lg: '600px' },
              }}
            >
              {[
                {
                  icon: <Phone />,
                  title: 'Tư vấn 24/7',
                  desc: 'Kết nối trực tiếp với chuyên gia tâm lý mọi lúc, mọi nơi',
                },
                {
                  icon: <Assessment />,
                  title: 'Khảo sát chuyên nghiệp',
                  desc: 'Hơn 20 bài test tâm lý được thiết kế bởi chuyên gia',
                },
                {
                  icon: <Security />,
                  title: 'Bảo mật tuyệt đối',
                  desc: 'Thông tin cá nhân được mã hóa và bảo vệ an toàn',
                },
                {
                  icon: <Speed />,
                  title: 'Kết quả nhanh chóng',
                  desc: 'Nhận kết quả và tư vấn trong vòng 24 giờ',
                },
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      bgcolor: 'rgba(255,255,255,0.15)',
                    },
                  }}
                >
                  <Box sx={{ color: 'white', mb: 2, fontSize: 40 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {feature.desc}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Download Section */}
            <Box
              sx={{
                flex: '1',
                textAlign: 'center',
                maxWidth: { xs: '100%', lg: '400px' },
              }}
            >
              <Box
                sx={{
                  mb: 4,
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Tải ngay miễn phí
                </Typography>
                <Typography variant="body2" sx={{ mb: 4, opacity: 0.9 }}>
                  Hơn 10,000+ người đã tin tưởng và sử dụng ứng dụng
                </Typography>

                <Stack spacing={2} sx={{ alignItems: 'center' }}>
                  <Link
                    href="https://apps.apple.com/vn/app/c-tvtl/id6748490459"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-block',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="/appstore.png"
                      alt="App Store"
                      sx={{ height: 40, width: 150 }}
                    />
                  </Link>

                  <Link
                    href="https://play.google.com/store/apps/details?id=my.com.app_khao_sat"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-block',
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src="/playstore.png"
                      alt="Google Play"
                      sx={{ height: 40, width: 150 }}
                    />
                  </Link>
                </Stack>

                <Box
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} sx={{ color: '#FFD700', fontSize: 20 }} />
                  ))}
                  <Typography variant="body2" sx={{ ml: 1, opacity: 0.9 }}>
                    4.9/5 (2,500+ đánh giá)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
