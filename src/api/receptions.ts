import { apiClient } from './apiClient';
import { ApiResponse } from '../types/api';
import { Reception, ReceptionWithSick, Sickness } from '../types';

export const receptionsApi = {
  getAllReceptions: async (): Promise<ApiResponse<Reception[]>> => {
    return apiClient.get<ApiResponse<Reception[]>>('/receptions');
  },

  getReception: async (id: number): Promise<ApiResponse<ReceptionWithSick>> => {
    return apiClient.get<ApiResponse<ReceptionWithSick>>(`/receptions/${id}`);
  },

  createReception: async (data: Omit<Reception, 'id_reception'>): Promise<ApiResponse<Reception>> => {
    return apiClient.post<ApiResponse<Reception>>('/receptions', data);
  },

  updateReception: async (id: number, data: Partial<Reception>): Promise<ApiResponse<Reception>> => {
    return apiClient.put<ApiResponse<Reception>>(`/receptions/${id}`, data);
  },

  updateSick: async (id: number, data: Partial<Sickness[]>): Promise<ApiResponse<Sickness[]>> => {
    return apiClient.put<ApiResponse<Sickness[]>>(`/sickness/${id}`, data);
  },
};