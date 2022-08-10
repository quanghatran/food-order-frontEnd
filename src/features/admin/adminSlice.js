import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from '../../api/adminApi';
import orderApi from '../../api/orderApi';

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

export const getAllOrderFeatrure = createAsyncThunk('admin/getAllOrderFeatrure', async (prams) => {
  const response = await orderApi.getAllOrder(prams);
  return response;
});

export const getNotificationAdmin = createAsyncThunk('admin/getNotificationAdmin', async (id) => {
  const response = await adminApi.getNotificationAdmin(id);
  return response;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    current: {},
    loading: false,
    message: '',
    error: '',
    orders: [],
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

    // get all order in the system
    [getAllOrderFeatrure.pending]: (state) => {
      state.loading = true;
    },
    [getAllOrderFeatrure.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [getAllOrderFeatrure.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // getNotificationAdmin
    [getNotificationAdmin.pending]: (state) => {
      state.loading = true;
    },
    [getNotificationAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getNotificationAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // getNotificationAdmin
    [getNotificationAdmin.pending]: (state) => {
      state.loading = true;
    },
    [getNotificationAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getNotificationAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = adminSlice;
export const {} = actions;
export default reducer;
