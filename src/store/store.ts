import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import patientSlice from './slices/patientSlice';
import doctorSlice from './slices/doctorSlice';
import messageSlice from './slices/message';
import medicalProfileSlice from './slices/medicalProfileSlice';
//import receptionSlice from './slices/receptionSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    users: userSlice,
    patient: patientSlice,
    doctor: doctorSlice,
    message: messageSlice,
    medicalProfile: medicalProfileSlice,
    //receptions: receptionSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: {} } }),
});

export default store;