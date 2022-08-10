import {
  GET_ADMIN_INFO,
  GET_HISTORY_ORDER,
  GET_LIST_SALE_CODE_BY_ID,
  GET_NOTIFICATION_USER,
  GET_USER,
  PATCH_CANCEL_ORDER,
  PATCH_SEEN_NOTIFICATION,
  PATCH_UPDATE_USER,
  POST_CREATE_ORDER,
  POST_RATING_ORDER,
  USER_GET_NOTIFICATION,
} from '../constants/subUrl';
import axiosClient from './axiosClient';

const userApi = {
  getUserInfo: (params) => {
    const url = GET_USER;
    return axiosClient.get(url, params);
  },

  getAdminInfo: (params) => {
    const url = GET_ADMIN_INFO;
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

  userGetNotification: (params) => {
    const url = USER_GET_NOTIFICATION;
    return axiosClient.get(url, params);
  },

  getNotificationUser: () => {
    const url = GET_NOTIFICATION_USER;
    return axiosClient.get(url);
  },

  seenNotification: (id) => {
    const url = `${PATCH_SEEN_NOTIFICATION}${id}`;
    return axiosClient.patch(url);
  },
};

export default userApi;
