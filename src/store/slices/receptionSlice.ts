import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { receptionsApi } from "../../api/receptions";
import { Reception, ReceptionState, Sickness } from "../../types";

const initialState: ReceptionState = {
  reception: null,
  sickness: null,
  isLoading: false,
  successSend: false,
  error: null,
};

export const fetchReception = createAsyncThunk("reception/fetch", async (id: number, { rejectWithValue }) => {
  try {
    const response = await receptionsApi.getReception(id);
    if (response.success && response.data) {
      response.data.reception = formatReceptionData(response.data.reception);

      if (response.data.sicknesses) response.data.sicknesses = formatSickData(response.data.sicknesses);

      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const createReception = createAsyncThunk("reception/create", async (data: any, { rejectWithValue }) => {
  try {
    const response = await receptionsApi.createReception(data);
    if (response.success && response.data) {
      response.data = formatReceptionData(response.data);
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка создания приема");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const updateReception = createAsyncThunk(
  "reception/update",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await receptionsApi.updateReception(id, data);
      if (response.success && response.data) {
        response.data = formatReceptionData(response.data);
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка обновления приема");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

export const updateSick = createAsyncThunk(
  "reception/updateSick",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await receptionsApi.updateSick(id, data);
      if (response.success && response.data) {
        response.data = formatSickData(response.data);
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка обновления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

const formatReceptionData = (data: Reception): Reception => {
  const formattedData = { ...data };
  formattedData.reception_time = data.reception_time.slice(0, 5);
  return formattedData;
};

const formatSickData = (data: Sickness[]): Sickness[] => {
  const formattedData = { ...data };

  formattedData.forEach((sickness) => {
    if (sickness.sick_sheet) {
      sickness.sick_sheet.sick_sheet_date = sickness.sick_sheet.sick_sheet_date.split("T")[0];
      sickness.sick_sheet.next_date = sickness.sick_sheet.next_date?.split("T")[0];
    }
  });

  return formattedData;
};

export const receptionSlice = createSlice({
  name: "reception",
  initialState,
  reducers: {
    clearReception: (state) => {
      state.reception = null;
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
      .addCase(fetchReception.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReception.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reception = action.payload.reception;
        if (action.payload.sicknesses) state.sickness = action.payload.sicknesses;
      })
      .addCase(fetchReception.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create rec
      .addCase(createReception.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createReception.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reception = action.payload;
        state.successSend = true;
      })
      .addCase(createReception.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update rec
      .addCase(updateReception.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateReception.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reception = action.payload;
        state.successSend = true;
      })
      .addCase(updateReception.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update sick
      .addCase(updateSick.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSick.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sickness = action.payload;
        state.successSend = true;
      })
      .addCase(updateSick.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReception, clearError, clearSend } = receptionSlice.actions;
export default receptionSlice.reducer;
