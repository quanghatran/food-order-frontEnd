import { GET_ALL_PRODUCT, GET_OWNER_PRODUCTS, GET_PRODUCT_DETAIL } from '../constants/subUrl';
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

  getProductDetail: (idProduct, params) => {
    const url = `${GET_PRODUCT_DETAIL}${idProduct}`;
    return axiosClient.get(url, params);
  },
};

export default productApi;
