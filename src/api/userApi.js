import { GET_USER } from '../constants/subUrl';
import axiosClient from './axiosClient';

const userApi = {
  getUserInfo: (params) => {
    const url = GET_USER;
    return axiosClient.get(url, params);
  },
};

export default userApi;
