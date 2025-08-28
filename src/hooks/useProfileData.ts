import { useState, useEffect } from 'react';
import { apiUser } from '../services/apiUser';

interface ProfileData {
  avatar: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  ic: string;
  ward: string;
  province: string;
  school: string;
  grade: string;
  point: number;
  referralCode: string;
  roles: string[];
  bank_name: string;
  bank_account: string;
}

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    avatar: '',
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    ic: '',
    ward: '',
    province: '',
    school: '',
    grade: '',
    point: 0,
    referralCode: '',
    roles: [],
    bank_name: '',
    bank_account: '',
  });

  const [originalData, setOriginalData] = useState<ProfileData>({
    avatar: '',
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    ic: '',
    ward: '',
    province: '',
    school: '',
    grade: '',
    point: 0,
    referralCode: '',
    roles: [],
    bank_name: '',
    bank_account: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Khởi tạo dữ liệu từ localStorage
  useEffect(() => {
    if (user) {
      const initialData = {
        avatar: user?.avatar || '',
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        email: user?.email || '',
        dateOfBirth: user?.dateOfBirth || '',
        gender: user?.gender || '',
        ic: user?.ic || '',
        ward: user?.ward || '',
        province: user?.province || '',
        school: user?.school || '',
        grade: user?.grade || '',
        point: user?.point || 0,
        referralCode: user?.referralCode || '',
        roles: user?.roles || [],
        bank_name: user?.bank_name || '',
        bank_account: user?.bank_account || '',
      };
      setProfileData(initialData);
      setOriginalData(initialData);
    }
  }, []);

  // Gọi API lấy thông tin user
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiUser.getUserProfile();

      if (response.success && response.data) {
        const userData = response.data;
        const updatedData = {
          avatar: userData.avatar || '',
          fullName: userData.fullName || '',
          phone: userData.phone || '',
          email: userData.email || '',
          dateOfBirth: userData.dateOfBirth || '',
          gender: userData.gender || '',
          ic: userData.ic || '',
          ward: userData.ward || '',
          province: userData.province || '',
          school: userData.school || '',
          grade: userData.grade || '',
          point: userData.point || 0,
          referralCode: userData.referralCode || '',
          roles: userData.roles || [],
          bank_name: userData.bank_name || '',
          bank_account: userData.bank_account || '',
        };

        setProfileData(updatedData);
        setOriginalData(updatedData);
      }
    } catch (err: any) {
      console.error('Lỗi khi lấy thông tin user:', err);
      setError(
        err?.response?.data?.message ||
          'Có lỗi xảy ra khi lấy thông tin người dùng'
      );
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật profile
  const updateProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const updateData = {
        fullName: profileData.fullName,
        email: profileData.email,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        ic: profileData.ic,
        ward: profileData.ward,
        province: profileData.province,
        school: profileData.school,
        grade: profileData.grade,
        roles: profileData.roles,
        bank_name: profileData.bank_name,
        bank_account: profileData.bank_account,
      };

      const response = await apiUser.updateUserProfile(updateData as any);

      if (response.success) {
        setOriginalData(profileData);
        return { success: true };
      }
    } catch (err: any) {
      console.error('Lỗi khi cập nhật profile:', err);
      setError(
        err?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin'
      );
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // Reset về dữ liệu gốc
  const resetToOriginal = () => {
    setProfileData(originalData);
  };

  // Kiểm tra có thay đổi gì không
  const hasChanges = () => {
    return JSON.stringify(profileData) !== JSON.stringify(originalData);
  };

  // Cập nhật một trường dữ liệu
  const updateField = (field: string, value: string) => {
    if (field === 'roles') {
      setProfileData(prev => ({
        ...prev,
        roles: [value],
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  return {
    profileData,
    originalData,
    loading,
    error,
    fetchUserProfile,
    updateProfile,
    resetToOriginal,
    hasChanges,
    updateField,
  };
};
