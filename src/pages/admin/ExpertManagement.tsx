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
  TablePagination,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Avatar,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

interface Expert {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  avatar?: string;
  expertise: string[];
  experience: number;
  education: string;
  workplace: string;
  location: string;
  bio: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rating: number;
  totalConsultations: number;
  createdAt: string;
  updatedAt: string;
  documents: {
    id: string;
    name: string;
    type: 'CERTIFICATE' | 'DEGREE' | 'ID_CARD' | 'OTHER';
    url: string;
  }[];
}

interface ExpertManagementState {
  experts: Expert[];
  filteredExperts: Expert[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  searchTerm: string;
  statusFilter: string;
  expertiseFilter: string;
  selectedExpert: Expert | null;
  viewDialogOpen: boolean;
  approveDialogOpen: boolean;
  rejectDialogOpen: boolean;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  };
}

const ExpertManagement: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ExpertManagementState>({
    experts: [],
    filteredExperts: [],
    loading: true,
    page: 0,
    rowsPerPage: 10,
    searchTerm: '',
    statusFilter: 'all',
    expertiseFilter: 'all',
    selectedExpert: null,
    viewDialogOpen: false,
    approveDialogOpen: false,
    rejectDialogOpen: false,
    snackbar: {
      open: false,
      message: '',
      severity: 'info',
    },
  });

  useEffect(() => {
    loadExperts();
  }, []);

  useEffect(() => {
    filterExperts();
  }, [
    state.experts,
    state.searchTerm,
    state.statusFilter,
    state.expertiseFilter,
  ]);

  const loadExperts = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      // TODO: Gọi API để lấy danh sách chuyên gia thực tế
      // Mock data
      const mockExperts: Expert[] = [
        {
          id: '1',
          fullName: 'Nguyễn Văn A',
          phone: '0123456789',
          email: 'expert1@example.com',
          expertise: ['Tâm lý học', 'Tư vấn gia đình'],
          experience: 5,
          education: 'Thạc sĩ Tâm lý học',
          workplace: 'Trung tâm Tư vấn Tâm lý ABC',
          location: 'Hà Nội',
          bio: 'Chuyên gia tư vấn tâm lý với 5 năm kinh nghiệm trong lĩnh vực tư vấn gia đình và trẻ em.',
          status: 'PENDING',
          rating: 4.8,
          totalConsultations: 0,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          documents: [
            {
              id: '1',
              name: 'Bằng thạc sĩ tâm lý học',
              type: 'DEGREE',
              url: '#',
            },
            {
              id: '2',
              name: 'Chứng chỉ hành nghề tư vấn',
              type: 'CERTIFICATE',
              url: '#',
            },
          ],
        },
        {
          id: '2',
          fullName: 'Trần Thị B',
          phone: '0987654321',
          email: 'expert2@example.com',
          expertise: ['Giáo dục', 'Phát triển trẻ em'],
          experience: 8,
          education: 'Tiến sĩ Giáo dục học',
          workplace: 'Đại học Sư phạm Hà Nội',
          location: 'Hà Nội',
          bio: 'Chuyên gia giáo dục với 8 năm kinh nghiệm nghiên cứu và giảng dạy về phát triển trẻ em.',
          status: 'APPROVED',
          rating: 4.9,
          totalConsultations: 45,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z',
          documents: [
            {
              id: '3',
              name: 'Bằng tiến sĩ giáo dục học',
              type: 'DEGREE',
              url: '#',
            },
          ],
        },
        {
          id: '3',
          fullName: 'Lê Văn C',
          phone: '0111222333',
          email: 'expert3@example.com',
          expertise: ['Y tế', 'Dinh dưỡng'],
          experience: 3,
          education: 'Bác sĩ Y khoa',
          workplace: 'Bệnh viện Nhi Trung ương',
          location: 'Hà Nội',
          bio: 'Bác sĩ chuyên khoa nhi với 3 năm kinh nghiệm trong lĩnh vực dinh dưỡng trẻ em.',
          status: 'REJECTED',
          rating: 0,
          totalConsultations: 0,
          createdAt: '2024-01-03T00:00:00Z',
          updatedAt: '2024-01-03T00:00:00Z',
          documents: [
            {
              id: '4',
              name: 'Bằng bác sĩ y khoa',
              type: 'DEGREE',
              url: '#',
            },
          ],
        },
      ];
      setState(prev => ({ ...prev, experts: mockExperts, loading: false }));
    } catch (error) {
      console.error('Error loading experts:', error);
      setState(prev => ({ ...prev, loading: false }));
      showSnackbar('Lỗi khi tải danh sách chuyên gia', 'error');
    }
  };

  const filterExperts = () => {
    let filtered = state.experts;

    // Lọc theo từ khóa tìm kiếm
    if (state.searchTerm) {
      filtered = filtered.filter(
        expert =>
          expert.fullName
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase()) ||
          expert.phone.includes(state.searchTerm) ||
          expert.email
            ?.toLowerCase()
            .includes(state.searchTerm.toLowerCase()) ||
          expert.expertise.some(exp =>
            exp.toLowerCase().includes(state.searchTerm.toLowerCase())
          )
      );
    }

    // Lọc theo trạng thái
    if (state.statusFilter !== 'all') {
      filtered = filtered.filter(
        expert => expert.status === state.statusFilter
      );
    }

    // Lọc theo chuyên môn
    if (state.expertiseFilter !== 'all') {
      filtered = filtered.filter(expert =>
        expert.expertise.includes(state.expertiseFilter)
      );
    }

    setState(prev => ({ ...prev, filteredExperts: filtered, page: 0 }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchTerm: event.target.value }));
  };

  const handleStatusFilterChange = (event: any) => {
    setState(prev => ({ ...prev, statusFilter: event.target.value }));
  };

  const handleExpertiseFilterChange = (event: any) => {
    setState(prev => ({ ...prev, expertiseFilter: event.target.value }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState(prev => ({
      ...prev,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  const handleViewExpert = (expert: Expert) => {
    setState(prev => ({
      ...prev,
      selectedExpert: expert,
      viewDialogOpen: true,
    }));
  };

  const handleApproveExpert = (expert: Expert) => {
    setState(prev => ({
      ...prev,
      selectedExpert: expert,
      approveDialogOpen: true,
    }));
  };

  const handleRejectExpert = (expert: Expert) => {
    setState(prev => ({
      ...prev,
      selectedExpert: expert,
      rejectDialogOpen: true,
    }));
  };

  const handleApproveConfirm = async () => {
    if (!state.selectedExpert) return;

    try {
      // TODO: Gọi API để phê duyệt chuyên gia
      const updatedExperts = state.experts.map(expert =>
        expert.id === state.selectedExpert!.id
          ? { ...expert, status: 'APPROVED' as const }
          : expert
      );
      setState(prev => ({
        ...prev,
        experts: updatedExperts,
        approveDialogOpen: false,
      }));
      showSnackbar('Đã phê duyệt chuyên gia thành công', 'success');
    } catch (error) {
      console.error('Error approving expert:', error);
      showSnackbar('Lỗi khi phê duyệt chuyên gia', 'error');
    }
  };

  const handleRejectConfirm = async () => {
    if (!state.selectedExpert) return;

    try {
      // TODO: Gọi API để từ chối chuyên gia
      const updatedExperts = state.experts.map(expert =>
        expert.id === state.selectedExpert!.id
          ? { ...expert, status: 'REJECTED' as const }
          : expert
      );
      setState(prev => ({
        ...prev,
        experts: updatedExperts,
        rejectDialogOpen: false,
      }));
      showSnackbar('Đã từ chối chuyên gia', 'success');
    } catch (error) {
      console.error('Error rejecting expert:', error);
      showSnackbar('Lỗi khi từ chối chuyên gia', 'error');
    }
  };

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning'
  ) => {
    setState(prev => ({
      ...prev,
      snackbar: { open: true, message, severity },
    }));
  };

  const closeSnackbar = () => {
    setState(prev => ({
      ...prev,
      snackbar: { ...prev.snackbar, open: false },
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Đã phê duyệt';
      case 'PENDING':
        return 'Chờ phê duyệt';
      case 'REJECTED':
        return 'Bị từ chối';
      default:
        return 'Không xác định';
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'CERTIFICATE':
        return 'Chứng chỉ';
      case 'DEGREE':
        return 'Bằng cấp';
      case 'ID_CARD':
        return 'CMND/CCCD';
      case 'OTHER':
        return 'Khác';
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
              🎓 Quản Lý Chuyên Gia
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Quản lý và phê duyệt đăng ký chuyên gia
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadExperts}
              disabled={state.loading}
            >
              Làm Mới
            </Button>
            <Button
              variant="contained"
              startIcon={<SchoolIcon />}
              onClick={() => navigate('/admin/experts/add')}
            >
              Thêm Chuyên Gia
            </Button>
          </Box>
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
                {state.experts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tổng Chuyên Gia
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {state.experts.filter(e => e.status === 'PENDING').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chờ Phê Duyệt
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {state.experts.filter(e => e.status === 'APPROVED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đã Phê Duyệt
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {state.experts.filter(e => e.status === 'REJECTED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bị Từ Chối
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(4, 1fr)',
              },
              gap: 3,
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              label="Tìm kiếm"
              placeholder="Tên, số điện thoại, chuyên môn..."
              value={state.searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={state.statusFilter}
                label="Trạng thái"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="PENDING">Chờ phê duyệt</MenuItem>
                <MenuItem value="APPROVED">Đã phê duyệt</MenuItem>
                <MenuItem value="REJECTED">Bị từ chối</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Chuyên môn</InputLabel>
              <Select
                value={state.expertiseFilter}
                label="Chuyên môn"
                onChange={handleExpertiseFilterChange}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="Tâm lý học">Tâm lý học</MenuItem>
                <MenuItem value="Giáo dục">Giáo dục</MenuItem>
                <MenuItem value="Y tế">Y tế</MenuItem>
                <MenuItem value="Dinh dưỡng">Dinh dưỡng</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={filterExperts}
            >
              Lọc
            </Button>
          </Box>
        </Paper>

        {/* Experts Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Chuyên gia</TableCell>
                  <TableCell>Chuyên môn</TableCell>
                  <TableCell>Kinh nghiệm</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày đăng ký</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.filteredExperts
                  .slice(
                    state.page * state.rowsPerPage,
                    state.page * state.rowsPerPage + state.rowsPerPage
                  )
                  .map(expert => (
                    <TableRow key={expert.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ width: 40, height: 40 }}>
                            {expert.fullName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {expert.fullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {expert.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1} flexWrap="wrap">
                          {expert.expertise.slice(0, 2).map(exp => (
                            <Chip
                              key={exp}
                              label={exp}
                              size="small"
                              color="primary"
                            />
                          ))}
                          {expert.expertise.length > 2 && (
                            <Chip
                              label={`+${expert.expertise.length - 2}`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {expert.experience} năm
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <StarIcon
                            sx={{ color: 'warning.main', fontSize: 16 }}
                          />
                          <Typography variant="body2" fontWeight="medium">
                            {expert.rating.toFixed(1)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ({expert.totalConsultations})
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(expert.status)}
                          color={getStatusColor(expert.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(expert.createdAt).toLocaleDateString(
                            'vi-VN'
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" gap={1} justifyContent="center">
                          <Tooltip title="Xem chi tiết">
                            <IconButton
                              size="small"
                              onClick={() => handleViewExpert(expert)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          {expert.status === 'PENDING' && (
                            <>
                              <Tooltip title="Phê duyệt">
                                <IconButton
                                  size="small"
                                  color="success"
                                  onClick={() => handleApproveExpert(expert)}
                                >
                                  <CheckCircleIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Từ chối">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRejectExpert(expert)}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={state.filteredExperts.length}
            rowsPerPage={state.rowsPerPage}
            page={state.page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} trong tổng số ${count !== -1 ? count : `hơn ${to}`}`
            }
          />
        </Paper>

        {/* View Expert Dialog */}
        <Dialog
          open={state.viewDialogOpen}
          onClose={() => setState(prev => ({ ...prev, viewDialogOpen: false }))}
          maxWidth="md"
          fullWidth
        >
          {state.selectedExpert && (
            <>
              <DialogTitle>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ width: 48, height: 48 }}>
                    {state.selectedExpert.fullName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {state.selectedExpert.fullName}
                    </Typography>
                    <Chip
                      label={getStatusLabel(state.selectedExpert.status)}
                      color={getStatusColor(state.selectedExpert.status) as any}
                      size="small"
                    />
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, 1fr)',
                    },
                    gap: 3,
                    pt: 2,
                  }}
                >
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Thông tin cá nhân</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Số điện thoại"
                            secondary={state.selectedExpert.phone}
                          />
                        </ListItem>
                        {state.selectedExpert.email && (
                          <ListItem>
                            <ListItemText
                              primary="Email"
                              secondary={state.selectedExpert.email}
                            />
                          </ListItem>
                        )}
                        <ListItem>
                          <ListItemText
                            primary="Địa chỉ"
                            secondary={state.selectedExpert.location}
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">
                        Chuyên môn & Kinh nghiệm
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        <ListItem>
                          <ListItemText
                            primary="Chuyên môn"
                            secondary={state.selectedExpert.expertise.join(
                              ', '
                            )}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Kinh nghiệm"
                            secondary={`${state.selectedExpert.experience} năm`}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Học vấn"
                            secondary={state.selectedExpert.education}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Nơi làm việc"
                            secondary={state.selectedExpert.workplace}
                          />
                        </ListItem>
                      </List>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Giới thiệu</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" paragraph>
                        {state.selectedExpert.bio}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Tài liệu đính kèm</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                          },
                          gap: 2,
                        }}
                      >
                        {state.selectedExpert.documents.map(doc => (
                          <Card variant="outlined" key={doc.id}>
                            <CardContent>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {doc.name}
                              </Typography>
                              <Chip
                                label={getDocumentTypeLabel(doc.type)}
                                size="small"
                                color="primary"
                                sx={{ mt: 1 }}
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() =>
                    setState(prev => ({ ...prev, viewDialogOpen: false }))
                  }
                >
                  Đóng
                </Button>
                {state.selectedExpert.status === 'PENDING' && (
                  <>
                    <Button
                      onClick={() => handleApproveExpert(state.selectedExpert!)}
                      color="success"
                      variant="contained"
                    >
                      Phê duyệt
                    </Button>
                    <Button
                      onClick={() => handleRejectExpert(state.selectedExpert!)}
                      color="error"
                      variant="outlined"
                    >
                      Từ chối
                    </Button>
                  </>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Approve Confirmation Dialog */}
        <Dialog
          open={state.approveDialogOpen}
          onClose={() =>
            setState(prev => ({ ...prev, approveDialogOpen: false }))
          }
        >
          <DialogTitle>Xác nhận phê duyệt</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn phê duyệt chuyên gia{' '}
              <strong>{state.selectedExpert?.fullName}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setState(prev => ({ ...prev, approveDialogOpen: false }))
              }
            >
              Hủy
            </Button>
            <Button
              onClick={handleApproveConfirm}
              color="success"
              variant="contained"
            >
              Phê duyệt
            </Button>
          </DialogActions>
        </Dialog>

        {/* Reject Confirmation Dialog */}
        <Dialog
          open={state.rejectDialogOpen}
          onClose={() =>
            setState(prev => ({ ...prev, rejectDialogOpen: false }))
          }
        >
          <DialogTitle>Xác nhận từ chối</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn từ chối chuyên gia{' '}
              <strong>{state.selectedExpert?.fullName}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setState(prev => ({ ...prev, rejectDialogOpen: false }))
              }
            >
              Hủy
            </Button>
            <Button
              onClick={handleRejectConfirm}
              color="error"
              variant="contained"
            >
              Từ chối
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={state.snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity={state.snackbar.severity}
            sx={{ width: '100%' }}
          >
            {state.snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </AdminLayout>
  );
};

export default ExpertManagement;
