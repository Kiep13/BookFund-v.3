import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { login as setAuthData, setAuthAttemptFlag } from '@store/reducers/authSlice';
import {
  axiosInstance as axios,
  API_LOGIN_ERROR,
  RELOAD_PATHNAME_STORAGE_KEY,
  RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY, RELOAD_PUBLIC_FINISHED
} from '@utils/constants';
import { BaseRoutePaths } from '@utils/enums';
import { IAuthResponse } from '@utils/interfaces';
import { useAlerts, useApi, useAuthHandlers, useBackNavigation, useStorage } from '@utils/hooks';

import { IPageParams } from './interfaces';
import { API_SESSION_EXPIRED_ERROR, SUCCESSFULLY_AUTHORIZED } from './constants';

export const useAuthorizing = () => {
  const navigate = useNavigate();
  const params = useParams<IPageParams>();
  const location = useLocation();
  const dispatch = useDispatch();

  const {login, refresh} = useApi();
  const {addSuccess} = useAlerts();
  const {handleLogOut} = useAuthHandlers();
  const {doesStorageHave, getFromStorage, deleteFromStorage, saveToStorage} = useStorage();
  const {navigateLastPage} = useBackNavigation(BaseRoutePaths.HOME);

  const navigateBack = (): void => {
    if (doesStorageHave(RELOAD_PATHNAME_STORAGE_KEY)) {
      const pathname = getFromStorage(RELOAD_PATHNAME_STORAGE_KEY);
      deleteFromStorage(RELOAD_PATHNAME_STORAGE_KEY);

      navigate(pathname);
      return;
    }

    navigateLastPage();
  }

  const sendLoginRequest = (): void => {
    const provider = params.provider;
    const code = new URLSearchParams(location.search).get('code') || '';

    provider && login(provider, code)
      .then((authResponse: IAuthResponse) => {
        dispatch(setAuthData(authResponse));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.accessToken}`;

        addSuccess(SUCCESSFULLY_AUTHORIZED);

        navigate(BaseRoutePaths.HOME);
      })
      .catch(() => {
        handleLogOut(API_LOGIN_ERROR);
      });
  }

  const sendRefreshRequest = (): void => {
    refresh()
      .then((authResponse: IAuthResponse) => {
        dispatch(setAuthData(authResponse));
        axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.accessToken}`;

        if (doesStorageHave(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY) && getFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY)) {
          deleteFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY);
        }

        navigateBack();
      })
      .catch(() => {
        dispatch(setAuthAttemptFlag());

        if (doesStorageHave(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY) && getFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY)) {
          deleteFromStorage(RELOAD_IS_PUBLIC_FLAG_STORAGE_KEY);
          saveToStorage(RELOAD_PUBLIC_FINISHED, true);

          navigateBack();
          return;
        }

        handleLogOut(API_SESSION_EXPIRED_ERROR);
      })
  }

  return {
    sendRefreshRequest,
    sendLoginRequest
  }
}
