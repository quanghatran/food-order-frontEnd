import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storeManagerApi from '../../api/storeManagerApi';

export const getAllStore = createAsyncThunk('storeManager/getAllStore', async (params) => {
  const response = await storeManagerApi.getAllStores(params);
  return response;
});

export const deleteStore = createAsyncThunk('storeManager/deleteStore', async (idStore, params) => {
  const response = await storeManagerApi.deleteStoreById(idStore, params);
  return response;
});

const storeManagerSlice = createSlice({
  name: 'storeManager',
  initialState: {
    current: {},
    loading: false,
    message: '',
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle get list store manager
    [getAllStore.pending]: (state) => {
      state.loading = true;
    },
    [getAllStore.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getAllStore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle delete user by id
    // [deleteUser.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // },
    // [deleteUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },
  },
});

const { reducer, actions } = storeManagerSlice;
export const {} = actions;
export default reducer;
