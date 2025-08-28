import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Fade } from '@mui/material';
import { User } from '../../../services/types/api.types';

interface EditUserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
  onUserChange: (updatedUser: User) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  user,
  onClose,
  onSave,
  onUserChange,
}) => {
  if (!user) return null;

  const handleFieldChange = (field: keyof User, value: any) => {
    onUserChange({ ...user, [field]: value });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Họ và tên"
              value={user.fullName || ''}
              onChange={e => handleFieldChange('fullName', e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              value={user.email || ''}
              onChange={e => handleFieldChange('email', e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={user.active || false}
                  onChange={e => handleFieldChange('active', e.target.checked)}
                />
              }
              label="Tài khoản hoạt động"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={() => onSave(user)} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
