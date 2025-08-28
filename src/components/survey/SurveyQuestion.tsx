import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface QuestionOption {
  value: string;
  label: string;
}

interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

interface SurveyQuestionProps {
  question: Question;
  index: number;
  answer: string | undefined;
  onAnswerChange: (questionId: number, value: string) => void;
  color: string;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({
  question,
  index,
  answer,
  onAnswerChange,
  color,
}) => {
  return (
    <Card
      id={`question-${question.id}`}
      sx={{
        borderRadius: 3,
        border: answer ? `2px solid ${color}` : '2px solid transparent',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header với số thứ tự và trạng thái */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            p: 2,
            bgcolor: answer ? `${color}10` : 'grey.50',
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: answer ? color : 'grey.400',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}
            >
              {index + 1}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                Câu hỏi {index + 1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {answer ? 'Đã trả lời' : 'Chưa trả lời'}
              </Typography>
            </Box>
          </Box>
          {answer && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                bgcolor: 'success.main',
                color: 'white',
                borderRadius: 1,
                fontSize: '0.8rem',
              }}
            >
              <CheckCircle sx={{ fontSize: '1rem' }} />
              Hoàn thành
            </Box>
          )}
        </Box>

        {/* Câu hỏi */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 3,
            color: 'text.primary',
            lineHeight: 1.5,
          }}
        >
          {question.question}
        </Typography>

        {/* Các lựa chọn */}
        <FormControl component="fieldset" sx={{ width: '100%' }}>
          <RadioGroup
            value={answer || ''}
            onChange={e => onAnswerChange(question.id, e.target.value)}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {question.options.map(option => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        color: color,
                        '&.Mui-checked': {
                          color: color,
                        },
                      }}
                    />
                  }
                  label={option.label}
                  sx={{
                    m: 0,
                    border: 2,
                    borderColor: answer === option.value ? color : 'grey.200',
                    borderRadius: 3,
                    bgcolor: answer === option.value ? `${color}10` : 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: color,
                      bgcolor:
                        answer === option.value ? `${color}15` : 'grey.50',
                      transform: 'translateY(-1px)',
                    },
                    '&.Mui-checked': {
                      borderColor: color,
                      bgcolor: `${color}10`,
                    },
                  }}
                />
              ))}
            </Box>
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SurveyQuestion;
