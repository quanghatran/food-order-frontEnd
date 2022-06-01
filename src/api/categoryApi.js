import {
  DELETE_CATEGORY,
  GET_CATEGORY_INFO_BY_ID,
  GET_LIST_CATEGORY,
  PATCH_UPDATE_CATEGORY,
  POST_ADD_CATEGORY,
} from '../constants/subUrl';
import axiosClient from './axiosClient';

const categoryApi = {
  getCategory: (params) => {
    const url = GET_LIST_CATEGORY;
    return axiosClient.get(url, params);
  },

  deleteCategoryById: (id, params) => {
    const url = `${DELETE_CATEGORY}${id}`;
    return axiosClient.delete(url, params);
  },

  addCategory: (params) => {
    const url = POST_ADD_CATEGORY;
    return axiosClient.post(url, params);
  },

  getCategoryInfoById: (id, params) => {
    const url = `${GET_CATEGORY_INFO_BY_ID}${id}`;
    return axiosClient.get(url, params);
  },

  updateCategory: (id, params) => {
    // console.log(id);
    // console.log(params);
    const url = `${PATCH_UPDATE_CATEGORY}${id}`;
    return axiosClient.patch(url, params);
  },
};

export default categoryApi;
