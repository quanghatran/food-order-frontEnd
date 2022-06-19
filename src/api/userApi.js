import { GET_HISTORY_ORDER, GET_USER } from '../constants/subUrl';
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
};

export default userApi;
