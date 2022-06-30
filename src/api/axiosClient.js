import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem('accessToken');
  const verifyToken = localStorage.getItem('verifyToken');

  // verify token
  if (verifyToken) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${verifyToken}`,
    };
    return req;
  }

  // attach access token
  if (accessToken) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    return req;
  }

  return req;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
});

export default axiosClient;
