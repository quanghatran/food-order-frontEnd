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

export const addProduct = createAsyncThunk('products/addProduct', async (formData) => {
  const response = await productApi.addProduct(formData);
  return response;
});

export const getProductDetail = createAsyncThunk(
  'products/getProductDetail',
  async (idProduct, params) => {
    const response = await productApi.getProductDetail(idProduct, params);
    return response;
  }
);

export const getTopProducts = createAsyncThunk('products/getTopProducts', async (params) => {
  const response = await productApi.getTopProducts(params);
  return response;
});

export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (idCategory, params) => {
    const response = await productApi.getProductsByCategory(idCategory, params);
    return response;
  }
);

export const getProductsByStore = createAsyncThunk(
  'products/getProductsByStore',
  async (idStore, params) => {
    const response = await productApi.getProductByStore(idStore, params);
    return response;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    current: {},
    listTopProduct: {},
    productByCategory: [],
    productByStore: {},
    productDetail: {},
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

    // handle store add new product
    [addProduct.pending]: (state) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [addProduct.rejected]: (state, action) => {
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

    // handle get product detail
    [getProductDetail.pending]: (state) => {
      state.loading = true;
    },
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
    [getProductDetail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get top products
    [getTopProducts.pending]: (state) => {
      state.loading = true;
    },
    [getTopProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.listTopProduct = action.payload;
    },
    [getTopProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get products by category id
    [getProductsByCategory.pending]: (state) => {
      state.loading = true;
    },
    [getProductsByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      const products = action.payload;
      state.productByCategory = { ...state.productByCategory, products };
    },
    [getProductsByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle get products by store id
    [getProductsByStore.pending]: (state) => {
      state.loading = true;
    },
    [getProductsByStore.fulfilled]: (state, action) => {
      state.loading = false;
      state.productByStore = action.payload;
    },
    [getProductsByStore.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = productSlice;
export const {} = actions;
export default reducer;
