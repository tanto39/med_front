import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doctorsApi } from "../../api/doctors";
import { DoctorState } from "../../types";
import { DoctorWithDetails } from "../../types/api";
import { AppDispatch } from "../helpers";

const initialState: DoctorState = {
  currentDoctor: null,
  isLoading: false,
  successSend: false,
  error: null,
};

export const fetchDoctor = createAsyncThunk("doctor/fetchOne", async (id: number, { rejectWithValue }) => {
  try {
    const response = await doctorsApi.getDoctor(id);
    if (response.success && response.data) {
      response.data = formatResponseData(response.data);
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки доктора");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const createDoctor = createAsyncThunk("doctor/create", async (data: any, { rejectWithValue }) => {
  try {
    const response = await doctorsApi.createDoctor(data);
    if (response.success && response.data) {
      response.data = formatResponseData(response.data);
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка создания доктора");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await doctorsApi.updateDoctor(id, data);
      if (response.success && response.data) {
        response.data = formatResponseData(response.data);
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка обновления доктора");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

const formatResponseData = (data: DoctorWithDetails): DoctorWithDetails => {
  const formattedData = { ...data };

  if (formattedData.receptions) {
    formattedData.receptions.forEach((reception) => {
      reception.reception_time = reception.reception_time.slice(0, 5);
    });
  }

  return formattedData;
};

// export const clearSend = () => async (dispach: AppDispatch) => {
//   dispach(doctorSlice.actions.clearSend());
// };

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSend(state) {
      state.successSend = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      // Update doctor
      .addCase(updateDoctor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDoctor = action.payload;
        state.successSend = true;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentDoctor, clearError, clearSend } = doctorSlice.actions;
export default doctorSlice.reducer;
