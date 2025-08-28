import { useState } from 'react';

interface ValidationErrors {
  [key: string]: string;
}

export const useProfileValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (profileData: {
    fullName: string;
    dateOfBirth: string;
    school: string;
    roles: string[];
  }) => {
    const newErrors: ValidationErrors = {};

    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Họ tên là bắt buộc';
    }

    if (!profileData.dateOfBirth) {
      newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    }

    if (profileData.roles.includes('STUDENT') && !profileData.school.trim()) {
      newErrors.school = 'Trường là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setFieldError = (field: string, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validateForm,
    clearErrors,
    setFieldError,
    clearFieldError,
  };
};
