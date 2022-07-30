import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../../api/adminApi';

export const getNewJoinAccount = createAsyncThunk('admin/getNewJoinAccount', async (params) => {
  const response = await adminApi.getNewUserAndStoreByMonth(params);
  return response;
});

export const getOrderReportByMonth = createAsyncThunk(
  'admin/getOrderReportByMonth',
  async (month) => {
    const response = await adminApi.getOrderReportByMonth(month);
    return response;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    current: {},
    loading: false,
    message: '',
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle new join account
    [getNewJoinAccount.pending]: (state) => {
      state.loading = true;
    },
    [getNewJoinAccount.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getNewJoinAccount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get order report by month
    [getOrderReportByMonth.pending]: (state) => {
      state.loading = true;
    },
    [getOrderReportByMonth.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getOrderReportByMonth.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = adminSlice;
export const {} = actions;
export default reducer;
