import {Patient, Doctor, UserRole} from './index';

// Типы для ответов API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface AuthResponse {
  user: {
    login: string;
    second_name: string;
    first_name: string;
    middle_name?: string;
    role_name: UserRole;
  };
  token?: string;
  patient?: Patient;
  doctor?: Doctor;
}

export interface UserResponse {
  login: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: UserRole;
}

export interface PatientResponse {
  id_patient: number;
  login: string;
  snils: string;
  policy_foms: number;
  phone_number: string;
  e_mail: string;
}
