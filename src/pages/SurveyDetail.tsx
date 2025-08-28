import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import {
  SurveyHero,
  SurveyProgress,
  SurveyQuestion,
  SurveySidebar,
  SurveyResults,
  SurveyPayment,
} from '../components/survey';

// Dữ liệu khảo sát mẫu
const surveysData = [
  {
    id: 1,
    title: 'Khảo sát Stress & Lo âu',
    description: 'Đánh giá mức độ stress và lo âu trong cuộc sống hàng ngày.',
    questions: 20,
    color: '#0080FF',
    gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
    isFree: true,
    price: 0,
    questionsList: [
      {
        id: 1,
        question:
          'Bạn có thường xuyên cảm thấy căng thẳng trong công việc không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
      {
        id: 2,
        question: 'Bạn có gặp khó khăn khi ngủ không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
      {
        id: 3,
        question: 'Bạn có cảm thấy lo lắng về tương lai không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
      {
        id: 4,
        question: 'Bạn có thường xuyên cảm thấy mệt mỏi không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
      {
        id: 5,
        question: 'Bạn có gặp khó khăn khi tập trung không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Khảo sát Tâm lý Chuyên sâu',
    description:
      'Đánh giá toàn diện về tình trạng tâm lý và sức khỏe tinh thần.',
    questions: 35,
    color: '#0080FF',
    gradient: 'linear-gradient(135deg, #0080FF 0%, #0056CC 100%)',
    isFree: false,
    price: 199000,
    questionsList: [
      {
        id: 1,
        question:
          'Bạn có thường xuyên cảm thấy căng thẳng trong công việc không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
      {
        id: 2,
        question: 'Bạn có gặp khó khăn khi ngủ không?',
        options: [
          { value: 'never', label: 'Không bao giờ' },
          { value: 'rarely', label: 'Hiếm khi' },
          { value: 'sometimes', label: 'Thỉnh thoảng' },
          { value: 'often', label: 'Thường xuyên' },
          { value: 'always', label: 'Luôn luôn' },
        ],
      },
    ],
  },
];

// Dữ liệu kết quả mẫu
const surveyResults = {
  stress: {
    title: 'Kết quả đánh giá Stress & Lo âu',
    score: 75,
    level: 'Trung bình',
    conclusion:
      'Bạn có mức độ stress ở mức trung bình, cần chú ý quản lý căng thẳng tốt hơn.',
    radarData: [
      { name: 'Stress công việc', value: 70 },
      { name: 'Lo âu', value: 65 },
      { name: 'Mất ngủ', value: 80 },
      { name: 'Mệt mỏi', value: 75 },
      { name: 'Khó tập trung', value: 60 },
    ],
    advice: [
      'Thực hành các kỹ thuật thở sâu và thiền định hàng ngày',
      'Tạo lịch trình làm việc hợp lý với thời gian nghỉ ngơi',
      'Tập thể dục đều đặn 30 phút mỗi ngày',
      'Hạn chế sử dụng thiết bị điện tử trước khi ngủ',
      'Tìm kiếm sự hỗ trợ từ chuyên gia tư vấn nếu cần thiết',
    ],
  },
  premium: {
    title: 'Kết quả đánh giá Tâm lý Chuyên sâu',
    score: 82,
    level: 'Khá tốt',
    conclusion:
      'Tình trạng tâm lý của bạn khá ổn định, nhưng vẫn cần chú ý một số điểm để cải thiện hơn nữa.',
    radarData: [
      { name: 'Sức khỏe tinh thần', value: 85 },
      { name: 'Quản lý cảm xúc', value: 78 },
      { name: 'Mối quan hệ xã hội', value: 80 },
      { name: 'Khả năng thích ứng', value: 75 },
      { name: 'Sự hài lòng cuộc sống', value: 82 },
    ],
    advice: [
      'Duy trì các hoạt động thể chất và tinh thần đều đặn',
      'Phát triển kỹ năng giao tiếp và xây dựng mối quan hệ',
      'Thực hành mindfulness và thiền định để tăng cường sức khỏe tinh thần',
      'Tìm kiếm sự cân bằng giữa công việc và cuộc sống cá nhân',
      'Xây dựng hệ thống hỗ trợ từ gia đình và bạn bè',
    ],
  },
};

const SurveyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  usePageTitle('Chi tiết khảo sát');

  const survey = surveysData.find(s => s.id === Number(id));

  if (!survey) {
    return (
      <Box>
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" textAlign="center">
            Không tìm thấy khảo sát
          </Typography>
        </Container>
      </Box>
    );
  }

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = survey.questionsList.length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Giả lập gửi dữ liệu
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (survey.isFree) {
      setShowResults(true);
    } else {
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowResults(true);
  };

  const handleBackToSurvey = () => {
    setShowPayment(false);
  };

  // Màn hình kết quả
  if (showResults) {
    const resultKey = survey.isFree ? 'stress' : 'premium';
    const result = surveyResults[resultKey];

    return (
      <Box>
        <Header />
        <SurveyHero
          title={result.title}
          subtitle="Kết quả chi tiết và lời khuyên"
          gradient={survey.gradient}
        />
        <SurveyResults result={result} color={survey.color} />
      </Box>
    );
  }

  // Màn hình thanh toán
  if (showPayment) {
    return (
      <Box>
        <Header />
        <SurveyPayment
          survey={survey}
          onPaymentSuccess={handlePaymentSuccess}
          onBackToSurvey={handleBackToSurvey}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <SurveyHero
        title={survey.title}
        subtitle={survey.description}
        gradient={survey.gradient}
      />
      <SurveyProgress
        answeredQuestions={answeredQuestions}
        totalQuestions={totalQuestions}
        progress={progress}
        color={survey.color}
      />

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 3,
          }}
        >
          {/* Questions Section */}
          <Box sx={{ flex: { xs: 1, lg: 2 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {survey.questionsList.map((question, index) => (
                <SurveyQuestion
                  key={question.id}
                  question={question}
                  index={index}
                  answer={answers[question.id]}
                  onAnswerChange={handleAnswerChange}
                  color={survey.color}
                />
              ))}

              {/* Submit Button */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={answeredQuestions < totalQuestions}
                  sx={{
                    bgcolor: survey.color,
                    borderRadius: 2,
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: survey.color,
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                    '&:disabled': {
                      bgcolor: 'grey.400',
                    },
                  }}
                >
                  {survey.isFree
                    ? 'Hoàn thành khảo sát'
                    : 'Hoàn thành và thanh toán'}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Sidebar */}
          <Box sx={{ flex: { xs: 1, lg: 1 } }}>
            <SurveySidebar
              survey={survey}
              answeredQuestions={answeredQuestions}
              totalQuestions={totalQuestions}
              progress={progress}
              questionsList={survey.questionsList}
              answers={answers}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SurveyDetail;
