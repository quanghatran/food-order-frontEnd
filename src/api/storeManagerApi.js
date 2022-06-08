import axiosClient from './axiosClient';
import { DELETE_STORE_BY_ID, GET_ALL_STORE } from '../constants/subUrl/index';

const storeManagerApi = {
  getAllStores: (params) => {
    const url = GET_ALL_STORE;
    return axiosClient.get(url, params);
  },

  deleteStoreById: (id, params) => {
    const url = `${DELETE_STORE_BY_ID}${id}`;
    return axiosClient.delete(url, params);
  },
};

export default storeManagerApi;
