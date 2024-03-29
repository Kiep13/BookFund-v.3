import axios from 'axios';

import { AuthRoutePaths, ResponseStatuses } from '@utils/enums';

const axiosInstance = axios.create({
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if(error.response.status === ResponseStatuses.STATUS_NOT_AUTHORIZED && !error.response.request.responseURL.includes('refresh')) {
      window.location.href = AuthRoutePaths.REFRESH;
      return;
    }

    throw error;
  });

export {
  axiosInstance
};
