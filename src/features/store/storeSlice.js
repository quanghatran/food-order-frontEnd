import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storeApi from '../../api/storeApi';
import orderApi from '../../api/orderApi';

export const getStoreInfo = createAsyncThunk('store/getStoreInfo', async (params) => {
  const response = await storeApi.getStoreInfo(params);
  return response;
});

export const getListStoreOrder = createAsyncThunk('store/getListStoreOrder', async (params) => {
  const response = await storeApi.getListStoreOrder(params);
  return response;
});

export const getOrderById = createAsyncThunk('store/getOrderById', async (idOrder) => {
  const response = await storeApi.getOrderById(idOrder);
  return response;
});

export const storeUpdateOrder = createAsyncThunk(
  'store/storeUpdateOrder',
  async ({ orderId, status }) => {
    const response = await storeApi.updateOderById(orderId, { status: status });
    return response;
  }
);

export const getOrderReportByMonthStore = createAsyncThunk(
  'admin/getOrderReportByMonth',
  async (month) => {
    const response = await storeApi.getOrderReportByMonthStore(month);
    return response;
  }
);

export const getProductsOrder = createAsyncThunk('admin/getProductsOrder', async (idOrder) => {
  const response = await orderApi.getProductsOrder(idOrder);
  return response;
});

export const getRatingOrder = createAsyncThunk('admin/getRatingOrder', async (idOrder) => {
  const response = await orderApi.getRatingOrder(idOrder);
  return response;
});

export const getNotificationStore = createAsyncThunk(
  'admin/getNotificationStore',
  async (prams) => {
    const response = await storeApi.getNotificationStore(prams);
    return response;
  }
);

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    current: {},
    loading: false,
    error: '',
    storeOrder: {},
    statusOrder: '',
    productsOrder: {},
    ratingOrder: {},
  },
  reducers: {},

  extraReducers: {
    // handle get store info
    [getStoreInfo.pending]: (state) => {
      state.loading = true;
    },
    [getStoreInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getStoreInfo.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get store info
    [getListStoreOrder.pending]: (state) => {
      state.loading = true;
    },
    [getListStoreOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.storeOrder = action.payload;
    },
    [getListStoreOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get store info
    [getOrderById.pending]: (state) => {
      state.loading = true;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.loading = false;
      state.storeOrder = action.payload;
    },
    [getOrderById.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // update order by id
    [storeUpdateOrder.pending]: (state) => {
      state.loading = true;
    },
    [storeUpdateOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.statusOrder = action.payload;
    },
    [storeUpdateOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get order report by month
    [getOrderReportByMonthStore.pending]: (state) => {
      state.loading = true;
    },
    [getOrderReportByMonthStore.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getOrderReportByMonthStore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get products order
    [getProductsOrder.pending]: (state) => {
      state.loading = true;
    },
    [getProductsOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.productsOrder = action.payload;
    },
    [getProductsOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // get rating order
    [getRatingOrder.pending]: (state) => {
      state.loading = true;
    },
    [getRatingOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.ratingOrder = action.payload;
    },
    [getRatingOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // getNotificationStore
    [getNotificationStore.pending]: (state) => {
      state.loading = true;
    },
    [getNotificationStore.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getNotificationStore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = storeSlice;
export const {} = actions;
export default reducer;
