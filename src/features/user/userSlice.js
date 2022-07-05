import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (params) => {
  const response = await userApi.getUserInfo(params);
  return response;
});

export const postOrder = createAsyncThunk('user/postOrder', async (params) => {
  const response = await userApi.postOrder(params);
  return response;
});

export const cancelOrder = createAsyncThunk('user/cancelOrder', async (idOrder) => {
  const response = await userApi.cancelOrder(idOrder);
  return response;
});

export const ratingOrder = createAsyncThunk('user/ratingOrder', async (idOrder, data) => {
  const response = await userApi.ratingOrder(idOrder, data);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    loading: false,
    message: '',
    error: '',
    totalQuantityItemCart: 0,
  },
  reducers: {
    totalQuantity: (state, action) => {
      state.totalQuantityItemCart = action.payload;
    },
  },

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

    // handle get use info
    [postOrder.pending]: (state) => {
      state.loading = true;
    },
    [postOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [postOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle cancel order
    [cancelOrder.pending]: (state) => {
      state.loading = true;
    },
    [cancelOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [cancelOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle rating order
    [ratingOrder.pending]: (state) => {
      state.loading = true;
    },
    [ratingOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [ratingOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = userSlice;
export const { totalQuantity } = actions;
export default reducer;
