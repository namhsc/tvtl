import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Alert } from '@mui/material';

import { usePageTitle } from '../hooks/usePageTitle';
import { useProfileData } from '../hooks/useProfileData';
import { useAddressData } from '../hooks/useAddressData';
import { useProfileValidation } from '../hooks/useProfileValidation';
import Header from '../components/Header';
import {
  ProfileHero,
  ProfileAvatar,
  PersonalInfoCard,
  EducationInfoCard,
  BankInfoCard,
  ProfileWelcomeMessage,
  ProfileLoadingState,
  ProfileErrorState,
} from '../components/profile';

const Profile: React.FC = () => {
  usePageTitle('Hồ sơ người dùng');
  const location = useLocation();

  // Kiểm tra xem có phải user mới không
  const isNewUser = location.state?.isNewUser || false;
  const welcomeMessage = location.state?.message || '';

  // Sử dụng custom hooks
  const {
    profileData,
    loading,
    error,
    fetchUserProfile,
    updateProfile,
    resetToOriginal,
    hasChanges,
    updateField,
  } = useProfileData();

  const {
    provinces,
    selectedProvince,
    selectedWard,
    wards,
    handleProvinceChange,
    handleWardChange,
    setInitialAddress,
  } = useAddressData();

  const { errors, validateForm, clearErrors } = useProfileValidation();

  // State cho avatar preview
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Gọi API lấy thông tin user
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Cập nhật địa chỉ khi có dữ liệu profile
  useEffect(() => {
    if (profileData.province || profileData.ward) {
      setInitialAddress(profileData.province, profileData.ward);
    }
  }, [profileData.province, profileData.ward]);

  // Xử lý khi thay đổi tỉnh
  const handleProvinceChangeWithUpdate = (provinceId: string) => {
    handleProvinceChange(provinceId);
    updateField('province', provinceId);
    updateField('ward', ''); // Reset ward khi thay đổi tỉnh
  };

  // Xử lý khi thay đổi xã/phường
  const handleWardChangeWithUpdate = (wardId: string) => {
    handleWardChange(wardId);
    updateField('ward', wardId);
  };

  // Xử lý khi thay đổi input
  const handleInputChange = (field: string, value: string) => {
    updateField(field, value);
  };

  // Xử lý khi thay đổi avatar
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      setAvatarPreview('');
    }
  };

  // Xử lý khi lưu
  const handleSave = async () => {
    if (!validateForm(profileData)) {
      return;
    }

    try {
      const result = await updateProfile();
      if (result?.success) {
        setAvatarPreview(null);
        clearErrors();

        if (isNewUser) {
          console.log('Profile completed for new user');
        }
        console.log('Cập nhật profile thành công');
      }
    } catch (err: any) {
      console.error('Lỗi khi cập nhật profile:', err);
    }
  };

  // Xử lý khi hủy
  const handleCancel = () => {
    resetToOriginal();
    setAvatarPreview(null);
    clearErrors();
  };

  // Kiểm tra có thay đổi gì không (bao gồm cả avatar)
  const hasAnyChanges = () => {
    return hasChanges() || avatarPreview !== null;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />

      {/* Welcome Message for New Users */}
      <ProfileWelcomeMessage
        isNewUser={isNewUser}
        welcomeMessage={welcomeMessage}
      />

      {/* Hero Section */}
      <ProfileHero isNewUser={isNewUser} />

      {/* Loading và Error Display */}
      {loading && <ProfileLoadingState />}
      {error && <ProfileErrorState error={error} />}

      {/* Profile Content */}
      {!loading && !error && (
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 4,
            }}
          >
            {/* Avatar Section */}
            <ProfileAvatar
              avatar={profileData.avatar}
              fullName={profileData.fullName}
              point={profileData.point}
              referralCode={profileData.referralCode}
              onAvatarChange={handleAvatarChange}
              onSave={handleSave}
              onCancel={handleCancel}
              hasChanges={hasAnyChanges()}
              isNewUser={isNewUser}
            />

            {/* Profile Information */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Personal Information */}
                <PersonalInfoCard
                  profileData={{
                    fullName: profileData.fullName,
                    phone: profileData.phone,
                    email: profileData.email,
                    dateOfBirth: profileData.dateOfBirth,
                    gender: profileData.gender,
                    ic: profileData.ic,
                    ward: profileData.ward,
                    province: profileData.province,
                    roles: profileData.roles,
                  }}
                  errors={errors}
                  provinces={provinces}
                  wards={wards}
                  selectedProvince={selectedProvince}
                  selectedWard={selectedWard}
                  onInputChange={handleInputChange}
                  onProvinceChange={handleProvinceChangeWithUpdate}
                  onWardChange={handleWardChangeWithUpdate}
                />

                {/* Education Information - Chỉ hiển thị cho Học sinh */}
                {profileData.roles.includes('STUDENT') && (
                  <EducationInfoCard
                    school={profileData.school}
                    grade={profileData.grade}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
                )}

                {/* Bank Information */}
                <BankInfoCard
                  bankName={profileData.bank_name}
                  bankAccount={profileData.bank_account}
                  onInputChange={handleInputChange}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Profile;
