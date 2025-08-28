import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

interface FormFieldProps {
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  _multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  sx?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  _multiline = false,
  rows = 4,
  fullWidth = true,
  sx,
}) => {
  const handleChange = (event: any) => {
    onChange(event.target.value as string);
  };

  if (type === 'select') {
    return (
      <FormControl
        fullWidth={fullWidth}
        error={!!error}
        required={required}
        sx={sx}
      >
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }

  if (type === 'textarea') {
    return (
      <TextField
        fullWidth={fullWidth}
        label={label}
        value={value}
        onChange={handleChange}
        error={!!error}
        helperText={error}
        required={required}
        placeholder={placeholder}
        multiline
        rows={rows}
        sx={sx}
      />
    );
  }

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      required={required}
      placeholder={placeholder}
      sx={sx}
    />
  );
};

export default FormField;
