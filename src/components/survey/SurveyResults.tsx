import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  Divider,
  Button,
} from '@mui/material';
import { Star, Lightbulb, Person } from '@mui/icons-material';
import SurveyRadarChart from './SurveyRadarChart';

interface RadarData {
  name: string;
  value: number;
}

interface SurveyResult {
  title: string;
  score: number;
  level: string;
  conclusion: string;
  radarData: RadarData[];
  advice: string[];
}

interface SurveyResultsProps {
  result: SurveyResult;
  color: string;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ result, color }) => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        {/* Kết quả chính */}
        <Box sx={{ flex: { xs: 1, md: 2 } }}>
          <Card sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Kết luận
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {result.conclusion}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 2,
                  }}
                >
                  <Star />
                  <Typography variant="h6" fontWeight="bold">
                    Điểm: {result.score}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Biểu đồ đánh giá
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <SurveyRadarChart data={result.radarData} color={color} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Lời khuyên */}
        <Box sx={{ flex: { xs: 1, md: 1 } }}>
          <Card sx={{ borderRadius: 3, height: 'fit-content' }}>
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 3,
                }}
              >
                <Lightbulb sx={{ color: 'warning.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Lời khuyên
                </Typography>
              </Box>

              <Stack spacing={2}>
                {result.advice.map((advice, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      p: 2,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
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
                    <Typography variant="body2">{advice}</Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Nút đặt lịch tư vấn */}
              <Button
                variant="contained"
                startIcon={<Person />}
                component={Link}
                to="/booking-consultation"
                fullWidth
                sx={{
                  bgcolor: color,
                  borderRadius: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: color,
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                }}
              >
                Đặt lịch tư vấn
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default SurveyResults;
