import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import storeApi from '../../api/storeApi';

export const getListSaleCode = createAsyncThunk('saleCode/getListSaleCode', async (params) => {
  const response = await storeApi.getListSaleCode(params);
  return response;
});

export const addSaleCode = createAsyncThunk('saleCode/addSaleCode', async (params, thunkApi) => {
  try {
    const response = await storeApi.addSaleCode(params);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deleteSaleCode = createAsyncThunk(
  'saleCode/deleteSaleCode',
  async (idSaleCode, params) => {
    const response = await storeApi.deleteSaleCode(idSaleCode, params);
    return response;
  }
);

const saleCodeSlice = createSlice({
  name: 'saleCode',
  initialState: {
    current: {},
    message: '',
    loading: false,
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle get list sale code
    [getListSaleCode.pending]: (state) => {
      state.loading = true;
    },
    [getListSaleCode.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getListSaleCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle delete category
    [deleteSaleCode.pending]: (state) => {
      state.loading = true;
    },
    [deleteSaleCode.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [deleteSaleCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle add new category
    [addSaleCode.pending]: (state) => {
      state.loading = true;
    },
    [addSaleCode.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [addSaleCode.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    // // handle update category by id
    // [updateCategory.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // },
    // [updateCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },
  },
});

const { reducer, actions } = saleCodeSlice;
export const {} = actions;
export default reducer;
