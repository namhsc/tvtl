import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Person,
  Phone,
  Cake,
  Badge,
  LocationOn,
  School,
  CalendarToday,
  AccessTime,
  Note,
  AttachMoney,
  CheckCircle,
  ArrowBack,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import backgroundImg from '../assets/background.jpg';
import { Location } from '../services/types/api.types';
import { apiLocation } from '../services/apiLocation';

// Cấu hình locale tiếng Việt cho dayjs
dayjs.locale('vi');

const BookingConsultation: React.FC = () => {
  usePageTitle('Đặt lịch tư vấn chuyên gia');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [bookingType, setBookingType] = useState<'self' | 'other'>('self');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Dữ liệu chuyên gia mẫu (trong thực tế sẽ lấy từ API)
  const expertsData = [
    {
      id: 1,
      name: 'TS. Nguyễn Thị Hương',
      specialization: 'Tâm lý Học đường',
      consultationFee: '500,000 VNĐ/buổi',
    },
    {
      id: 2,
      name: 'ThS. Trần Văn Minh',
      specialization: 'Tư vấn Gia đình',
      consultationFee: '600,000 VNĐ/buổi',
    },
    {
      id: 3,
      name: 'TS. Lê Thị Lan',
      specialization: 'Đánh giá IQ & EQ',
      consultationFee: '700,000 VNĐ/buổi',
    },
    {
      id: 4,
      name: 'ThS. Phạm Văn An',
      specialization: 'Tâm lý Trị liệu',
      consultationFee: '800,000 VNĐ/buổi',
    },
  ];

  // Lấy thông tin chuyên gia từ ID
  const expert = expertsData.find(e => e.id === parseInt(id || '1'));

  // Form data
  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    idNumber: user?.idNumber || '',
    address: user?.address || '',
    specialization: '',
    consultationDate: null as any,
    consultationTime: null as any,
    school: user?.school || '',
    grade: user?.grade || '',
    notes: '',
    amount: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State cho địa chỉ
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [wards, setWards] = useState<Location[]>([]);

  // Danh sách lĩnh vực tư vấn
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

  // Load dữ liệu tỉnh thành
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await apiLocation.getProvinceList();
        setProvinces(response.data);
      } catch (error) {
        console.error('Error loading provinces:', error);
      }
    };
    loadProvinces();
  }, []);

  // Xử lý khi chọn tỉnh
  const handleProvinceChange = async (provinceId: string) => {
    setSelectedProvince(provinceId);
    setSelectedWard('');

    if (provinceId && provinceId !== '-1') {
      const province = provinces.find(p => p.id === provinceId);
      if (province && province.parentId) {
        const response = await apiLocation.getWardList(province.parentId);
        setWards(response.data);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };

  // Xử lý khi chọn xã/phường
  const handleWardChange = (wardId: string) => {
    setSelectedWard(wardId);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    }

    if (!formData.specialization) {
      newErrors.specialization = 'Lĩnh vực tư vấn là bắt buộc';
    }

    if (!formData.consultationDate) {
      newErrors.consultationDate = 'Ngày đặt lịch là bắt buộc';
    }

    if (!formData.consultationTime) {
      newErrors.consultationTime = 'Thời gian đặt lịch là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
        dateOfBirth: '',
        idNumber: '',
        address: '',
        specialization: '',
        consultationDate: null,
        consultationTime: null,
        school: '',
        grade: '',
        notes: '',
        amount: '',
      });
      setSelectedProvince('');
      setSelectedWard('');
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
              Đặt lịch tư vấn chuyên gia
            </Typography>
            {expert && (
              <Typography variant="h5" sx={{ opacity: 0.9, mb: 2 }}>
                {expert.name} - {expert.specialization}
              </Typography>
            )}
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Đặt lịch tư vấn với chuyên gia tâm lý chuyên nghiệp
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
            Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          {/* Loại đặt lịch */}
          <Card sx={{ mb: 4, borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Loại đặt lịch
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={bookingType}
                  onChange={e => {
                    const newType = e.target.value as 'self' | 'other';
                    setBookingType(newType);

                    // Tự động fill thông tin khi chọn "Đặt cho mình"
                    if (newType === 'self') {
                      setFormData(prev => ({
                        ...prev,
                        fullName: user?.name || '',
                        phone: user?.phone || '',
                        dateOfBirth: user?.dateOfBirth || '',
                        idNumber: user?.idNumber || '',
                        address: user?.address || '',
                        school: user?.school || '',
                        grade: user?.grade || '',
                      }));
                    } else {
                      // Reset thông tin khi chọn "Đặt hộ"
                      setFormData(prev => ({
                        ...prev,
                        fullName: '',
                        phone: '',
                        dateOfBirth: '',
                        idNumber: '',
                        address: '',
                        school: '',
                        grade: '',
                      }));
                    }
                  }}
                  sx={{ gap: 3 }}
                >
                  <FormControlLabel
                    value="self"
                    control={<Radio />}
                    label="Đặt cho mình"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Đặt hộ"
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Thông tin cá nhân */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Thông tin{' '}
                  {bookingType === 'self' ? 'cá nhân' : 'người được đặt hộ'}
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
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: 'action.disabled' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Số điện thoại *"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    placeholder="0123456789"
                    InputProps={{
                      startAdornment: (
                        <Phone sx={{ mr: 1, color: 'action.disabled' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="vi"
                  >
                    <DatePicker
                      label="Ngày sinh *"
                      format="DD/MM/YYYY"
                      value={
                        formData.dateOfBirth
                          ? dayjs(formData.dateOfBirth)
                          : null
                      }
                      onChange={newValue => {
                        const formatted = newValue
                          ? dayjs(newValue).format('YYYY-MM-DD')
                          : '';
                        handleInputChange('dateOfBirth', formatted);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.dateOfBirth,
                          helperText: errors.dateOfBirth,
                          placeholder: 'dd/mm/yyyy',
                          InputProps: {
                            startAdornment: (
                              <Cake sx={{ mr: 1, color: 'action.disabled' }} />
                            ),
                          },
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    fullWidth
                    label="Số căn cước"
                    value={formData.idNumber}
                    onChange={e =>
                      handleInputChange('idNumber', e.target.value)
                    }
                    placeholder="Nhập số CCCD/CMND"
                    InputProps={{
                      startAdornment: (
                        <Badge sx={{ mr: 1, color: 'action.disabled' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
                    <Select
                      labelId="province-label"
                      value={selectedProvince}
                      label="Tỉnh/Thành phố"
                      onChange={e => handleProvinceChange(e.target.value)}
                      startAdornment={
                        <LocationOn sx={{ mr: 1, color: 'action.disabled' }} />
                      }
                      displayEmpty
                      renderValue={selected => {
                        if (!selected) {
                          return (
                            <span style={{ color: '#757575' }}>
                              Chọn tỉnh/thành phố
                            </span>
                          );
                        }
                        const province = provinces.find(p => p.id === selected);
                        return province ? province.name : '';
                      }}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Chọn tỉnh/thành phố</em>
                      </MenuItem>
                      {provinces.map(province => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    fullWidth
                    disabled={!selectedProvince || selectedProvince === '-1'}
                  >
                    <InputLabel id="ward-label">Xã/Phường</InputLabel>
                    <Select
                      labelId="ward-label"
                      value={selectedWard}
                      label="Xã/Phường"
                      onChange={e => handleWardChange(e.target.value)}
                      startAdornment={
                        <LocationOn sx={{ mr: 1, color: 'action.disabled' }} />
                      }
                      displayEmpty
                      renderValue={selected => {
                        if (!selected) {
                          return (
                            <span style={{ color: '#757575' }}>
                              Chọn xã/phường
                            </span>
                          );
                        }
                        const ward = wards.find(w => w.id === selected);
                        return ward ? ward.name : '';
                      }}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      <MenuItem value="" disabled>
                        <em>Chọn xã/phường</em>
                      </MenuItem>
                      {wards.map(ward => (
                        <MenuItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>

            {/* Thông tin tư vấn */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Thông tin tư vấn
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3,
                  }}
                >
                  <FormControl
                    fullWidth
                    error={!!errors.specialization}
                    required
                  >
                    <InputLabel id="specialization-label">
                      Lĩnh vực tư vấn
                    </InputLabel>
                    <Select
                      labelId="specialization-label"
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
                  </FormControl>

                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="vi"
                  >
                    <DatePicker
                      label="Ngày đặt lịch *"
                      format="DD/MM/YYYY"
                      value={formData.consultationDate}
                      onChange={newValue => {
                        setFormData(prev => ({
                          ...prev,
                          consultationDate: newValue,
                        }));
                        if (errors.consultationDate) {
                          setErrors(prev => ({
                            ...prev,
                            consultationDate: '',
                          }));
                        }
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.consultationDate,
                          helperText: errors.consultationDate,
                          placeholder: 'dd/mm/yyyy',
                          InputProps: {
                            startAdornment: (
                              <CalendarToday
                                sx={{ mr: 1, color: 'action.disabled' }}
                              />
                            ),
                          },
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="vi"
                  >
                    <TimePicker
                      label="Thời gian đặt lịch *"
                      format="HH:mm"
                      value={formData.consultationTime}
                      onChange={newValue => {
                        setFormData(prev => ({
                          ...prev,
                          consultationTime: newValue,
                        }));
                        if (errors.consultationTime) {
                          setErrors(prev => ({
                            ...prev,
                            consultationTime: '',
                          }));
                        }
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.consultationTime,
                          helperText: errors.consultationTime,
                          placeholder: 'hh:mm',
                          InputProps: {
                            startAdornment: (
                              <AccessTime
                                sx={{ mr: 1, color: 'action.disabled' }}
                              />
                            ),
                          },
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>

                  <TextField
                    fullWidth
                    label="Trường"
                    value={formData.school}
                    onChange={e => handleInputChange('school', e.target.value)}
                    placeholder="Nhập tên trường"
                    InputProps={{
                      startAdornment: (
                        <School sx={{ mr: 1, color: 'action.disabled' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Lớp"
                    value={formData.grade}
                    onChange={e => handleInputChange('grade', e.target.value)}
                    placeholder="Nhập lớp"
                    InputProps={{
                      startAdornment: (
                        <School sx={{ mr: 1, color: 'action.disabled' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Giá tư vấn"
                    value={
                      expert
                        ? expert.consultationFee
                        : 'Không có thông tin chuyên gia'
                    }
                    disabled
                    InputProps={{
                      startAdornment: (
                        <AttachMoney sx={{ mr: 1, color: 'action.disabled' }} />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'grey.50',
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Ghi chú"
                    multiline
                    rows={3}
                    value={formData.notes}
                    onChange={e => handleInputChange('notes', e.target.value)}
                    placeholder="Ghi chú thêm về tình trạng hoặc yêu cầu đặc biệt..."
                    InputProps={{
                      startAdornment: (
                        <Note
                          sx={{
                            mr: 1,
                            color: 'action.disabled',
                            alignSelf: 'flex-start',
                            mt: 1,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                      gridColumn: { xs: '1', md: '1 / -1' },
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
              {isSubmitting ? 'Đang gửi...' : 'Đặt lịch tư vấn'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BookingConsultation;
