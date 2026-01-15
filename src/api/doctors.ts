import { apiClient } from './apiClient';
import { ApiResponse, DoctorWithDetails } from '../types/api';
import { Doctor } from '../types';

export const doctorsApi = {
  getAllDoctors: async (): Promise<ApiResponse<DoctorWithDetails[]>> => {
    return apiClient.get<ApiResponse<DoctorWithDetails[]>>('/doctors');
  },

  getDoctor: async (id: number): Promise<ApiResponse<DoctorWithDetails>> => {
    return apiClient.get<ApiResponse<DoctorWithDetails>>(`/doctors/${id}`);
  },

  createDoctor: async (data: any): Promise<ApiResponse<DoctorWithDetails>> => {
    return apiClient.post<ApiResponse<DoctorWithDetails>>('/doctors', data);
  },

  updateDoctor: async (id: number, data: Partial<Doctor>): Promise<ApiResponse<DoctorWithDetails>> => {
    return apiClient.put<ApiResponse<DoctorWithDetails>>(`/doctors/${id}`, data);
  },
};