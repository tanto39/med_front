import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { usersApi } from '../../api/users';
import { UsersState } from '../../types';

const initialState: UsersState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersApi.getAllUsers();
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка загрузки пользователей');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchOne',
  async (login: string, { rejectWithValue }) => {
    try {
      const response = await usersApi.getUser(login);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка загрузки пользователя');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ login, data }: { login: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await usersApi.updateUser(login, data);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Ошибка обновления пользователя');
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка сети');
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch single user
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        // Update in list
        const index = state.users.findIndex(u => u.login === action.payload.login);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentUser, clearError } = userSlice.actions;
export default userSlice.reducer;