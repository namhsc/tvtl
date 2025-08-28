import api from './axiosConfig';
import { API_ENDPOINTS } from './constants/api.constants';
import { ApiResponse, User } from './types/api.types';
import { PaginatedContentResponse } from './types/api.types';

export const apiUser = {
  // User Profile
  getUserProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get(API_ENDPOINTS.USER.PROFILE, {});
    return response.data;
  },
  updateUserProfile: async (data: User): Promise<ApiResponse<User>> => {
    const response = await api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, data, {});
    return response.data;
  },

  //   Admin
  createUser: async (data: User): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>(
      API_ENDPOINTS.USER.CREATE,
      data,
      {}
    );
    return response.data;
  },
  updateUser: async (data: User): Promise<ApiResponse<User>> => {
    const response = await api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, data, {});
    return response.data;
  },
  deleteUser: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await api.delete(API_ENDPOINTS.USER.DELETE(userId), {});
    return response.data;
  },
  getUserList: async (
    page: number,
    size: number,
    keyword?: string,
    status?: string,
    role?: string
  ): Promise<ApiResponse<PaginatedContentResponse<User>>> => {
    const response = await api.get(
      API_ENDPOINTS.USER.LIST(page, size, keyword, status, role),
      {}
    );
    return response.data;
  },
  getUserDetail: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await api.get(API_ENDPOINTS.USER.DETAIL(userId), {});
    return response.data;
  },
};
