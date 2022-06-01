import { DELETE_USER_BY_ID, GET_ALL_USER } from '../constants/subUrl/userManager';
import axiosClient from './axiosClient';

const userManagerApi = {
  getAllUsers: (params) => {
    const url = GET_ALL_USER;
    return axiosClient.get(url, params);
  },

  deleteUserById: (id, params) => {
    const url = `${DELETE_USER_BY_ID}${id}`;
    return axiosClient.delete(url, params);
  },
};

export default userManagerApi;
