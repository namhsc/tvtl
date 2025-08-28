import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const CustomTextField: React.FC<TextFieldProps> = props => {
  return (
    <TextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0080FF',
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0080FF',
              borderWidth: 2,
            },
          },
        },
        '& .MuiInputLabel-root': {
          '&.Mui-focused': {
            color: '#0080FF',
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;
