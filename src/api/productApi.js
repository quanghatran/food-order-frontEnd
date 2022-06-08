import { GET_ALL_PRODUCT, GET_OWNER_PRODUCTS } from '../constants/subUrl';
import axiosClient from './axiosClient';

const productApi = {
  getListProduct: (params) => {
    const url = GET_ALL_PRODUCT;
    return axiosClient.get(url, params);
  },

  getOwnerProducts: (params) => {
    const url = GET_OWNER_PRODUCTS;
    return axiosClient.get(url, params);
  },
};

export default productApi;
