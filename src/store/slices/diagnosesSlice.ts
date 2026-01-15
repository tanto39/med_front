import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { diagnosesApi } from "../../api/diagnoses";
import { Diagnos, DiagnosesState } from "../../types/index";

const initialState: DiagnosesState = {
  diagnoses: [],
  optionsDiagnoses: [],
  currentDiagnos: null,
  isLoading: false,
  error: null,
  successSend: false,
};

export const fetchDiagnoses = createAsyncThunk("diagnoses/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await diagnosesApi.getAllDiagnoses();
    if (response.success && response.data) {
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

export const fetchDiagnos = createAsyncThunk(
  "diagnoses/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await diagnosesApi.getDiagnos(id);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка загрузки");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

export const createDiagnos = createAsyncThunk(
  "diagnoses/create",
  async (data: Omit<Diagnos, "id_diagnos">, { rejectWithValue }) => {
    try {
      const response = await diagnosesApi.createDiagnos(data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка создания");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

export const updateDiagnos = createAsyncThunk(
  "diagnoses/update",
  async ({ id, data }: { id: number; data: Partial<Diagnos> }, { rejectWithValue }) => {
    try {
      const response = await diagnosesApi.updateDiagnos(id, data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка обновления");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

const DiagnosSlice = createSlice({
  name: "Diagnos",
  initialState,
  reducers: {
    clearCurrentDiagnos: (state) => {
      state.currentDiagnos = null;
    },
    setCurrentDiagnos: (state, action: PayloadAction<Diagnos | null>) => {
      state.currentDiagnos = action.payload;
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
      // Получение всех диагнозов
      .addCase(fetchDiagnoses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiagnoses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diagnoses = action.payload;
        state.optionsDiagnoses = state.diagnoses.map((diagnos) => ({
          value: diagnos.id_diagnos,
          label: diagnos.diagnos_name as string,
        }));
      })
      .addCase(fetchDiagnoses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Получение по ID
      .addCase(fetchDiagnos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDiagnos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDiagnos = action.payload;
      })
      .addCase(fetchDiagnos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Создание
      .addCase(createDiagnos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDiagnos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.diagnoses.push(action.payload);
        state.currentDiagnos = action.payload;
        state.successSend = true;
      })
      .addCase(createDiagnos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление
      .addCase(updateDiagnos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDiagnos.fulfilled, (state, action) => {
        state.isLoading = false;
        // Обновляем в списке
        const index = state.diagnoses.findIndex((p) => p.id_diagnos === action.payload.id_diagnos);
        if (index !== -1) {
          state.diagnoses[index] = action.payload;
        }
        if (state.currentDiagnos?.id_diagnos === action.payload.id_diagnos) {
          state.currentDiagnos = action.payload;
        }
        state.successSend = true;
      })
      .addCase(updateDiagnos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentDiagnos, setCurrentDiagnos, clearError, clearSend } = DiagnosSlice.actions;

// Экспортируем reducer
export default DiagnosSlice.reducer;
