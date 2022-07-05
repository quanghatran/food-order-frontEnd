import {
  DELETE_SALE_CODE,
  GET_LIST_SALE_CODE,
  GET_LIST_STORE_ORDER,
  GET_STORE_INFO,
  POST_ADD_SALE_CODE,
} from '../constants/subUrl';
import axiosClient from './axiosClient';

const storeApi = {
  getStoreInfo: (params) => {
    const url = GET_STORE_INFO;
    return axiosClient.get(url, params);
  },

  addSaleCode: (params) => {
    const url = POST_ADD_SALE_CODE;
    return axiosClient.post(url, params);
  },

  getListSaleCode: (params) => {
    const url = GET_LIST_SALE_CODE;
    return axiosClient.get(url, params);
  },

  getListStoreOrder: (params) => {
    const url = GET_LIST_STORE_ORDER;
    return axiosClient.get(url, { params });
  },

  deleteSaleCode: (idSaleCode, params) => {
    const url = `${DELETE_SALE_CODE}${idSaleCode}`;
    return axiosClient.delete(url, params);
  },
};

export default storeApi;
