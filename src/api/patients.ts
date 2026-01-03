import { apiClient } from './apiClient';
import { ApiResponse, PatientResponse, PatientWithDetails } from '../types/api';
import { Patient } from '../types';

export const patientsApi = {
  getPatient: async (id: number): Promise<ApiResponse<PatientWithDetails>> => {
    return apiClient.get<ApiResponse<PatientWithDetails>>(`/patients/${id}`);
  },

  updatePatient: async (id: number, data: Partial<Patient>): Promise<ApiResponse<PatientWithDetails>> => {
    return apiClient.put<ApiResponse<PatientWithDetails>>(`/patients/${id}`, data);
  },
};