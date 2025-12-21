import { apiClient } from './apiClient';
import { ApiResponse, PatientResponse } from '../types/api';
import { Patient } from '../types';

export const patientsApi = {
  getPatient: async (id: number): Promise<ApiResponse<PatientResponse>> => {
    return apiClient.get<ApiResponse<PatientResponse>>(`/patients/${id}`);
  },

  updatePatient: async (id: number, data: Partial<Patient>): Promise<ApiResponse<PatientResponse>> => {
    return apiClient.put<ApiResponse<PatientResponse>>(`/patients/${id}`, data);
  },
};