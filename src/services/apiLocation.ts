import api from './axiosConfig';
import { API_ENDPOINTS } from './constants/api.constants';
import { ApiResponse, Location } from './types/api.types';

export const apiLocation = {
  getProvinceList: async (
    query: string = ''
  ): Promise<ApiResponse<Location[]>> => {
    const response = await api.get(
      API_ENDPOINTS.LOCATION.LIST_PROVINCE(query),
      {}
    );
    return response.data;
  },
  getWardList: async (
    provinceId: string,
    query: string = ''
  ): Promise<ApiResponse<Location[]>> => {
    const response = await api.get(
      API_ENDPOINTS.LOCATION.LIST_WARD(provinceId, query),
      {}
    );
    return response.data;
  },
};
