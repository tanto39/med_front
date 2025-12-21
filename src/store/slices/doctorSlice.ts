import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { doctorsApi } from '../../api/doctors';
import { DoctorsState } from '../../types';

const initialState: DoctorsState = {
  doctors: [],
  currentDoctor: null,
  isLoading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await doctorsApi.getAllDoctors();
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка загрузки докторов');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const fetchDoctor = createAsyncThunk(
  'doctors/fetchOne',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await doctorsApi.getDoctor(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка загрузки доктора');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const createDoctor = createAsyncThunk(
  'doctors/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await doctorsApi.createDoctor(data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка создания доктора');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const updateDoctor = createAsyncThunk(
  'doctors/update',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await doctorsApi.updateDoctor(id, data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка обновления доктора');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single doctor
      .addCase(fetchDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create doctor
      .addCase(createDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update doctor
      .addCase(updateDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDoctor = action.payload;
        // Update in list
        const index = state.doctors.findIndex(d => d.id_doctor === action.payload.id_doctor);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentDoctor, clearError } = doctorSlice.actions;
export default doctorSlice.reducer;