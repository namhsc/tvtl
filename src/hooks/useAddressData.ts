import { useState, useEffect } from 'react';
import { apiLocation } from '../services/apiLocation';
import { Location } from '../services/types/api.types';

export const useAddressData = () => {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [wards, setWards] = useState<Location[]>([]);

  // Load dữ liệu tỉnh thành
  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const response = await apiLocation.getProvinceList();
        setProvinces(response.data);
      } catch (error) {
        console.error('Error loading provinces:', error);
      }
    };
    loadProvinces();
  }, []);

  // Load wards khi có selectedProvince
  useEffect(() => {
    const loadWards = async () => {
      if (selectedProvince && selectedProvince !== '-1') {
        const province = provinces.find(p => p.id === selectedProvince);
        if (province && province.parentId) {
          const response = await apiLocation.getWardList(province.parentId);
          setWards(response.data);
        } else {
          setWards([]);
        }
      } else {
        setWards([]);
      }
    };
    loadWards();
  }, [selectedProvince, provinces]);

  // Xử lý khi chọn tỉnh
  const handleProvinceChange = async (provinceId: string) => {
    setSelectedProvince(provinceId);
    setSelectedWard('');

    if (provinceId && provinceId !== '-1') {
      const province = provinces.find(p => p.id === provinceId);
      if (province && province.parentId) {
        const response = await apiLocation.getWardList(province.parentId);
        setWards(response.data);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };

  // Xử lý khi chọn xã/phường
  const handleWardChange = (wardId: string) => {
    setSelectedWard(wardId);
  };

  // Set giá trị ban đầu cho province và ward
  const setInitialAddress = (province: string, ward: string) => {
    setSelectedProvince(province);
    setSelectedWard(ward);
  };

  return {
    provinces,
    selectedProvince,
    selectedWard,
    wards,
    handleProvinceChange,
    handleWardChange,
    setInitialAddress,
  };
};
