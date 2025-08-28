import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

interface Survey {
  id: string;
  title: string;
  description: string;
  status: string;
  participants: number;
  maxParticipants: number;
  createdAt: string;
}

const SurveyManagement: React.FC = () => {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    // Mock data
    setSurveys([
      {
        id: '1',
        title: 'Khảo sát về giáo dục trẻ em',
        description: 'Khảo sát để hiểu rõ hơn về nhu cầu giáo dục',
        status: 'ACTIVE',
        participants: 450,
        maxParticipants: 1000,
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        title: 'Khảo sát về sức khỏe tâm lý',
        description: 'Khảo sát về tình trạng sức khỏe tâm lý của học sinh',
        status: 'DRAFT',
        participants: 0,
        maxParticipants: 500,
        createdAt: '2024-01-15',
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'DRAFT':
        return 'default';
      case 'COMPLETED':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Đang hoạt động';
      case 'DRAFT':
        return 'Bản nháp';
      case 'COMPLETED':
        return 'Hoàn thành';
      default:
        return 'Không xác định';
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              📊 Quản Lý Khảo Sát
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Quản lý và tạo mới các khảo sát trong hệ thống
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/surveys/add')}
          >
            Tạo Khảo Sát Mới
          </Button>
        </Box>

        {/* Statistics Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
            mb: 3,
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {surveys.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng Khảo Sát
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {surveys.filter(s => s.status === 'ACTIVE').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đang Hoạt Động
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {surveys.filter(s => s.status === 'DRAFT').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bản Nháp
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {surveys.filter(s => s.status === 'COMPLETED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hoàn Thành
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Surveys Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Khảo sát</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Người tham gia</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surveys.map(survey => (
                  <TableRow key={survey.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {survey.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {survey.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(survey.status)}
                        color={getStatusColor(survey.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {survey.participants}/{survey.maxParticipants}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(survey.createdAt).toLocaleDateString('vi-VN')}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1} justifyContent="center">
                        <Tooltip title="Xem chi tiết">
                          <IconButton size="small">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chỉnh sửa">
                          <IconButton size="small" color="primary">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default SurveyManagement;
