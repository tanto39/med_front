import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import patientSlice from './slices/patientSlice';
import doctorSlice from './slices/doctorSlice';
import doctorsSlice from './slices/doctorsSlice';
import messageSlice from './slices/message';
import medicalProfileSlice from './slices/medicalProfileSlice';
import patientsSlice from "./slices/patientsSlice";
import receptionSlice from "./slices/receptionSlice";
import diagnosesSlice from "./slices/diagnosesSlice";
//import receptionSlice from './slices/receptionSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice,
    patient: patientSlice,
    patients: patientsSlice,
    doctor: doctorSlice,
    doctors: doctorsSlice,
    message: messageSlice,
    medicalProfile: medicalProfileSlice,
    diagnos: diagnosesSlice,
    reception: receptionSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: {} } }),
});

export default store;