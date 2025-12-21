import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { patientsApi } from '../../api/patients';
import { PatientsState } from '../../types';

const initialState: PatientsState = {
  patients: [],
  currentPatient: null,
  isLoading: false,
  error: null,
};

export const fetchPatient = createAsyncThunk(
  'patients/fetchOne',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await patientsApi.getPatient(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка загрузки пациента');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await patientsApi.updatePatient(id, data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка обновления пациента');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearCurrentPatient: (state) => {
      state.currentPatient = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch patient
      .addCase(fetchPatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPatient = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update patient
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPatient = action.payload;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPatient, clearError } = patientSlice.actions;
export default patientSlice.reducer;