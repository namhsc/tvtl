import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      sx={{
        background: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        padding: '12px 24px',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 128, 255, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'linear-gradient(135deg, #0066CC 0%, #004499 100%)',
          boxShadow: '0 6px 20px rgba(0, 128, 255, 0.4)',
          transform: 'translateY(-2px)',
          color: 'white',
        },
        '&:disabled': {
          background: 'linear-gradient(135deg, #b0b0b0 0%, #909090 100%)',
          boxShadow: 'none',
          transform: 'none',
          color: '#666',
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
