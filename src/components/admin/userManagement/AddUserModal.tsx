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
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from '@mui/material';
import {
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
  Person,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Location, User } from '../../../services/types/api.types';
import { apiLocation } from '../../../services/apiLocation';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => Promise<void>;
}

// Component Avatar Section
const AvatarSection: React.FC<{
  avatarPreview: string | null;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ avatarPreview, onAvatarChange }) => {
  const getAvatarSrc = () => {
    if (avatarPreview) {
      return avatarPreview;
    }
    return '';
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '400px' },
        flexShrink: 0,
        alignSelf: 'center',
      }}
    >
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
              onChange={onAvatarChange}
            />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Tải lên ảnh đại diện
        </Typography>
      </Box>
    </Box>
  );
};

// Component Role Selection
const RoleSelection: React.FC<{
  selectedRole: string;
  onRoleChange: (role: string) => void;
  error?: string;
}> = ({ selectedRole, onRoleChange, error }) => {
  return (
    <Box>
      <FormControl component="fieldset" error={!!error}>
        <RadioGroup
          row
          value={selectedRole}
          onChange={e => onRoleChange(e.target.value)}
          sx={{ gap: 3 }}
        >
          <FormControlLabel
            value="STUDENT"
            control={<Radio />}
            label="Học sinh"
          />
          <FormControlLabel
            value="PARENT"
            control={<Radio />}
            label="Phụ huynh"
          />
          <FormControlLabel
            value="EXPERT"
            control={<Radio />}
            label="Chuyên gia"
          />
          <FormControlLabel
            value="ADMIN"
            control={<Radio />}
            label="Quản trị viên"
          />
        </RadioGroup>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

// Component Basic Information
const BasicInformation: React.FC<{
  formData: any;
  errors: { [key: string]: string };
  onInputChange: (field: string, value: any) => void;
  provinces: Array<Location>;
  selectedProvince: string;
  wards: Array<Location>;
  onProvinceChange: (provinceId: string) => void;
  onWardChange: (wardId: string) => void;
}> = ({
  formData,
  errors,
  onInputChange,
  provinces,
  selectedProvince,
  wards,
  onProvinceChange,
  onWardChange,
}) => {
  return (
    <>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Thông tin cơ bản
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Họ tên *"
            value={formData.fullName}
            onChange={e => onInputChange('fullName', e.target.value)}
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
            onChange={e => onInputChange('phone', e.target.value)}
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
            onChange={e => onInputChange('email', e.target.value)}
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
            onChange={e => onInputChange('dateOfBirth', e.target.value)}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <FormControl fullWidth size="small" error={!!errors.gender}>
            <InputLabel>Giới tính *</InputLabel>
            <Select
              value={formData.gender}
              label="Giới tính *"
              onChange={e => onInputChange('gender', e.target.value)}
            >
              <MenuItem value="">Chọn giới tính</MenuItem>
              <MenuItem value="MALE">Nam</MenuItem>
              <MenuItem value="FEMALE">Nữ</MenuItem>
            </Select>
            {errors.gender && (
              <FormHelperText error>{errors.gender}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="CMND/CCCD"
            value={formData.ic}
            onChange={e => onInputChange('ic', e.target.value)}
            size="small"
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Autocomplete
            fullWidth
            size="small"
            options={provinces}
            getOptionLabel={option => option.name || ''}
            value={provinces.find(p => p.id === selectedProvince) || null}
            onChange={(_, value) => onProvinceChange(value ? value.id : '')}
            renderInput={params => (
              <TextField
                {...params}
                label="Tỉnh/Thành phố"
                InputLabelProps={{ shrink: true }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="Không tìm thấy tỉnh/thành phố"
          />
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Autocomplete
            fullWidth
            size="small"
            options={wards}
            getOptionLabel={option => option.name || ''}
            value={wards.find(w => w.id === formData.ward) || null}
            onChange={(_, value) => onWardChange(value ? value.id : '')}
            renderInput={params => (
              <TextField
                {...params}
                label="Xã/Phường"
                InputLabelProps={{ shrink: true }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="Không tìm thấy xã/phường"
            disabled={!selectedProvince}
          />
        </Box>
      </Box>
    </>
  );
};

// Component Academic Information
const AcademicInformation: React.FC<{
  formData: any;
  errors: { [key: string]: string };
  onInputChange: (field: string, value: any) => void;
}> = ({ formData, errors, onInputChange }) => {
  return (
    <>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Thông tin học tập
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Trường học *"
            value={formData.school}
            onChange={e => onInputChange('school', e.target.value)}
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
            onChange={e => onInputChange('grade', e.target.value)}
            size="small"
          />
        </Box>
      </Box>
    </>
  );
};

// Component Expert Information
const ExpertInformation: React.FC<{
  formData: any;
  errors: { [key: string]: string };
  onInputChange: (field: string, value: any) => void;
  specializations: string[];
}> = ({ formData, errors, onInputChange, specializations }) => {
  return (
    <>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Thông tin chuyên môn
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <FormControl fullWidth size="small" error={!!errors.specialization}>
            <InputLabel>Lĩnh vực tư vấn *</InputLabel>
            <Select
              value={formData.specialization}
              label="Lĩnh vực tư vấn *"
              onChange={e => onInputChange('specialization', e.target.value)}
            >
              {specializations.map(spec => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
            {errors.specialization && (
              <FormHelperText error>{errors.specialization}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>

      <Box>
        <TextField
          fullWidth
          label="Giới thiệu bản thân"
          multiline
          rows={4}
          value={formData.introduction}
          onChange={e => onInputChange('introduction', e.target.value)}
          placeholder="Giới thiệu về kinh nghiệm, chuyên môn và phương pháp tư vấn..."
          size="small"
        />
      </Box>
    </>
  );
};

// Component Professional Documents
const ProfessionalDocuments: React.FC<{
  formData: any;
  onInputChange: (field: string, value: any) => void;
}> = ({ formData, onInputChange }) => {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Có thể xử lý file upload ở đây
      onInputChange(field, file.name); // Tạm thời lưu tên file
    }
  };

  return (
    <>
      <Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Giấy tờ chuyên môn
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <FormControl fullWidth size="small">
            <InputLabel>Bằng cấp chuyên môn</InputLabel>
            <Select
              value={formData.professionalDegree || ''}
              label="Bằng cấp chuyên môn"
              onChange={e =>
                onInputChange('professionalDegree', e.target.value)
              }
            >
              <MenuItem value="">Chọn bằng cấp</MenuItem>
              <MenuItem value="BACHELOR">Cử nhân</MenuItem>
              <MenuItem value="MASTER">Thạc sĩ</MenuItem>
              <MenuItem value="DOCTORATE">Tiến sĩ</MenuItem>
              <MenuItem value="CERTIFICATION">Chứng chỉ</MenuItem>
              <MenuItem value="OTHER">Khác</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Năm tốt nghiệp"
            type="number"
            value={formData.graduationYear || ''}
            onChange={e => onInputChange('graduationYear', e.target.value)}
            size="small"
            inputProps={{ min: 1950, max: new Date().getFullYear() }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Trường đào tạo"
            value={formData.trainingInstitution || ''}
            onChange={e => onInputChange('trainingInstitution', e.target.value)}
            size="small"
          />
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Số năm kinh nghiệm"
            type="number"
            value={formData.experienceYears || ''}
            onChange={e => onInputChange('experienceYears', e.target.value)}
            size="small"
            inputProps={{ min: 0, max: 50 }}
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<PhotoCameraIcon />}
            sx={{ height: 56 }}
          >
            Tải bằng cấp
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={e => handleFileChange(e, 'degreeCertificate')}
            />
          </Button>
          {formData.degreeCertificate && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              Đã chọn: {formData.degreeCertificate}
            </Typography>
          )}
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Button
            component="label"
            variant="outlined"
            fullWidth
            size="small"
            startIcon={<PhotoCameraIcon />}
            sx={{ height: 56 }}
          >
            Tải chứng chỉ hành nghề
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={e => handleFileChange(e, 'professionalLicense')}
            />
          </Button>
          {formData.professionalLicense && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: 'block' }}
            >
              Đã chọn: {formData.professionalLicense}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          component="label"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<PhotoCameraIcon />}
          sx={{ height: 56 }}
        >
          Tải CV/Portfolio
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={e => handleFileChange(e, 'cvPortfolio')}
          />
        </Button>
        {formData.cvPortfolio && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: 'block' }}
          >
            Đã chọn: {formData.cvPortfolio}
          </Typography>
        )}
      </Box>
    </>
  );
};

// Component Bank Information
const BankInformation: React.FC<{
  formData: any;
  onInputChange: (field: string, value: any) => void;
}> = ({ formData, onInputChange }) => {
  return (
    <>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Thông tin ngân hàng
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Tên ngân hàng"
            value={formData.bank_name}
            onChange={e => onInputChange('bank_name', e.target.value)}
            size="small"
          />
        </Box>

        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <TextField
            fullWidth
            label="Số tài khoản"
            value={formData.bank_account}
            onChange={e => onInputChange('bank_account', e.target.value)}
            size="small"
          />
        </Box>
      </Box>
    </>
  );
};

// Main Component
const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
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
    // Thêm các trường cho chuyên gia
    specialization: '',
    introduction: '',
    // Thêm các trường giấy tờ chuyên môn
    professionalDegree: '',
    graduationYear: '',
    trainingInstitution: '',
    experienceYears: '',
    degreeCertificate: '',
    professionalLicense: '',
    cvPortfolio: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State cho địa chỉ
  const [provinces, setProvinces] = useState<Array<Location>>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [wards, setWards] = useState<Array<Location>>([]);

  // Danh sách chuyên môn cho chuyên gia
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

  // Load wards khi có selectedProvince
  useEffect(() => {
    const loadWards = async () => {
      if (selectedProvince && selectedProvince !== '-1') {
        const response = await apiLocation.getWardList(selectedProvince);
        if (response.data) {
          setWards(
            response.data.map(ward => ({
              id: ward.id,
              name: ward.name,
              parentId: ward.parentId,
            }))
          );
        } else {
          setWards([]);
        }
      } else {
        setWards([]);
      }
    };
    loadWards();
  }, [selectedProvince]);

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

    if (!formData.gender) {
      newErrors.gender = 'Giới tính là bắt buộc';
    }

    if (formData.roles.includes('STUDENT') && !formData.school.trim()) {
      newErrors.school = 'Trường là bắt buộc cho học sinh';
    }

    if (formData.roles.includes('EXPERT') && !formData.specialization.trim()) {
      newErrors.specialization =
        'Lĩnh vực chuyên môn là bắt buộc cho chuyên gia';
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
        avatar: avatarPreview || '',
        gender: formData.gender || undefined,
      };

      await onSave(userData);

      // Reset form và đóng modal
      handleClose();
    } catch (err: any) {
      setError(err?.message || 'Có lỗi xảy ra khi thêm người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      dateOfBirth: '',
      gender: '',
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
      specialization: '',
      introduction: '',
      professionalDegree: '',
      graduationYear: '',
      trainingInstitution: '',
      experienceYears: '',
      degreeCertificate: '',
      professionalLicense: '',
      cvPortfolio: '',
    });
    setErrors({});
    setAvatarPreview(null);
    setSelectedProvince('');
    setError(null);
    onClose();
  };

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
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Thêm mới người dùng
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{ position: 'absolute', right: 16, top: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider sx={{ mb: 2 }} />
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
            flexDirection: 'column',
          }}
        >
          {/* Avatar Section */}
          <AvatarSection
            avatarPreview={avatarPreview}
            onAvatarChange={handleAvatarChange}
          />

          {/* Role Selection */}
          <RoleSelection
            selectedRole={formData.roles[0]}
            onRoleChange={role => handleInputChange('roles', role)}
            error={errors.roles}
          />

          {/* Form Fields */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Basic Information - Luôn hiển thị */}
              <BasicInformation
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                provinces={provinces}
                selectedProvince={selectedProvince}
                wards={wards}
                onProvinceChange={handleProvinceChange}
                onWardChange={handleWardChange}
              />

              {/* Academic Information - Chỉ hiển thị cho Học sinh */}
              {formData.roles.includes('STUDENT') && (
                <AcademicInformation
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              )}

              {/* Expert Information - Chỉ hiển thị cho Chuyên gia */}
              {formData.roles.includes('EXPERT') && (
                <>
                  <ExpertInformation
                    formData={formData}
                    errors={errors}
                    onInputChange={handleInputChange}
                    specializations={specializations}
                  />
                  <ProfessionalDocuments
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                </>
              )}

              {/* Bank Information - Hiển thị cho Học sinh, Phụ huynh và Chuyên gia */}
              {(formData.roles.includes('STUDENT') ||
                formData.roles.includes('PARENT') ||
                formData.roles.includes('EXPERT')) && (
                <BankInformation
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              )}
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
          {loading ? 'Đang lưu...' : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
