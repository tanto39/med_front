import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { patientsApi } from "../../api/patients";
import { PatientState } from "../../types";
import { PatientWithDetails } from "../../types/api";
import { AppDispatch } from "../helpers";

const initialState: PatientState = {
  currentPatient: null,
  isLoading: false,
  successSend: false,
  error: null,
};

export const fetchPatient = createAsyncThunk("patients/fetchOne", async (id: number, { rejectWithValue }) => {
  try {
    const response = await patientsApi.getPatient(id);
    if (response.success && response.data) {
      response.data = formatResponseData(response.data);
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки пациента");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const updatePatient = createAsyncThunk(
  "patients/update",
  async ({ id, data }: { id: number; data: PatientWithDetails }, { rejectWithValue }) => {
    try {
      const response = await patientsApi.updatePatient(id, data);
      if (response.success && response.data) {
        response.data = formatResponseData(response.data);
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка обновления пациента");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

const formatResponseData = (data: PatientWithDetails): PatientWithDetails => {
  const formattedData = { ...data };

  if (formattedData.ambulatory_card) {
    formattedData.ambulatory_card = {
      ...formattedData.ambulatory_card,
      registration_date: formattedData.ambulatory_card.registration_date.split("T")[0],
      registration_date_end: formattedData.ambulatory_card.registration_date_end?.split("T")[0],
    };
  }

  if (formattedData.passport) {
    formattedData.passport = {
      ...formattedData.passport,
      given_date: formattedData.passport.given_date.split("T")[0],
    };
  }

  if(formattedData.receptions) {
    formattedData.receptions.forEach((reception) => {
      reception.reception_time = reception.reception_time.slice(0, 5);
    })
  }

  return formattedData;
};

export const clearSend = () => async (dispach: AppDispatch) => {
  dispach(patientSlice.actions.clearSend());
};

export const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearCurrentPatient: (state) => {
      state.currentPatient = null;
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
        state.successSend = true;
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPatient, clearError } = patientSlice.actions;
export default patientSlice.reducer;
