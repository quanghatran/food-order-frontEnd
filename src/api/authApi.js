import {
  GET_STORE_VERIFY,
  GET_USER_VERIFY,
  POST_FORGOT_PASSWORD,
  POST_LOGIN,
  POST_REACTIVE,
  POST_STORE_REGISTER,
  POST_USER_REGISTER,
} from '../constants/subUrl';
import axiosClient from './axiosClient';

const authApi = {
  postLogin: (params) => {
    const url = POST_LOGIN;
    return axiosClient.post(url, params);
  },

  postUserRegister: (params) => {
    const url = POST_USER_REGISTER;
    return axiosClient.post(url, params);
  },

  postStoreRegister: (params) => {
    const url = POST_STORE_REGISTER;
    return axiosClient.post(url, params);
  },

  postForgotPassword: (params) => {
    const url = POST_FORGOT_PASSWORD;
    return axiosClient.post(url, params);
  },

  getUserVerify: (params) => {
    const url = GET_USER_VERIFY;
    return axiosClient.get(url, params);
  },

  getStoreVerify: (params) => {
    const url = GET_STORE_VERIFY;
    return axiosClient.get(url, params);
  },

  postReactive: (params) => {
    const url = POST_REACTIVE;
    return axiosClient.post(url, params);
  },
};

export default authApi;
