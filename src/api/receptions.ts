import { apiClient } from './apiClient';
import { ApiResponse } from '../types/api';
import { Reception } from '../types';

export const receptionsApi = {
  getAllReceptions: async (): Promise<ApiResponse<Reception[]>> => {
    return apiClient.get<ApiResponse<Reception[]>>('/receptions');
  },

  getReception: async (id: number): Promise<ApiResponse<any>> => {
    return apiClient.get<ApiResponse<any>>(`/receptions/${id}`);
  },

  createReception: async (data: Omit<Reception, 'id_reception'>): Promise<ApiResponse<Reception>> => {
    return apiClient.post<ApiResponse<Reception>>('/receptions', data);
  },

  updateReception: async (id: number, data: Partial<Reception>): Promise<ApiResponse<Reception>> => {
    return apiClient.put<ApiResponse<Reception>>(`/receptions/${id}`, data);
  },
};