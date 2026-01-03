import { ReactNode } from "react";
import { PatientWithDetails } from "./api";

// Базовые типы данных
export interface User {
  login: string;
  second_name: string;
  first_name: string;
  middle_name?: string;
  role_name: UserRole;
  patient?: Patient;
  doctor?: Doctor;
}

export type UserRole = "patient" | "doctor" | "admin";

export interface Patient {
  id_patient: number;
  login: string;
  snils: string;
  policy_foms: number;
  phone_number: string;
  e_mail: string;
}

export interface Doctor {
  id_doctor: number;
  login: string;
  id_medical_degree: number;
  id_medical_profile: number;
}

export interface MedicalProfile {
  id_medical_profile: number;
  name_medical_profile: string;
  descr_medical_profile?: string;
}

export interface Reception {
  id_reception: number;
  reception_date: string;
  reception_time: string;
  id_ambulatory_card: number;
  id_doctor: number;
}

export interface ReceptionShort{
  id_reception: number;
  reception_date: string;
  reception_time: string;
  doctor_info?: {
    id_doctor: number;
    doctor_name: string;
    medical_profile: string;
  };
  patient_info?: {
    id_patient: number;
    patient_name: string;
  };
}

export interface AmbulatoryCard {
  id_ambulatory_card: number;
  registration_date: string;
  registration_date_end?: string;
  id_patient: number;
}

export interface Passport {
  id_passport: number;
  passport_series: number;
  passport_number: number;
  given_by: string;
  given_date: string;
  id_patient: number;
}

export interface Sickness {
  id_sickness: number;
  id_diagnos: number;
  id_reception: number;
  complaint?: string;
  medication_text?: string;
}

export interface SickSheet {
  id_sick_sheet: number;
  sick_sheet_num: number;
  sick_sheet_date: string;
  next_date?: string;
  id_sickness: number;
}

export interface Diagnos {
  id_diagnos: number;
  diagnos_name: string;
}

export interface Medicament {
  id_medicament: number;
  medicament_name: string;
  medicament_descr?: string;
}

// Типы для состояния Redux
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface PatientState {
  currentPatient: PatientWithDetails | null;
  isLoading: boolean;
  error: string | null;
  successSend: boolean;
}

export interface DoctorsState {
  doctors: Doctor[];
  currentDoctor: Doctor | null;
  isLoading: boolean;
  error: string | null;
}

export interface MedicalState {
  profiles: MedicalProfile[];
  currentProfile: MedicalProfile | null;
  isLoading: boolean;
  error: string | null;
}

export interface ReceptionsState {
  receptions: Reception[];
  currentReception: Reception | null;
  isLoading: boolean;
  error: string | null;
}

export interface IMessage {
  type: string;
  title: string;
  message: ReactNode;
}

export interface IMessageSlice {
  message: IMessage
}

// Root state
export interface RootState {
  auth: AuthState;
  users: UsersState;
  patient: PatientState;
  doctors: DoctorsState;
  medical: MedicalState;
  receptions: ReceptionsState;
}

export type IUrlParam = {
  id: string
}
