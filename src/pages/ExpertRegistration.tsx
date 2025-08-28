import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CheckCircle, ArrowBack } from '@mui/icons-material';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import { isValidEmail, isValidPhoneNumber } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/background.jpg';

const ExpertRegistration: React.FC = () => {
  usePageTitle('Đăng ký làm chuyên gia - Tư vấn Tâm lý');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    specialization: '',
    introduction: '',
  });

  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const specializations = [
    'Tâm lý Trẻ em',
    'Tâm lý Người lớn',
    'Tư vấn Hôn nhân',
    'Tâm lý Học đường',
    'Tâm lý Công việc',
    'Tâm thần học',
    'Tư vấn Gia đình',
    'Tâm lý Tội phạm',
    'Tâm lý Thể thao',
    'Tâm lý Y tế',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    }

    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    if (!file) {
      newErrors.file = 'Vui lòng upload giấy tờ chuyên môn';
    } else if (file.size > 20 * 1024 * 1024) {
      newErrors.file = 'File quá lớn (tối đa 20MB)';
    } else if (file.type !== 'application/pdf') {
      newErrors.file = 'Chỉ chấp nhận file PDF';
    }

    if (!formData.specialization) {
      newErrors.specialization = 'Vui lòng chọn lĩnh vực tư vấn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File quá lớn (tối đa 20MB)' }));
        return;
      }
      if (selectedFile.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, file: 'Chỉ chấp nhận file PDF' }));
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        gender: '',
        specialization: '',
        introduction: '',
      });
      setFile(null);
      setFileName('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
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
          <Button
            component="button"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
            sx={{
              color: 'white',
              mb: 4,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Quay lại
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Đăng ký làm chuyên gia
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Tham gia đội ngũ chuyên gia tư vấn tâm lý chuyên nghiệp
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {submitSuccess && (
          <Alert
            severity="success"
            sx={{ mb: 4, borderRadius: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setSubmitSuccess(false)}
              >
                Đóng
              </Button>
            }
          >
            Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm
            nhất.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Thông tin cá nhân */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Thông tin cá nhân
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Họ tên *"
                    value={formData.fullName}
                    onChange={e =>
                      handleInputChange('fullName', e.target.value)
                    }
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    placeholder="Nhập họ và tên"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Số điện thoại *"
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    placeholder="0123456789"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    placeholder="example@email.com"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Giới tính *</InputLabel>
                    <Select
                      value={formData.gender}
                      label="Giới tính *"
                      onChange={e =>
                        handleInputChange('gender', e.target.value)
                      }
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            {/* Thông tin chuyên môn */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Thông tin chuyên môn
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <FormControl fullWidth error={!!errors.specialization}>
                    <InputLabel>Lĩnh vực tư vấn *</InputLabel>
                    <Select
                      value={formData.specialization}
                      label="Lĩnh vực tư vấn *"
                      onChange={e =>
                        handleInputChange('specialization', e.target.value)
                      }
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      {specializations.map(spec => (
                        <MenuItem key={spec} value={spec}>
                          {spec}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.specialization && (
                      <FormHelperText>{errors.specialization}</FormHelperText>
                    )}
                  </FormControl>

                  <FileUpload
                    file={file}
                    fileName={fileName}
                    onFileChange={handleFileChange}
                    onFileRemove={() => {
                      setFile(null);
                      setFileName('');
                      setErrors(prev => ({ ...prev, file: '' }));
                    }}
                    error={errors.file}
                    accept=".pdf"
                    maxSize={20 * 1024 * 1024}
                    title="Upload giấy tờ chuyên môn"
                    description="Chỉ chấp nhận file PDF, tối đa 20MB"
                  />

                  <TextField
                    fullWidth
                    label="Giới thiệu bản thân"
                    multiline
                    rows={4}
                    value={formData.introduction}
                    onChange={e =>
                      handleInputChange('introduction', e.target.value)
                    }
                    placeholder="Giới thiệu về kinh nghiệm, chuyên môn và phương pháp tư vấn của bạn..."
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              startIcon={isSubmitting ? undefined : <CheckCircle />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '8px',
                bgcolor: '#FF6B35',
                color: 'white',
                boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)',
                '&:hover': {
                  bgcolor: '#E55A2B',
                  boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ExpertRegistration;
