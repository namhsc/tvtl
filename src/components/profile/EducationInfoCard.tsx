import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
} from '@mui/material';
import { School } from '@mui/icons-material';

interface EducationInfoCardProps {
  school: string;
  grade: string;
  onInputChange: (field: string, value: string) => void;
  errors: { [key: string]: string };
}

const EducationInfoCard: React.FC<EducationInfoCardProps> = ({
  school,
  grade,
  onInputChange,
  errors,
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
          <School sx={{ fontSize: 28 }} />
          Thông tin học vấn
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Trường *"
              value={school}
              onChange={e => onInputChange('school', e.target.value)}
              error={!!errors.school}
              helperText={errors.school}
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
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Lớp/Khóa"
              value={grade}
              onChange={e => onInputChange('grade', e.target.value)}
              placeholder="Nhập lớp hoặc khóa học"
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EducationInfoCard;
