import { apiClient } from './apiClient';
import { ApiResponse, AuthResponse } from '../types/api';
import { LoginFormData } from '../types/index';

export const authApi = {
  login: async (data: LoginFormData): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
  },

  register: async (data: LoginFormData): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): any => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};