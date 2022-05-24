import { POST_LOGIN } from '../constants/subUrl';
import axiosClient from './axiosClient';

const authApi = {
  postLogin: (params) => {
    const url = POST_LOGIN;
    return axiosClient.post(url, params);
  },

  // postAddCoacher: (params) => {
  // 	const url = "/api/admin/add-coacher";
  // 	return axiosAdmin.post(url, params);
  // },
  // getCoacherById: (idCoacher, params) => {
  // 	const url = `/api/admin/coacher/${idCoacher}`;
  // 	return axiosAdmin.get(url, params);
  // },
  // patchChangeCoacherInfo: (idCoacher, params) => {
  // 	const url = `/api/admin/coacher/${idCoacher}`;
  // 	return axiosAdmin.patch(url, params);
  // },
  // deleteCoacher: (idCoacher, params) => {
  // 	const url = `/api/admin/coacher/${idCoacher}`;
  // 	return axiosAdmin.delete(url, params);
  // },
};

export default authApi;
