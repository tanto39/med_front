import { apiClient } from './apiClient';
import { ApiResponse } from '../types/api';
import { Doctor } from '../types';

export const doctorsApi = {
  getAllDoctors: async (): Promise<ApiResponse<any[]>> => {
    return apiClient.get<ApiResponse<any[]>>('/doctors');
  },

  getDoctor: async (id: number): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/doctors/${id}`);
  },

  createDoctor: async (data: any): Promise<ApiResponse<any>> => {
    return apiClient.post<ApiResponse<any>>('/doctors', data);
  },

  updateDoctor: async (id: number, data: Partial<Doctor>): Promise<ApiResponse<any>> => {
    return apiClient.put<ApiResponse<any>>(`/doctors/${id}`, data);
  },
};