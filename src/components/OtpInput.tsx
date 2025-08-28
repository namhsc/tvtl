import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface OtpInputProps {
  length?: number;
  onComplete?: (otpCode: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onComplete,
  disabled = false,
  error = false,
  helperText,
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(
    new Array(length).fill('')
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  // Check if OTP is complete - memoized callback to prevent unnecessary re-renders
  const handleComplete = useCallback((otpCode: string) => {
    onComplete?.(otpCode);
  }, [onComplete]);

  // Check if OTP is complete
  useEffect(() => {
    const isComplete = otpValues.every(value => value !== '');
    if (isComplete) {
      const otpCode = otpValues.join('');
      handleComplete(otpCode);
    }
  }, [otpValues, handleComplete]);

  // Handle input change
  const handleInputChange = useCallback(
    (index: number, value: string) => {
      // Only allow single digit
      if (value.length > 1) {
        value = value.slice(-1);
      }

      // Only allow numbers
      if (!/^\d*$/.test(value)) {
        return;
      }

      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto-advance to next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otpValues, length]
  );

  // Handle key down events
  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();

        if (otpValues[index]) {
          // Clear current input
          const newOtpValues = [...otpValues];
          newOtpValues[index] = '';
          setOtpValues(newOtpValues);
        } else if (index > 0) {
          // Move to previous input and clear it
          inputRefs.current[index - 1]?.focus();
          const newOtpValues = [...otpValues];
          newOtpValues[index - 1] = '';
          setOtpValues(newOtpValues);
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otpValues, length]
  );

  // Handle paste event
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain');
      const numbers = pastedData.replace(/\D/g, '').slice(0, length);

      if (numbers.length === length) {
        const newOtpValues = numbers.split('');
        setOtpValues(newOtpValues);

        // Focus last input
        inputRefs.current[length - 1]?.focus();
      }
    },
    [length]
  );

  // Handle click to select all text
  const handleClick = useCallback((index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.select();
    }
  }, []);

  // Reset function (for external use) - memoized
  const reset = useCallback(() => {
    setOtpValues(new Array(length).fill(''));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [length]);

  // Clear function (for external use) - memoized
  const clear = useCallback(() => {
    setOtpValues(new Array(length).fill(''));
  }, [length]);

  // Get current value (for external use) - memoized
  const getValue = useCallback(() => {
    return otpValues.join('');
  }, [otpValues]);

  // Check if complete (for external use) - memoized
  const isComplete = useCallback(() => {
    return otpValues.every(value => value !== '');
  }, [otpValues]);

  // Memoize utility functions to prevent unnecessary re-creation
  const otpInputUtils = useMemo(() => ({
    clear,
    getValue,
    isComplete,
    reset,
  }), [clear, getValue, isComplete, reset]);

  // Expose functions to window for external access - only once
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).resetOtpInput = reset;
      (window as any).otpInputUtils = otpInputUtils;
    }

    // Cleanup function to remove from window object
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).resetOtpInput;
        delete (window as any).otpInputUtils;
      }
    };
  }, [reset, otpInputUtils]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        {otpValues.map((value, index) => (
          <TextField
            key={index}
            inputRef={el => (inputRefs.current[index] = el)}
            value={value}
            onChange={e => handleInputChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onClick={() => handleClick(index)}
            disabled={disabled}
            error={error}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '12px 8px',
                width: '40px',
                height: '40px',
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                width: '50px',
                height: '50px',
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  },
                },
              },
            }}
          />
        ))}
      </Box>
      {helperText && (
        <Typography
          variant="caption"
          color={error ? 'error' : 'text.secondary'}
          sx={{ textAlign: 'center' }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default OtpInput;
