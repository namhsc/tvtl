import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import { usePageTitle } from '../hooks/usePageTitle';
import Header from '../components/Header';
import { ExpertHero, ExpertContent } from '../components/expert';
import { Expert } from '../components/expert/types';

// Dữ liệu chuyên gia mẫu
const expertsData: Expert[] = [
  {
    id: 1,
    name: 'TS. Nguyễn Thị Hương',
    specialization: 'Tâm lý Học đường',
    experience: '15 năm kinh nghiệm',
    avatar:
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop&1',
    rating: 4.9,
    reviews: 156,
    verified: true,
    description:
      'Chuyên gia tư vấn tâm lý học đường với hơn 15 năm kinh nghiệm.',
    fullDescription:
      'TS. Nguyễn Thị Hương là chuyên gia tư vấn tâm lý học đường hàng đầu với hơn 15 năm kinh nghiệm trong lĩnh vực giáo dục và tâm lý học. Bà đã tốt nghiệp Đại học Sư phạm Hà Nội và có bằng Tiến sĩ Tâm lý học tại Đại học Quốc gia Hà Nội.',
    education: [
      'Tiến sĩ Tâm lý học - Đại học Quốc gia Hà Nội',
      'Thạc sĩ Tâm lý học Giáo dục - Đại học Sư phạm Hà Nội',
      'Cử nhân Tâm lý học - Đại học Sư phạm Hà Nội',
    ],
    certifications: [
      'Chứng chỉ Tư vấn Tâm lý học đường - Bộ Giáo dục & Đào tạo',
      'Chứng chỉ Trị liệu Tâm lý - Hiệp hội Tâm lý học Việt Nam',
      'Chứng chỉ Đánh giá IQ & EQ - Trung tâm Đánh giá Tâm lý',
    ],
    expertise: [
      'Tư vấn tâm lý học đường',
      'Định hướng nghề nghiệp',
      'Xử lý stress và lo âu',
      'Phát triển kỹ năng sống',
      'Tư vấn gia đình',
    ],
    original_price: 500000,
    current_price: 400000,
    discount: 20,
    achievements: [
      'Giải thưởng "Chuyên gia Tư vấn Tâm lý xuất sắc" năm 2022',
      'Tác giả của 20+ bài báo khoa học về tâm lý học đường',
      'Tham gia 50+ hội thảo quốc tế về tâm lý giáo dục',
      'Tư vấn cho hơn 5,000 học sinh, sinh viên',
    ],
  },
  {
    id: 2,
    name: 'ThS. Trần Văn Minh',
    specialization: 'Tư vấn Gia đình',
    experience: '12 năm kinh nghiệm',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&2',
    rating: 4.8,
    reviews: 203,
    verified: true,
    description: 'Chuyên gia tư vấn gia đình và mối quan hệ.',
    fullDescription:
      'ThS. Trần Văn Minh là chuyên gia tư vấn gia đình với 12 năm kinh nghiệm trong lĩnh vực tư vấn hôn nhân và gia đình. Ông chuyên về giải quyết các xung đột gia đình, tư vấn nuôi dạy con cái và cải thiện mối quan hệ.',
    education: [
      'Thạc sĩ Tâm lý học Gia đình - Đại học Khoa học Xã hội & Nhân văn',
      'Cử nhân Tâm lý học - Đại học Khoa học Xã hội & Nhân văn',
    ],
    certifications: [
      'Chứng chỉ Tư vấn Hôn nhân & Gia đình - Bộ Văn hóa, Thể thao & Du lịch',
      'Chứng chỉ Trị liệu Gia đình - Hiệp hội Tâm lý học Việt Nam',
    ],
    expertise: [
      'Tư vấn hôn nhân và gia đình',
      'Nuôi dạy con cái',
      'Giải quyết xung đột gia đình',
      'Cải thiện giao tiếp',
      'Tư vấn tâm lý trẻ em',
    ],
    original_price: 600000,
    current_price: 500000,
    discount: 17,
    achievements: [
      'Chứng nhận "Chuyên gia Tư vấn Gia đình xuất sắc" năm 2021',
      'Tác giả sách "Nghệ thuật nuôi dạy con thời hiện đại"',
      'Tham gia 30+ hội thảo về tâm lý gia đình',
      'Tư vấn cho hơn 3,000 gia đình',
    ],
  },
  {
    id: 3,
    name: 'TS. Lê Thị Lan',
    specialization: 'Đánh giá IQ & EQ',
    experience: '18 năm kinh nghiệm',
    avatar:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=200&fit=crop&3',
    rating: 4.9,
    reviews: 189,
    verified: true,
    description: 'Chuyên gia đánh giá và phát triển trí tuệ.',
    fullDescription:
      'TS. Lê Thị Lan là chuyên gia hàng đầu trong lĩnh vực đánh giá và phát triển trí tuệ với 18 năm kinh nghiệm. Bà chuyên về đánh giá IQ, EQ và các khả năng nhận thức khác.',
    education: [
      'Tiến sĩ Tâm lý học Nhận thức - Đại học Quốc gia Hà Nội',
      'Thạc sĩ Tâm lý học - Đại học Khoa học Xã hội & Nhân văn',
      'Cử nhân Tâm lý học - Đại học Khoa học Xã hội & Nhân văn',
    ],
    certifications: [
      'Chứng chỉ Đánh giá IQ - Trung tâm Đánh giá Tâm lý',
      'Chứng chỉ Đánh giá EQ - Hiệp hội Tâm lý học Việt Nam',
      'Chứng chỉ Trị liệu Nhận thức - Hội Tâm lý học Quốc tế',
    ],
    expertise: [
      'Đánh giá IQ và EQ',
      'Phát triển trí tuệ',
      'Tư vấn định hướng nghề nghiệp',
      'Đánh giá khả năng học tập',
      'Tư vấn phát triển kỹ năng',
    ],
    original_price: 700000,
    current_price: 600000,
    discount: 14,
    achievements: [
      'Giải thưởng "Chuyên gia Đánh giá Tâm lý xuất sắc" năm 2023',
      'Tác giả của 30+ bài báo khoa học về đánh giá trí tuệ',
      'Tham gia 40+ hội thảo quốc tế về tâm lý nhận thức',
      'Đánh giá cho hơn 10,000 người',
    ],
  },
  {
    id: 4,
    name: 'ThS. Phạm Văn An',
    specialization: 'Tâm lý Trị liệu',
    experience: '10 năm kinh nghiệm',
    avatar:
      'https://images.unsplash.com/photo-1523240798139-2eaa5d5c8c3b?w=400&h=200&fit=crop&4',
    rating: 4.7,
    reviews: 134,
    verified: true,
    description: 'Chuyên gia trị liệu tâm lý và cải thiện sức khỏe tinh thần.',
    fullDescription:
      'ThS. Phạm Văn An là chuyên gia trị liệu tâm lý với 10 năm kinh nghiệm trong việc điều trị các rối loạn tâm lý và cải thiện sức khỏe tinh thần. Ông chuyên về trị liệu stress, lo âu, trầm cảm và các vấn đề tâm lý khác.',
    education: [
      'Thạc sĩ Tâm lý học Lâm sàng - Đại học Y Hà Nội',
      'Cử nhân Tâm lý học - Đại học Khoa học Xã hội & Nhân văn',
    ],
    certifications: [
      'Chứng chỉ Trị liệu Tâm lý - Bộ Y tế',
      'Chứng chỉ Trị liệu Nhận thức - Hành vi',
      'Chứng chỉ Trị liệu Gia đình - Hiệp hội Tâm lý học Việt Nam',
    ],
    expertise: [
      'Trị liệu stress và lo âu',
      'Trị liệu trầm cảm',
      'Trị liệu rối loạn tâm lý',
      'Cải thiện sức khỏe tinh thần',
      'Tư vấn tâm lý cá nhân',
    ],
    original_price: 900000,
    current_price: 800000,
    discount: 11,
    achievements: [
      'Chứng nhận "Chuyên gia Trị liệu Tâm lý xuất sắc" năm 2022',
      'Tác giả sách "Hành trình chữa lành tâm hồn"',
      'Tham gia 25+ hội thảo về trị liệu tâm lý',
      'Trị liệu cho hơn 2,000 bệnh nhân',
    ],
  },
];

const ExpertDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Kiểm tra trạng thái đăng nhập
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const expert = expertsData.find(e => e.id === parseInt(id || '1'));

  usePageTitle(
    expert
      ? `${expert.name} - Chi tiết chuyên gia`
      : 'Chuyên gia - Tư vấn Tâm lý'
  );

  if (!expert) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" textAlign="center">
            Không tìm thấy chuyên gia
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />
      <ExpertHero expert={expert} isAuthenticated={isAuthenticated} />
      <ExpertContent expert={expert} />
    </Box>
  );
};

export default ExpertDetail;
