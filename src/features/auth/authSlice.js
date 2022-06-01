import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

export const postAuthLogin = createAsyncThunk('auth/postAuthLogin', async (params, thunkApi) => {
  try {
    const response = await authApi.postLogin(params);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const postAuthRegister = createAsyncThunk(
  'auth/postAuthRegister',
  async (params, thunkApi) => {
    try {
      const response = await authApi.postRegister(params);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    loading: false,
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle post login
    [postAuthLogin.pending]: (state) => {
      state.loading = true;
    },
    [postAuthLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [postAuthLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle post register
    [postAuthRegister.pending]: (state) => {
      state.loading = true;
    },
    [postAuthRegister.fulfilled]: (state, action) => {
      state.error = '';
      state.loading = false;
      state.current = action.payload;
    },
    [postAuthRegister.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
