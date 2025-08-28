import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Typography,
  FormHelperText,
  CircularProgress,
  Alert,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
  Person,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Location, User } from '../../../services/types/api.types';
import { apiLocation } from '../../../services/apiLocation';

interface EditUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (userData: Partial<User>) => Promise<void>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  user,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // State cho form
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '' as 'MALE' | 'FEMALE' | '',
    ic: '',
    ward: '',
    province: '',
    school: '',
    grade: '',
    point: 0,
    referralCode: '',
    roles: ['STUDENT'],
    bank_name: '',
    bank_account: '',
    active: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State cho địa chỉ
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [wards, setWards] = useState<Location[]>([]);

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

  // Load wards khi có selectedProvince
  useEffect(() => {
    const loadWards = async () => {
      if (selectedProvince && selectedProvince !== '-1') {
        const province = provinces.find(p => p.id === selectedProvince);
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
    loadWards();
  }, [selectedProvince, provinces]);

  // Cập nhật form data khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phone: user.phone || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        ic: user.ic || '',
        ward: user.ward || '',
        province: user.province || '',
        school: user.school || '',
        grade: user.grade || '',
        point: user.point || 0,
        referralCode: user.referralCode || '',
        roles: user.roles || ['STUDENT'],
        bank_name: user.bank_name || '',
        bank_account: user.bank_account || '',
        active: user.active !== undefined ? user.active : true,
      });
      setSelectedProvince(user.province || '');
      setAvatarPreview(null);
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    }

    if (formData.roles.includes('STUDENT') && !formData.school.trim()) {
      newErrors.school = 'Trường là bắt buộc cho học sinh';
    }

    if (!formData.roles.length) {
      newErrors.roles = 'Vai trò là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    if (field === 'roles') {
      setFormData(prev => ({
        ...prev,
        roles: [value],
      }));
    } else if (field === 'point') {
      setFormData(prev => ({
        ...prev,
        [field]: Number(value) || 0,
      }));
    } else if (field === 'gender') {
      setFormData(prev => ({
        ...prev,
        [field]: value as 'MALE' | 'FEMALE' | '',
      }));
    } else if (field === 'active') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error khi user nhập
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleProvinceChange = (provinceId: string) => {
    setSelectedProvince(provinceId);
    setFormData(prev => ({
      ...prev,
      province: provinceId,
      ward: '',
    }));
  };

  const handleWardChange = (wardId: string) => {
    setFormData(prev => ({
      ...prev,
      ward: wardId,
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new (window as any).FileReader();
      reader.onload = (e: any) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userData = {
        ...formData,
        avatar: avatarPreview || user?.avatar || '',
        gender: formData.gender || undefined,
      };

      await onSave(userData);

      // Reset form và đóng modal
      handleClose();
    } catch (err: any) {
      setError(err?.message || 'Có lỗi xảy ra khi cập nhật người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setAvatarPreview(null);
    setError(null);
    onClose();
  };

  const getAvatarSrc = () => {
    if (avatarPreview) {
      return avatarPreview;
    }
    if (user?.avatar) {
      return user.avatar;
    }
    return '';
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, pb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            Chỉnh sửa người dùng
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, pt: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {/* Avatar Section */}
          <Box sx={{ width: { xs: '100%', md: '400px' }, flexShrink: 0 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={getAvatarSrc() || undefined}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    bgcolor: 'white',
                    color: !getAvatarSrc() ? 'white' : 'transparent',
                    fontSize: !getAvatarSrc() ? 60 : 'inherit',
                  }}
                >
                  {!getAvatarSrc() && (
                    <Person sx={{ fontSize: 60, color: 'primary.main' }} />
                  )}
                </Avatar>

                <IconButton
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    bgcolor: 'grey.500',
                    color: 'white',
                    width: 36,
                    height: 36,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  <PhotoCameraIcon />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Cập nhật ảnh đại diện
              </Typography>

              {/* Trạng thái hoạt động */}
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.active}
                      onChange={e =>
                        handleInputChange('active', e.target.checked)
                      }
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" fontWeight="medium">
                      {formData.active ? 'Đang hoạt động' : 'Đã khóa'}
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Box>

          {/* Form Fields */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Thông tin cơ bản */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Thông tin cơ bản
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Họ tên *"
                    value={formData.fullName}
                    onChange={e =>
                      handleInputChange('fullName', e.target.value)
                    }
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    size="small"
                  />
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Số điện thoại *"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    size="small"
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    size="small"
                  />
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Ngày sinh *"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={e =>
                      handleInputChange('dateOfBirth', e.target.value)
                    }
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Giới tính</InputLabel>
                    <Select
                      value={formData.gender}
                      label="Giới tính"
                      onChange={e =>
                        handleInputChange('gender', e.target.value)
                      }
                    >
                      <MenuItem value="">Chọn giới tính</MenuItem>
                      <MenuItem value="MALE">Nam</MenuItem>
                      <MenuItem value="FEMALE">Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="CMND/CCCD"
                    value={formData.ic}
                    onChange={e => handleInputChange('ic', e.target.value)}
                    size="small"
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Tỉnh/Thành phố</InputLabel>
                    <Select
                      value={selectedProvince}
                      label="Tỉnh/Thành phố"
                      onChange={e => handleProvinceChange(e.target.value)}
                    >
                      <MenuItem value="">Chọn tỉnh/thành phố</MenuItem>
                      {provinces.map(province => (
                        <MenuItem key={province.id} value={province.id}>
                          {province.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Xã/Phường</InputLabel>
                    <Select
                      value={formData.ward}
                      label="Xã/Phường"
                      onChange={e => handleWardChange(e.target.value)}
                      disabled={!selectedProvince}
                    >
                      <MenuItem value="">Chọn xã/phường</MenuItem>
                      {wards.map(ward => (
                        <MenuItem key={ward.id} value={ward.id}>
                          {ward.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Vai trò *</InputLabel>
                    <Select
                      value={formData.roles[0]}
                      label="Vai trò *"
                      onChange={e => handleInputChange('roles', e.target.value)}
                      error={!!errors.roles}
                    >
                      <MenuItem value="STUDENT">Học sinh</MenuItem>
                      <MenuItem value="PARENT">Phụ huynh</MenuItem>
                      <MenuItem value="EXPERT">Chuyên gia</MenuItem>
                      <MenuItem value="ADMIN">Quản trị viên</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.roles && (
                    <FormHelperText error>{errors.roles}</FormHelperText>
                  )}
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Điểm"
                    type="number"
                    value={formData.point}
                    onChange={e => handleInputChange('point', e.target.value)}
                    size="small"
                  />
                </Box>
              </Box>

              {/* Thông tin học tập */}
              {formData.roles.includes('STUDENT') && (
                <>
                  <Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Thông tin học tập
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <TextField
                        fullWidth
                        label="Trường học *"
                        value={formData.school}
                        onChange={e =>
                          handleInputChange('school', e.target.value)
                        }
                        error={!!errors.school}
                        helperText={errors.school}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                      <TextField
                        fullWidth
                        label="Lớp"
                        value={formData.grade}
                        onChange={e =>
                          handleInputChange('grade', e.target.value)
                        }
                        size="small"
                      />
                    </Box>
                  </Box>
                </>
              )}

              {/* Thông tin ngân hàng */}
              <Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Thông tin ngân hàng
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Tên ngân hàng"
                    value={formData.bank_name}
                    onChange={e =>
                      handleInputChange('bank_name', e.target.value)
                    }
                    size="small"
                  />
                </Box>

                <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                  <TextField
                    fullWidth
                    label="Số tài khoản"
                    value={formData.bank_account}
                    onChange={e =>
                      handleInputChange('bank_account', e.target.value)
                    }
                    size="small"
                  />
                </Box>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Mã giới thiệu"
                  value={formData.referralCode}
                  onChange={e =>
                    handleInputChange('referralCode', e.target.value)
                  }
                  size="small"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
