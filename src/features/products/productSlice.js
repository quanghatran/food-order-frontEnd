import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

export const getListProduct = createAsyncThunk('products/getListProduct', async (params) => {
  const response = await productApi.getListProduct(params);
  return response;
});

export const getOwnerProducts = createAsyncThunk('products/getOwnerProducts', async (params) => {
  const response = await productApi.getOwnerProducts(params);
  return response;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    current: {},
    message: '',
    loading: false,
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle get list sale code
    [getListProduct.pending]: (state) => {
      state.loading = true;
    },
    [getListProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getListProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get list sale code
    [getOwnerProducts.pending]: (state) => {
      state.loading = true;
    },
    [getOwnerProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getOwnerProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // // handle delete category
    // [deleteSaleCode.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteSaleCode.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // },
    // [deleteSaleCode.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },

    // // handle add new category
    // [addSaleCode.pending]: (state) => {
    //   state.loading = true;
    // },
    // [addSaleCode.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.message = action.payload;
    // },
    // [addSaleCode.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error;
    // },
    // // // handle update category by id
    // // [updateCategory.pending]: (state) => {
    // //   state.loading = true;
    // // },
    // // [updateCategory.fulfilled]: (state, action) => {
    // //   state.loading = false;
    // //   state.message = action.payload;
    // // },
    // // [updateCategory.rejected]: (state, action) => {
    // //   state.loading = false;
    // //   state.error = action.error;
    // // },
  },
});

const { reducer, actions } = productSlice;
export const {} = actions;
export default reducer;
