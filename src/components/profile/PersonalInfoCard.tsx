import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {
  Person,
  Phone,
  Email,
  Cake,
  Wc,
  Badge,
  LocationOn,
  Person as StudentIcon,
  FamilyRestroom as ParentIcon,
} from '@mui/icons-material';
import { Location } from '../../services/types/api.types';

interface PersonalInfoCardProps {
  profileData: {
    fullName: string;
    phone: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    ic: string;
    ward: string;
    province: string;
    roles: string[];
  };
  errors: { [key: string]: string };
  provinces: Location[];
  wards: Location[];

  selectedProvince: string;
  selectedWard: string;
  onInputChange: (field: string, value: string) => void;
  onProvinceChange: (provinceId: string) => void;
  onWardChange: (wardId: string) => void;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({
  profileData,
  errors,
  provinces,
  wards,
  selectedProvince,
  selectedWard,
  onInputChange,
  onProvinceChange,
  onWardChange,
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3,
          }}
        >
          <Person sx={{ fontSize: 28 }} />
          Thông tin cá nhân
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Role Selection */}
          <Box sx={{ flex: '1 1 100%', minWidth: 0 }}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  color: 'text.primary',
                }}
              ></FormLabel>
              <RadioGroup
                row
                value={
                  profileData.roles.includes('STUDENT') ? 'STUDENT' : 'PARENT'
                }
                onChange={e => onInputChange('roles', e.target.value)}
                sx={{ gap: 3 }}
              >
                <FormControlLabel
                  value="STUDENT"
                  control={<Radio />}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <StudentIcon
                        sx={{ fontSize: 20, color: 'primary.main' }}
                      />
                      <Typography>Học sinh</Typography>
                    </Box>
                  }
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1rem',
                    },
                  }}
                />
                <FormControlLabel
                  value="PARENT"
                  control={<Radio />}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <ParentIcon
                        sx={{ fontSize: 20, color: 'primary.main' }}
                      />
                      <Typography>Phụ huynh</Typography>
                    </Box>
                  }
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '1rem',
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Full Name */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Họ và tên *"
              value={profileData.fullName}
              onChange={e => onInputChange('fullName', e.target.value)}
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
          </Box>

          {/* Phone */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Số điện thoại *"
              value={profileData.phone}
              disabled={true}
              InputProps={{
                startAdornment: (
                  <Phone sx={{ mr: 1, color: 'action.disabled' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'grey.50',
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Email"
              value={profileData.email}
              onChange={e => onInputChange('email', e.target.value)}
              placeholder="example@email.com"
              InputProps={{
                startAdornment: (
                  <Email sx={{ mr: 1, color: 'action.disabled' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Date of Birth */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Ngày sinh *"
              type="date"
              value={profileData.dateOfBirth}
              onChange={e => onInputChange('dateOfBirth', e.target.value)}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputProps={{
                startAdornment: (
                  <Cake sx={{ mr: 1, color: 'action.disabled' }} />
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Gender */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Giới tính</InputLabel>
              <Select
                labelId="gender-label"
                value={profileData.gender || ''}
                label="Giới tính"
                onChange={e => onInputChange('gender', e.target.value)}
                startAdornment={<Wc sx={{ mr: 1, color: 'action.disabled' }} />}
                sx={{
                  borderRadius: 2,
                }}
                displayEmpty
                renderValue={selected => {
                  if (!selected) {
                    return (
                      <span style={{ color: '#757575' }}>Chọn giới tính</span>
                    );
                  }
                  return selected === 'MALE'
                    ? 'Nam'
                    : selected === 'FEMALE'
                      ? 'Nữ'
                      : '';
                }}
              >
                <MenuItem value="" disabled>
                  <em>Chọn giới tính</em>
                </MenuItem>
                <MenuItem value="MALE">Nam</MenuItem>
                <MenuItem value="FEMALE">Nữ</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* IC */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Số căn cước"
              value={profileData.ic}
              onChange={e => onInputChange('ic', e.target.value)}
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
          </Box>

          {/* Province */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl fullWidth>
              <InputLabel id="province-label">Tỉnh/Thành phố</InputLabel>
              <Select
                labelId="province-label"
                value={selectedProvince}
                label="Tỉnh/Thành phố"
                onChange={e => onProvinceChange(e.target.value)}
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
          </Box>

          {/* Ward */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <FormControl
              fullWidth
              disabled={!selectedProvince || selectedProvince === '-1'}
            >
              <InputLabel id="ward-label">Xã/Phường</InputLabel>
              <Select
                labelId="ward-label"
                value={selectedWard}
                label="Xã/Phường"
                onChange={e => onWardChange(e.target.value)}
                startAdornment={
                  <LocationOn sx={{ mr: 1, color: 'action.disabled' }} />
                }
                displayEmpty
                renderValue={selected => {
                  if (!selected) {
                    return (
                      <span style={{ color: '#757575' }}>Chọn xã/phường</span>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
