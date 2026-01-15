import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doctorsApi } from "../../api/doctors";
import { DoctorsState } from "../../types";

const initialState: DoctorsState = {
  doctors: [],
  optionsDoctors: [],
  isLoading: false,
  error: null,
};

export const fetchDoctors = createAsyncThunk("doctors/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await doctorsApi.getAllDoctors();
    if (response.success && response.data) {
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки докторов");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    clearDoctors: (state) => {
      state.doctors = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
        state.optionsDoctors = state.doctors.map((doctor) => ({
          value: doctor.id_doctor as number,
          label: `${doctor.user.second_name} ${doctor.user.first_name} ${doctor.user.middle_name}`,
        }));
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearDoctors, clearError } = doctorsSlice.actions;
export default doctorsSlice.reducer;
