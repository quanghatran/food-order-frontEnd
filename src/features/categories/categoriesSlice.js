import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';

export const getListCategory = createAsyncThunk('category/getListCategory', async (params) => {
  const response = await categoryApi.getCategory(params);
  return response;
});

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (idCategory, params) => {
    const response = await categoryApi.deleteCategoryById(idCategory, params);
    return response;
  }
);

export const addCategory = createAsyncThunk('category/addCategory', async (params, thunkApi) => {
  try {
    const response = await categoryApi.addCategory(params);
    return response;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (dataDispatch, thunkApi) => {
    try {
      const response = await categoryApi.updateCategory(
        dataDispatch.idCategory,
        dataDispatch.dataSubmit
      );
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    current: {},
    categoryName: '',
    message: '',
    loading: false,
    error: '',
  },
  reducers: {
    searchProductByCategory(state, action) {
      state.categoryName = action.payload;
    },
  },

  extraReducers: {
    // handle get list category
    [getListCategory.pending]: (state) => {
      state.loading = true;
    },
    [getListCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getListCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle delete category
    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle add new category
    [addCategory.pending]: (state) => {
      state.loading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [addCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle update category by id
    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = categorySlice;
export const { searchProductByCategory } = actions;
export default reducer;
