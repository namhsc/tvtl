import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
} from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

interface BankInfoCardProps {
  bankName: string;
  bankAccount: string;
  onInputChange: (field: string, value: string) => void;
}

const BankInfoCard: React.FC<BankInfoCardProps> = ({
  bankName,
  bankAccount,
  onInputChange,
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
          <AccountBalance sx={{ fontSize: 28 }} />
          Thông tin ngân hàng
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <TextField
              fullWidth
              label="Tên ngân hàng"
              value={bankName}
              onChange={e => onInputChange('bank_name', e.target.value)}
              placeholder="Nhập tên ngân hàng"
              InputProps={{
                startAdornment: (
                  <AccountBalance sx={{ mr: 1, color: 'action.disabled' }} />
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
              label="Số tài khoản"
              value={bankAccount}
              onChange={e => onInputChange('bank_account', e.target.value)}
              placeholder="Nhập số tài khoản"
              InputProps={{
                startAdornment: (
                  <AccountBalance sx={{ mr: 1, color: 'action.disabled' }} />
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

export default BankInfoCard;
