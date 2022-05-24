import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

export const postAuthLogin = createAsyncThunk('auth/postAuthLogin', async (params) => {
  const response = await authApi.postLogin(params);
  console.log(response);
  return response;
});

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
      console.log(action.payload);
      state.error = '';
      state.loading = false;
      state.current = action.payload;
    },
    [postAuthLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = authSlice;
export const {} = actions;
export default reducer;
