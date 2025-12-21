import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import patientSlice from './slices/patientSlice';
import doctorSlice from './slices/doctorSlice';
//import medicalSlice from './slices/medicalSlice';
//import receptionSlice from './slices/receptionSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice,
    patients: patientSlice,
    doctors: doctorSlice,
    //medical: medicalSlice,
    //receptions: receptionSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: {} } }),
});

export default store;