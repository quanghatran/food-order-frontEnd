import {
  DELETE_SALE_CODE,
  GET_LIST_SALE_CODE,
  GET_LIST_STORE_ORDER,
  GET_NEW_USER_AND_STORE_BY_MONTH,
  GET_ORDER_BY_ID,
  GET_ORDER_REPORT_BY_MONTH,
  GET_ORDER_REPORT_BY_MONTH_STORE,
  GET_STORE_INFO,
  POST_ADD_SALE_CODE,
  UPDATE_ORDER_BY_ID,
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

  getOrderById: (idOrder) => {
    const url = `${GET_ORDER_BY_ID}${idOrder}`;
    return axiosClient.get(url);
  },

  deleteSaleCode: (idSaleCode, params) => {
    const url = `${DELETE_SALE_CODE}${idSaleCode}`;
    return axiosClient.delete(url, params);
  },

  updateOderById: (idOrder, statusOrder) => {
    const url = `${UPDATE_ORDER_BY_ID}${idOrder}`;
    return axiosClient.patch(url, statusOrder);
  },

  getOrderReportByMonthStore: (month) => {
    const url = `${GET_ORDER_REPORT_BY_MONTH_STORE}?month=${month}`;
    return axiosClient.get(url);
  },
};

export default storeApi;
