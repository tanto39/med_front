import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientsApi } from "../../api/patients";
import { PatientsState } from "../../types";

const initialState: PatientsState = {
  patients: [],
  optionsPatients: [],
  isLoading: false,
  error: null,
};

export const fetchPatients = createAsyncThunk("patients/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await patientsApi.getAll();
    if (response.success && response.data) {
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки пациентов");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearPatients: (state) => {
      state.patients = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.patients = action.payload;
        state.optionsPatients = state.patients.map((patient) => ({
          value: patient.id_patient as number,
          label: `${patient.user.second_name} ${patient.user.first_name} ${patient.user.middle_name}`,
        }));
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearPatients, clearError } = patientsSlice.actions;
export default patientsSlice.reducer;
