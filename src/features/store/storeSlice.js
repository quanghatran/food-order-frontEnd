import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storeApi from '../../api/storeApi';

export const getStoreInfo = createAsyncThunk('store/getStoreInfo', async (params) => {
  const response = await storeApi.getStoreInfo(params);
  return response;
});

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    current: {},
    loading: false,
    error: '',
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
  },
});

const { reducer, actions } = storeSlice;
export const {} = actions;
export default reducer;
