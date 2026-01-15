import { apiClient } from './apiClient';
import { ApiResponse } from '../types/api';
import { Diagnos } from '../types';

export const diagnosesApi = {
  getAllDiagnoses: async (): Promise<ApiResponse<Diagnos[]>> => {
    return apiClient.get<ApiResponse<Diagnos[]>>('/medical/diagnoses');
  },

  getDiagnos: async (id: number): Promise<ApiResponse<Diagnos>> => {
    return apiClient.get<ApiResponse<Diagnos>>(`/medical/diagnoses/${id}`);
  },

  createDiagnos: async (data: Omit<Diagnos, 'id_diagnos'>): Promise<ApiResponse<Diagnos>> => {
    return apiClient.post<ApiResponse<Diagnos>>('/medical/diagnoses', data);
  },

  updateDiagnos: async (id: number, data: Partial<Diagnos>): Promise<ApiResponse<Diagnos>> => {
    return apiClient.put<ApiResponse<Diagnos>>(`/medical/diagnoses/${id}`, data);
  },
};