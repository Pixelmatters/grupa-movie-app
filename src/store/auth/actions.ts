import {
  AuthActionTypes,
  REQUEST_AUTH_TOKEN_START,
  REQUEST_AUTH_TOKEN_SUCCESS,
  REQUEST_AUTH_TOKEN_ERROR,
} from './types';
import { IRequestToken } from '../../api/models';

export const requestAuthTokenStart = (): AuthActionTypes => ({
  type: REQUEST_AUTH_TOKEN_START,
});

export const requestAuthTokenSuccess = (
  requestToken: IRequestToken
): AuthActionTypes => ({
  type: REQUEST_AUTH_TOKEN_SUCCESS,
  requestToken: requestToken,
});

export const requestAuthTokenError = (): AuthActionTypes => ({
  type: REQUEST_AUTH_TOKEN_ERROR,
});
