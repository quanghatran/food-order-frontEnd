import { GET_PRODUCTS_ORDER, GET_RATING_ORDER } from '../constants/subUrl';
import axiosClient from './axiosClient';

const storeApi = {
  getProductsOrder: (idOrder, params) => {
    const url = `${GET_PRODUCTS_ORDER}${idOrder}`;
    return axiosClient.get(url, params);
  },

  getRatingOrder: (idOrder, params) => {
    const url = `${GET_RATING_ORDER}${idOrder}`;
    return axiosClient.get(url, params);
  },
};

export default storeApi;
