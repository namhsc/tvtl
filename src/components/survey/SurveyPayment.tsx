import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import SurveyHero from './SurveyHero';

interface Survey {
  id: number;
  title: string;
  description: string;
  price: number;
  gradient: string;
}

interface SurveyPaymentProps {
  survey: Survey;
  onPaymentSuccess: () => void;
  onBackToSurvey: () => void;
}

const SurveyPayment: React.FC<SurveyPaymentProps> = ({
  survey,
  onPaymentSuccess,
  onBackToSurvey,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleCopy = (text: string, label: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log(`${label} đã được copy!`);
    } catch (err) {
      console.error('Lỗi khi copy:', err);
    }
  };

  return (
    <Box>
      <SurveyHero
        title="Thanh toán để xem kết quả"
        subtitle="Hoàn thành thanh toán để nhận kết quả chi tiết"
        gradient={survey.gradient}
      />

      {/* Payment Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 4,
          }}
        >
          {/* Cột 1: Thông tin chuyển khoản */}
          <Box sx={{ flex: { xs: 1, lg: 1 } }}>
            <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                {/* Thông tin khảo sát */}
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {survey.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {survey.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* QR Code */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      bgcolor: 'grey.100',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed',
                      borderColor: 'grey.300',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      QR Code
                    </Typography>
                  </Box>
                </Box>

                {/* Thông tin ngân hàng */}
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Thông tin tài khoản
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    {/* Ngân hàng */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Ngân hàng:
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          Vietcombank
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleCopy('Vietcombank', 'Ngân hàng')}
                          sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                              color: 'white',
                            },
                          }}
                        >
                          <ContentCopy sx={{ fontSize: '1rem' }} />
                        </Button>
                      </Box>
                    </Box>

                    {/* Số tài khoản */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Số tài khoản:
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          1234567890
                        </Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            handleCopy('1234567890', 'Số tài khoản')
                          }
                          sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                              color: 'white',
                            },
                          }}
                        >
                          <ContentCopy sx={{ fontSize: '1rem' }} />
                        </Button>
                      </Box>
                    </Box>

                    {/* Chủ tài khoản */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Chủ tài khoản:
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          CÔNG TY TVTL
                        </Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            handleCopy('CÔNG TY TVTL', 'Chủ tài khoản')
                          }
                          sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                              color: 'white',
                            },
                          }}
                        >
                          <ContentCopy sx={{ fontSize: '1rem' }} />
                        </Button>
                      </Box>
                    </Box>

                    {/* Nội dung */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Nội dung:
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          TVTL_{survey.id}_{Date.now()}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            handleCopy(
                              `TVTL_${survey.id}_${Date.now()}`,
                              'Nội dung'
                            )
                          }
                          sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                              color: 'white',
                            },
                          }}
                        >
                          <ContentCopy sx={{ fontSize: '1rem' }} />
                        </Button>
                      </Box>
                    </Box>

                    {/* Số tiền */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        Số tiền:
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {formatPrice(survey.price)}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            handleCopy(formatPrice(survey.price), 'Số tiền')
                          }
                          sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                              color: 'white',
                            },
                          }}
                        >
                          <ContentCopy sx={{ fontSize: '1rem' }} />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Cột 2: Hướng dẫn thanh toán */}
          <Box sx={{ flex: { xs: 1, lg: 1 } }}>
            <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Hướng dẫn thanh toán
                </Typography>

                {/* Hướng dẫn chi tiết */}
                <Box
                  sx={{
                    py: 3,
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    {[
                      'Quét mã QR hoặc chuyển khoản theo thông tin bên cạnh',
                      'Nhập nội dung chuyển khoản chính xác',
                      'Sau khi thanh toán thành công, nhấn nút "Đã thanh toán"',
                      'Hệ thống sẽ kiểm tra và hiển thị kết quả khảo sát',
                    ].map((step, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            flexShrink: 0,
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Typography variant="body2">{step}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Nút xác nhận */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={onPaymentSuccess}
                    fullWidth
                    sx={{
                      bgcolor: '#0080FF',
                      borderRadius: 2,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: '#0080FF',
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    Đã thanh toán - Xem kết quả
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    onClick={onBackToSurvey}
                    fullWidth
                    sx={{
                      borderColor: '#0080FF',
                      color: '#0080FF',
                      borderRadius: 2,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: '#0080FF',
                        bgcolor: '#0080FF10',
                        transform: 'translateY(-2px)',
                        boxShadow: 2,
                      },
                    }}
                  >
                    Quay lại bài khảo sát
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SurveyPayment;
