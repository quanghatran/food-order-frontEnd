import {
  GET_ALL_PRODUCT,
  GET_OWNER_PRODUCTS,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_STORE,
  GET_PRODUCT_DETAIL,
  GET_TOP_PRODUCTS,
  POST_ADD_PRODUCT,
} from '../constants/subUrl';
import axiosClient from './axiosClient';

const productApi = {
  getListProduct: (params) => {
    const url = GET_ALL_PRODUCT;
    return axiosClient.get(url, { params });
  },

  getOwnerProducts: (params) => {
    const url = GET_OWNER_PRODUCTS;
    return axiosClient.get(url, params);
  },

  getProductDetail: (idProduct, params) => {
    const url = `${GET_PRODUCT_DETAIL}${idProduct}`;
    return axiosClient.get(url, params);
  },

  getTopProducts: (params) => {
    const url = GET_TOP_PRODUCTS;
    return axiosClient.get(url, params);
  },

  getProductsByCategory: (idCategory, params) => {
    const url = `${GET_PRODUCT_BY_CATEGORY}${idCategory}`;
    return axiosClient.get(url, params);
  },

  getProductByStore: (params) => {
    const url = GET_PRODUCT_BY_STORE;
    return axiosClient.get(url, { params });
  },

  addProduct: (dataAdd) => {
    const url = POST_ADD_PRODUCT;
    return axiosClient.post(url, dataAdd);
  },

  getProductByName: (query) => {
    const url = `${GET_PRODUCT_BY_NAME}?q=${query}`;
    return axiosClient.get(url);
  },
};

export default productApi;
