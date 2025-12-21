import { apiClient } from './apiClient';
import { ApiResponse, UserResponse } from '../types/api';
import { User } from '../types';

export const usersApi = {
  getAllUsers: async (): Promise<ApiResponse<UserResponse[]>> => {
    return apiClient.get<ApiResponse<UserResponse[]>>('/users');
  },

  getUser: async (login: string): Promise<ApiResponse<UserResponse>> => {
    return apiClient.get<ApiResponse<UserResponse>>(`/users/${login}`);
  },

  updateUser: async (login: string, data: Partial<User>): Promise<ApiResponse<UserResponse>> => {
    return apiClient.put<ApiResponse<UserResponse>>(`/users/${login}`, data);
  },
};