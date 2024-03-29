import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthStore, IStore } from '@store/interfaces';
import { Roles } from '@utils/enums';
import { IAuthResponse } from '@utils/interfaces';

import { AUTH_STORE_INITIAL_STATE } from '../constants';

export const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_STORE_INITIAL_STATE,
  reducers: {
    setAuthAttemptFlag: (state: IAuthStore) => {
      state.value = {
        ...state.value,
        isAuthorizeAttempted: true
      };
    },
    login: (state: IAuthStore, action: PayloadAction<IAuthResponse>) => {
      state.value = {
        user: action.payload.account,
        token: action.payload.accessToken,
        isAuthorized: true,
        isAuthorizeAttempted: true
      };
    },
    logout: (state: IAuthStore) => {
      state.value = {
        user: null,
        token: '',
        isAuthorized: false,
        isAuthorizeAttempted: true
      };
    }
  }
});

export const getUser = (store: IStore) => store.auth.value.user;
export const getIsAuthorized = (store: IStore) => store.auth.value?.isAuthorized;
export const getIsAuthorizeAttempted = (store: IStore) => store.auth.value?.isAuthorizeAttempted;
export const getToken = (store: IStore) => store.auth.value?.token;
export const getIsModerator = (store: IStore) => {
  const {isAuthorized} = store.auth.value;

  if (!isAuthorized) {
    return false;
  }

  return store.auth.value.user?.role === Roles.Moderator;
};
export const getIsAdmin = (store: IStore) => {
  const {isAuthorized} = store.auth.value;

  if (!isAuthorized) {
    return false;
  }

  return store.auth.value.user?.role === Roles.Moderator || store.auth.value.user?.role === Roles.Admin;
};

export const {setAuthAttemptFlag, login, logout} = authSlice.actions;
export default authSlice.reducer;
