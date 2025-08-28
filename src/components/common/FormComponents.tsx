import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
  Paper,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import {
  Search,
  Clear,
  FilterList,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale/vi';

// Search Input Component
interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Tìm kiếm...',
  value,
  onChange,
  onSearch,
  onClear,
  fullWidth = true,
  size = 'medium',
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <TextField
      fullWidth={fullWidth}
      size={size}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={onClear} edge="end">
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
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
      }}
    />
  );
};

// Multi Select Component
interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  fullWidth = true,
  size = 'medium',
}) => {
  return (
    <FormControl fullWidth={fullWidth} size={size}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={e =>
          onChange(
            typeof e.target.value === 'string'
              ? e.target.value.split(',')
              : e.target.value
          )
        }
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => {
              const option = options.find(opt => opt.value === value);
              return (
                <Chip
                  key={value}
                  label={option?.label || value}
                  size="small"
                  sx={{ backgroundColor: '#0080FF20', color: '#0080FF' }}
                />
              );
            })}
          </Box>
        )}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

// Date Range Picker Component
interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  fullWidth?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  fullWidth = true,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <DatePicker
          label="Từ ngày"
          value={startDate}
          onChange={newValue => onStartDateChange(newValue as Date | null)}
          slotProps={{
            textField: {
              fullWidth,
              size: 'small',
              sx: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              },
            },
          }}
        />
        <Typography variant="body2" color="text.secondary">
          đến
        </Typography>
        <DatePicker
          label="Đến ngày"
          value={endDate}
          onChange={newValue => onEndDateChange(newValue as Date | null)}
          slotProps={{
            textField: {
              fullWidth,
              size: 'small',
              sx: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

// Filter Panel Component
interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'multiSelect' | 'radio' | 'slider' | 'dateRange';
  options?: { value: string; label: string }[];
  value: any;
  onChange: (value: any) => void;
}

interface FilterPanelProps {
  filters: FilterOption[];
  title?: string;
  expanded?: boolean;
  onToggle?: () => void;
  onReset?: () => void;
  onApply?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  title = 'Bộ lọc',
  expanded = false,
  onToggle,
  onReset,
  onApply,
}) => {
  const theme = useTheme();

  const renderFilter = (filter: FilterOption) => {
    switch (filter.type) {
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={filter.value}
              onChange={e => filter.onChange(e.target.value)}
              input={<OutlinedInput label={filter.label} />}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            >
              {filter.options?.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'multiSelect':
        return (
          <MultiSelect
            label={filter.label}
            options={filter.options || []}
            value={filter.value || []}
            onChange={filter.onChange}
          />
        );

      case 'radio':
        return (
          <FormControl component="fieldset">
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {filter.label}
            </Typography>
            <RadioGroup
              value={filter.value}
              onChange={e => filter.onChange(e.target.value)}
            >
              {filter.options?.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'slider':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {filter.label}
            </Typography>
            <Slider
              value={filter.value}
              onChange={(_, value) => filter.onChange(value)}
              valueLabelDisplay="auto"
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: theme.palette.primary.main,
                },
                '& .MuiSlider-track': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: expanded ? 2 : 0,
          cursor: 'pointer',
        }}
        onClick={onToggle}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList color="action" />
          <Typography variant="h6">{title}</Typography>
        </Box>
        {onToggle && (
          <IconButton size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      {expanded && (
        <>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {filters.map(filter => (
              <Box
                key={filter.key}
                sx={{
                  flex: '1 1 300px',
                  minWidth: '300px',
                }}
              >
                {renderFilter(filter)}
              </Box>
            ))}
          </Box>

          {(onReset || onApply) && (
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mt: 2,
                justifyContent: 'flex-end',
              }}
            >
              {onReset && (
                <Button variant="outlined" size="small" onClick={onReset}>
                  Đặt lại
                </Button>
              )}
              {onApply && (
                <Button variant="contained" size="small" onClick={onApply}>
                  Áp dụng
                </Button>
              )}
            </Box>
          )}
        </>
      )}
    </Paper>
  );
};

// Form Section Component
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  subtitle,
  collapsible = false,
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: expanded ? 2 : 0,
          cursor: collapsible ? 'pointer' : 'default',
        }}
        onClick={() => collapsible && setExpanded(!expanded)}
      >
        <Box>
          <Typography variant="h6" gutterBottom={!!subtitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {collapsible && (
          <IconButton size="small">
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      {expanded && children}
    </Paper>
  );
};

// Form Row Component
interface FormRowProps {
  children: React.ReactNode;
  spacing?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
}

export const FormRow: React.FC<FormRowProps> = ({
  children,
  spacing = 2,
  alignItems = 'center',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing,
        alignItems: alignItems,
      }}
    >
      {React.Children.map(children, child => (
        <Box
          sx={{
            flex: '1 1 300px',
            minWidth: '300px',
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};
