import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userManagerApi from '../../api/userManagerApi';

export const getAllUsers = createAsyncThunk('userManager/getAllUsers', async (params) => {
  const response = await userManagerApi.getAllUsers(params);
  return response;
});

export const deleteUser = createAsyncThunk('userManager/deleteUser', async (idUser, params) => {
  const response = await userManagerApi.deleteUserById(idUser, params);
  return response;
});

const userManagerSlice = createSlice({
  name: 'userManager',
  initialState: {
    current: {},
    loading: false,
    message: '',
    error: '',
  },
  reducers: {},

  extraReducers: {
    // handle get list category
    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },

    // handle delete user by id
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

const { reducer, actions } = userManagerSlice;
export const {} = actions;
export default reducer;
