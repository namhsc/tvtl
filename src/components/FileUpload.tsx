import React from 'react';
import { Box, Typography, IconButton, FormHelperText } from '@mui/material';
import { CloudUpload, Delete, Description } from '@mui/icons-material';
import { formatFileSize } from '../utils/formatters';

interface FileUploadProps {
  file: any | null;
  fileName: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
  error?: string;
  accept?: string;
  maxSize?: number; // in bytes
  title?: string;
  description?: string;
  _color?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  fileName,
  onFileChange,
  onFileRemove,
  error,
  accept = '.pdf',
  maxSize = 20 * 1024 * 1024, // 20MB default
  title = 'Upload file',
  description = `Chỉ chấp nhận file ${accept}, tối đa ${formatFileSize(maxSize)}`,
  _color = '#0080FF',
}) => {
  return (
    <Box>
      <Box
        sx={{
          border: '2px dashed',
          borderColor: error ? 'error.main' : 'primary.main',
          borderRadius: 3,
          p: 4,
          textAlign: 'center',
          bgcolor: error ? 'error.light' : 'rgba(0, 128, 255, 0.05)',
          position: 'relative',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            borderColor: error ? 'error.dark' : 'primary.dark',
            bgcolor: error ? 'error.light' : 'rgba(0, 128, 255, 0.1)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 128, 255, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        <input
          type="file"
          accept={accept}
          onChange={onFileChange}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            top: 0,
            left: 0,
          }}
        />

        {!file ? (
          <Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 4px 20px rgba(0, 128, 255, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 25px rgba(0, 128, 255, 0.4)',
                },
              }}
            >
              <CloudUpload
                sx={{
                  fontSize: 36,
                  color: 'white',
                }}
              />
            </Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 2,
                  bgcolor: 'primary.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Description sx={{ color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {fileName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={onFileRemove}
              sx={{
                bgcolor: 'error.light',
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'error.main',
                  color: 'white',
                },
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
      {error && (
        <FormHelperText
          error
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'error.main',
            }}
          />
          {error}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FileUpload;
