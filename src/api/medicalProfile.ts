import { apiClient } from './apiClient';
import { ApiResponse } from '../types/api';
import { MedicalProfile } from '../types';

export const medicalProfileApi = {
  getAllProfiles: async (): Promise<ApiResponse<MedicalProfile[]>> => {
    return apiClient.get<ApiResponse<MedicalProfile[]>>('/medical/profiles');
  },

  getProfile: async (id: number): Promise<ApiResponse<MedicalProfile>> => {
    return apiClient.get<ApiResponse<MedicalProfile>>(`/medical/profiles/${id}`);
  },

  createProfile: async (data: Omit<MedicalProfile, 'id_medical_profile'>): Promise<ApiResponse<MedicalProfile>> => {
    return apiClient.post<ApiResponse<MedicalProfile>>('/medical/profiles', data);
  },

  updateProfile: async (id: number, data: Partial<MedicalProfile>): Promise<ApiResponse<MedicalProfile>> => {
    return apiClient.put<ApiResponse<MedicalProfile>>(`/medical/profiles/${id}`, data);
  },
};