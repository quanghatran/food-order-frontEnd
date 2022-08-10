import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserInfo = createAsyncThunk('user/getUserInfo', async (params) => {
  const response = await userApi.getUserInfo(params);
  return response;
});

export const getAdminInfo = createAsyncThunk('user/getAdminInfo', async (params) => {
  const response = await userApi.getAdminInfo(params);
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

export const ratingOrderFunction = createAsyncThunk('user/ratingOrderFunction', async (data) => {
  const response = await userApi.ratingOrder(data.idOrder, data.dataRating);
  return response;
});

export const userGetNotification = createAsyncThunk('user/userGetNotification', async (params) => {
  const response = await userApi.userGetNotification(params);
  return response;
});

export const patchSeenNotification = createAsyncThunk('user/PatchSeenNotification', async (id) => {
  const response = await userApi.seenNotification(id);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    adminInfo: {},
    loading: false,
    notification: {},
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

    // handle get admin info
    [getAdminInfo.pending]: (state) => {
      state.loading = true;
    },
    [getAdminInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.adminInfo = action.payload;
    },
    [getAdminInfo.rejected]: (state, action) => {
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
    [ratingOrderFunction.pending]: (state) => {
      state.loading = true;
    },
    [ratingOrderFunction.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [ratingOrderFunction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get notification
    [userGetNotification.pending]: (state) => {
      state.loading = true;
    },
    [userGetNotification.fulfilled]: (state, action) => {
      state.loading = false;
      state.notification = action.payload;
    },
    [userGetNotification.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = userSlice;
export const { totalQuantity } = actions;
export default reducer;
