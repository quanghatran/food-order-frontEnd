import { GET_HISTORY_ORDER, GET_USER, PATCH_UPDATE_USER } from '../constants/subUrl';
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
};

export default userApi;
