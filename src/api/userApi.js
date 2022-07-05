import {
  GET_HISTORY_ORDER,
  GET_LIST_SALE_CODE_BY_ID,
  GET_USER,
  PATCH_CANCEL_ORDER,
  PATCH_UPDATE_USER,
  POST_CREATE_ORDER,
  POST_RATING_ORDER,
} from '../constants/subUrl';
import axiosClient from './axiosClient';

const userApi = {
  getUserInfo: (params) => {
    const url = GET_USER;
    return axiosClient.get(url, params);
  },

  getHistoryOrder: () => {
    const url = GET_HISTORY_ORDER;
    return axiosClient.get(url);
  },

  patchUpdateUser: (query) => {
    const url = PATCH_UPDATE_USER;
    return axiosClient.patch(url, query);
  },

  getListSaleCodeById: (idStore) => {
    const url = `${GET_LIST_SALE_CODE_BY_ID}${idStore}`;
    return axiosClient.get(url);
  },

  postOrder: (data) => {
    const url = POST_CREATE_ORDER;
    return axiosClient.post(url, data);
  },

  cancelOrder: (idOrder) => {
    const url = `${PATCH_CANCEL_ORDER}${idOrder}`;
    return axiosClient.patch(url);
  },

  ratingOrder: (idOrder, dataRating) => {
    const url = `${POST_RATING_ORDER}${idOrder}`;
    return axiosClient.post(url, dataRating);
  },
};

export default userApi;
