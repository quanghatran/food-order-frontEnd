import { GET_NEW_USER_AND_STORE_BY_MONTH, GET_ORDER_REPORT_BY_MONTH } from '../constants/subUrl';
import axiosClient from './axiosClient';

const userManagerApi = {
  getNewUserAndStoreByMonth: () => {
    const url = GET_NEW_USER_AND_STORE_BY_MONTH;
    return axiosClient.get(url);
  },

  getOrderReportByMonth: (month) => {
    const url = `${GET_ORDER_REPORT_BY_MONTH}?month=${month}`;
    return axiosClient.get(url);
  },
};

export default userManagerApi;
