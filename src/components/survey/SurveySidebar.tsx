import React from 'react';
import { Paper, Typography, Box, Divider, LinearProgress } from '@mui/material';

interface SurveySidebarProps {
  survey: {
    isFree: boolean;
    price: number;
    questions: number;
    color: string;
  };
  answeredQuestions: number;
  totalQuestions: number;
  progress: number;
  questionsList: Array<{ id: number }>;
  answers: Record<number, string>;
}

const SurveySidebar: React.FC<SurveySidebarProps> = ({
  survey,
  answeredQuestions,
  totalQuestions,
  progress,
  questionsList,
  answers,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const scrollToQuestion = (questionId: number) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        position: 'sticky',
        top: 100,
        height: 'fit-content',
      }}
    >
      {/* Thông tin khảo sát */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Thông tin khảo sát
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            • Loại: {survey.isFree ? 'Miễn phí' : 'Trả phí'}
          </Typography>
          {!survey.isFree && (
            <Typography variant="body2" color="text.secondary">
              • Phí: {formatPrice(survey.price)}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            • Số câu hỏi: {survey.questions}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Hướng dẫn */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Hướng dẫn khảo sát
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Đọc kỹ câu hỏi trước khi trả lời
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Chọn đáp án phù hợp nhất với tình huống của bạn
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Bạn có thể quay lại chỉnh sửa bất cứ lúc nào
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Sử dụng ô số bên cạnh để di chuyển nhanh
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Hoàn thành tất cả để nhận kết quả chi tiết
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Tiến độ */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Tiến độ khảo sát
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Đã trả lời
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {answeredQuestions}/{totalQuestions}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: survey.color,
            },
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Navigation */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Danh sách câu hỏi
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
        }}
      >
        {questionsList.map((question, index) => (
          <Box
            key={question.id}
            onClick={() => scrollToQuestion(question.id)}
            sx={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 2,
              borderColor: answers[question.id] ? survey.color : 'grey.300',
              bgcolor: answers[question.id] ? survey.color : 'transparent',
              color: answers[question.id] ? 'white' : 'grey.600',
              borderRadius: 1,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                borderColor: survey.color,
                bgcolor: answers[question.id]
                  ? survey.color
                  : `${survey.color}20`,
              },
            }}
          >
            {index + 1}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default SurveySidebar;
