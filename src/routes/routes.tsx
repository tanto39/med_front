import { Navigate, RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import LoginPage from '../pages/LoginPage/LoginPage';
import DoctorsPage from '../pages/DoctorsPage/DoctorsPage';
import DoctorPage from '../pages/DoctorPage/DoctorPage';
import PatientsPage from '../pages/PatientsPage/PatientsPage';
import PatientPage from '../pages/PatientPage/PatientPage';
import MedicalProfilesPage from '../pages/MedicalProfilesPage/MedicalProfilesPage';
import ReceptionPage from '../pages/ReceptionPage/ReceptionPage';
import Page404 from '../pages/Page404/Page404';


export const publicRoutes: RouteObject[] = [
  { path: "/", element: <LoginPage/> },
  { path: "*", element: <Navigate replace to="/" /> },
];

export const privateRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard/> },
  { path: '/doctors', element: <DoctorsPage /> },
  { path: '/doctors/:id', element: <DoctorPage /> },
  { path: '/patients', element: <PatientsPage /> },
  { path: '/patients/:id', element: <PatientPage /> },
  { path: '/medical_profiles', element: <MedicalProfilesPage /> },
  { path: '/reception/:id', element: <ReceptionPage /> },
  { path: '/404', element: <Page404 /> },
  { path: "*", element: <Navigate replace to="/404" /> },
];