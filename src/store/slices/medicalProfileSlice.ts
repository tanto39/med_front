import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { medicalProfileApi } from "../../api/medicalProfileApi";
import { MedicalProfile, MedicalProfileState } from "../../types/index";

const initialState: MedicalProfileState = {
  profiles: [],
  optionsProfiles: [],
  currentProfile: null,
  isLoading: false,
  error: null,
};

// Получение всех медицинских профилей
export const fetchMedicalProfiles = createAsyncThunk("medicalProfiles/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await medicalProfileApi.getAllProfiles();
    if (response.success && response.data) {
      return response.data;
    } else {
      return rejectWithValue(response.error || "Ошибка загрузки медицинских профилей");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "Ошибка сети");
  }
});

// Получение медицинского профиля по ID
export const fetchMedicalProfileById = createAsyncThunk(
  "medicalProfiles/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      // Если в API нет отдельного эндпоинта для получения по ID,
      // можно получить из списка или сделать новый запрос
      const response = await medicalProfileApi.getAllProfiles();
      if (response.success && response.data) {
        const profile = response.data.find((p) => p.id_medical_profile === id);
        if (profile) {
          return profile;
        } else {
          return rejectWithValue("Медицинский профиль не найден");
        }
      } else {
        return rejectWithValue(response.error || "Ошибка загрузки медицинского профиля");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

// Создание медицинского профиля
export const createMedicalProfile = createAsyncThunk(
  "medicalProfiles/create",
  async (data: Omit<MedicalProfile, "id_medical_profile">, { rejectWithValue }) => {
    try {
      const response = await medicalProfileApi.createProfile(data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка создания медицинского профиля");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

// Обновление медицинского профиля
export const updateMedicalProfile = createAsyncThunk(
  "medicalProfiles/update",
  async ({ id, data }: { id: number; data: Partial<MedicalProfile> }, { rejectWithValue }) => {
    try {
      const response = await medicalProfileApi.updateProfile(id, data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || "Ошибка обновления медицинского профиля");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка сети");
    }
  }
);

const medicalProfileSlice = createSlice({
  name: "medicalProfiles",
  initialState,
  reducers: {
    // Очистка текущего профиля
    clearCurrentProfile: (state) => {
      state.currentProfile = null;
    },

    // Установка текущего профиля
    setCurrentProfile: (state, action: PayloadAction<MedicalProfile | null>) => {
      state.currentProfile = action.payload;
    },

    // Очистка ошибки
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех профилей
      .addCase(fetchMedicalProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMedicalProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profiles = action.payload;
        state.optionsProfiles = state.profiles.map((profile) => ({
          value: profile.id_medical_profile,
          label: profile.name_medical_profile as string,
        }));
      })
      .addCase(fetchMedicalProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Получение профиля по ID
      .addCase(fetchMedicalProfileById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMedicalProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchMedicalProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Создание профиля
      .addCase(createMedicalProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMedicalProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profiles.push(action.payload);
        state.currentProfile = action.payload;
      })
      .addCase(createMedicalProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Обновление профиля
      .addCase(updateMedicalProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMedicalProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // Обновляем в списке
        const index = state.profiles.findIndex((p) => p.id_medical_profile === action.payload.id_medical_profile);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
        // Обновляем текущий профиль, если он активен
        if (state.currentProfile?.id_medical_profile === action.payload.id_medical_profile) {
          state.currentProfile = action.payload;
        }
      })
      .addCase(updateMedicalProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспортируем actions
export const { clearCurrentProfile, setCurrentProfile, clearError } = medicalProfileSlice.actions;

// Экспортируем reducer
export default medicalProfileSlice.reducer;
