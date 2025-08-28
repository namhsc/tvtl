import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ArrowForward,
  QuestionAnswer,
  Star,
  TrendingUp,
} from '@mui/icons-material';

// Types
interface ResponsiveCardProps {
  title: string;
  description: string;
  image?: string;
  avatar?: string; // Thêm thuộc tính avatar
  icon?: React.ReactNode;
  tags?: string[];
  rating?: number;
  reviews?: number;
  questions?: number;
  participants?: number;
  price?: string;
  originalPrice?: number;
  currentPrice?: number;
  discount?: number;
  isSponsored?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  color?: string;
  gradient?: string;
  isExpert?: boolean;
}

// Component cho Card Image
const CardImage: React.FC<{
  image?: string;
  avatar?: string; // Thêm avatar
  icon?: React.ReactNode;
  color?: string;
  isExpert?: boolean; // Thêm isExpert
}> = ({ image, avatar, icon, color = '#0080FF', isExpert = false }) => {
  if (!image && !avatar) return null;

  return (
    <Box
      className="card-image"
      sx={{
        height: { xs: 160, sm: 180, md: 200 },
        background: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        transition: 'transform 0.4s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)`,
        },
      }}
    >
      {/* Avatar tròn cho chuyên gia */}
      {isExpert && avatar && (
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
            src={avatar}
            alt="Avatar"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}

      {icon && (
        <Box
          className="card-icon"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            p: 1.5,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            color: color,
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      )}
    </Box>
  );
};

// Component cho Card Tags
const CardTags: React.FC<{
  tags?: string[];
  color?: string;
}> = ({ tags = [], color = '#0080FF' }) => {
  if (tags.length === 0) return null;

  return (
    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {tags.slice(0, 3).map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          size="small"
          sx={{
            fontSize: '0.75rem',
            height: 24,
            bgcolor: `${color}15`,
            color: color,
            fontWeight: 500,
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      ))}
    </Box>
  );
};

// Component cho Card Stats
const CardStats: React.FC<{
  rating?: number;
  reviews?: number;
  questions?: number;
  participants?: number;
  _isExpert?: boolean;
}> = ({ rating, reviews, questions, participants, _isExpert = false }) => {
  if (!rating && !questions && !participants) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      {rating && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Star sx={{ fontSize: 16, color: 'warning.main' }} />
          <Typography variant="body2" fontWeight="bold">
            {rating.toFixed(1)}
          </Typography>
          {reviews && (
            <Typography variant="body2" color="text.secondary">
              ({reviews} đánh giá)
            </Typography>
          )}
        </Box>
      )}

      {questions && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <QuestionAnswer sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant="body2">{questions} câu hỏi</Typography>
        </Box>
      )}

      {participants && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
          <Typography variant="body2">{participants} tham gia</Typography>
        </Box>
      )}
    </Box>
  );
};

// Component cho Card Price
const CardPrice: React.FC<{
  price?: string;
  originalPrice?: number;
  currentPrice?: number;
  discount?: number;
}> = ({ price, originalPrice, currentPrice, discount }) => {
  if (!price && !currentPrice) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      {price ? (
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          {price}
        </Typography>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            {currentPrice?.toLocaleString('vi-VN')}đ
          </Typography>
          {originalPrice && originalPrice > (currentPrice || 0) && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              {originalPrice.toLocaleString('vi-VN')}đ
            </Typography>
          )}
          {discount && (
            <Chip
              label={`-${discount}%`}
              size="small"
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                fontSize: '0.75rem',
                height: 20,
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

// Component cho Card Button
const CardButton: React.FC<{
  buttonText?: string;
  onButtonClick?: () => void;
  color?: string;
}> = ({ buttonText = 'Xem chi tiết', onButtonClick, color = '#0080FF' }) => (
  <Button
    className="card-button"
    variant="outlined"
    fullWidth
    endIcon={<ArrowForward />}
    onClick={onButtonClick}
    sx={{
      mt: 'auto',
      borderColor: color,
      color: color,
      '&:hover': {
        backgroundColor: color,
        color: 'white',
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 16px ${color}40`,
      },
    }}
  >
    {buttonText}
  </Button>
);

const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  description,
  image,
  avatar, // Thêm avatar vào props
  icon,
  tags = [],
  rating,
  reviews,
  questions,
  participants,
  price,
  originalPrice,
  currentPrice,
  discount,
  isSponsored,
  buttonText = 'Xem chi tiết',
  onButtonClick,
  color = '#0080FF',
  gradient = 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
  isExpert = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      elevation={0}
      sx={{
        width: {
          xs: '100%', // Mobile: full width
          sm: 'calc(50% - 16px)', // Tablet: 2 cards per row
          md: '320px', // Desktop: fixed width
          lg: '340px',
          xl: '360px',
        },
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background: 'white',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: gradient,
          zIndex: 1,
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: `0 20px 40px ${color}20`,
          borderColor: `${color}40`,
          '& .card-image': {
            transform: 'scale(1.05)',
          },
          '& .card-button': {
            backgroundColor: color,
            color: 'white',
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 16px ${color}40`,
          },
          '& .card-icon': {
            transform: 'scale(1.1) rotate(5deg)',
          },
        },
      }}
      onClick={onButtonClick}
    >
      <CardImage
        image={image}
        avatar={avatar}
        icon={icon}
        color={color}
        isExpert={isExpert}
      />

      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3 },
          pt: isExpert && avatar ? { xs: 4.5, sm: 5 } : { xs: 2.5, sm: 3 }, // Tăng padding top khi có avatar
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <CardTags tags={tags} color={color} />

        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="h3"
          fontWeight="bold"
          sx={{
            mb: 1.5,
            lineHeight: 1.3,
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          {description}
        </Typography>

        <CardStats
          rating={rating}
          reviews={reviews}
          questions={questions}
          participants={participants}
          _isExpert={isExpert}
        />

        {isSponsored && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
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
        )}
        <CardPrice
          price={price}
          originalPrice={originalPrice}
          currentPrice={currentPrice}
          discount={discount}
        />

        <CardButton
          buttonText={buttonText}
          onButtonClick={onButtonClick}
          color={color}
        />
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;
