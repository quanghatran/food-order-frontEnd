import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (params) => {
  const response = await userApi.getUserInfo(params);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    loading: false,
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle get use info
    [getUserInfo.pending]: (state) => {
      state.loading = true;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = userSlice;
export const {} = actions;
export default reducer;
