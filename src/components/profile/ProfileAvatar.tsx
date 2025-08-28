import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Person,
  Star,
  Badge,
} from '@mui/icons-material';

interface ProfileAvatarProps {
  avatar: string;
  fullName: string;
  point: number;
  referralCode: string;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  hasChanges: boolean;
  isNewUser: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar,
  fullName,
  point,
  referralCode,
  onAvatarChange,
  onSave,
  onCancel,
  hasChanges,
  isNewUser,
}) => {
  const currentAvatar = avatar || '';

  return (
    <Box sx={{ width: { xs: '100%', lg: '400px' } }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={currentAvatar || undefined}
              sx={{
                width: 180,
                height: 180,
                mx: 'auto',
                mb: 3,
                border: '6px solid',
                borderColor: 'primary.main',
                bgcolor: 'white',
                color: !currentAvatar ? 'white' : 'transparent',
                fontSize: !currentAvatar ? 100 : 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!currentAvatar && (
                <Person sx={{ fontSize: 120, color: 'primary.main' }} />
              )}
            </Avatar>

            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                bgcolor: 'grey.500',
                color: 'white',
                width: 48,
                height: 48,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <PhotoCameraIcon />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onAvatarChange}
              />
            </IconButton>
          </Box>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 1,
            }}
          >
            {fullName}
          </Typography>

          {/* Thông tin điểm */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: 'center',
            }}
          >
            <Star
              sx={{
                fontSize: 22,
                color: 'warning.main',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: 'warning.main',
                fontSize: 22,
              }}
            >
              {point} điểm
            </Typography>
          </Box>

          {/* Mã giới thiệu */}
          <Box sx={{ mt: 2, mb: 3 }}>
            {referralCode && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Badge sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                >
                  Mã giới thiệu: <b>{referralCode}</b>
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    minWidth: 32,
                    px: 1,
                    py: 0.2,
                    borderRadius: 2,
                    borderColor: '#0080FF',
                    color: '#0080FF',
                    fontSize: 12,
                    ml: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#e6f3ff',
                      borderColor: '#0080FF',
                    },
                  }}
                  onClick={() => {
                    try {
                      (window as any).navigator?.clipboard?.writeText(
                        referralCode
                      );
                    } catch {
                      console.log('Không thể sao chép vào clipboard');
                    }
                  }}
                >
                  Sao chép
                </Button>
              </Box>
            )}
          </Box>

          {/* Buttons */}
          <Box sx={{ mt: 3 }}>
            {hasChanges && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  onClick={onSave}
                  size="large"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 4px 16px rgba(0,128,255,0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(0,128,255,0.4)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {isNewUser ? 'Hoàn tất hồ sơ' : 'Lưu thay đổi'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  size="large"
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: 'grey.300',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'grey.400',
                      backgroundColor: 'grey.50',
                    },
                  }}
                >
                  Hủy
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileAvatar;
