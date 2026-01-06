import { UserRole } from "./index";

// Типы для форм
export interface IInputField {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  customClassName?: string;
  disabled?: boolean;
  roles?: UserRole[];
}

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface LoginFormData {
  login: string;
  password: string;
}

export interface PatientFormData {
  second_name: string;
  first_name: string;
  middle_name: string;
  snils: string;
  policy_foms: number;
  phone_number: string;
  e_mail: string;
  id_ambulatory_card: number;
  registration_date: string;
  registration_date_end?: string;
  id_passport: number;
  passport_series: number;
  passport_number: number;
  given_by: string;
  given_date: string;
}

export interface DoctorFormData {
  second_name: string;
  first_name: string;
  middle_name: string;
  //id_medical_degree: number;
  id_medical_profile: number;
}
