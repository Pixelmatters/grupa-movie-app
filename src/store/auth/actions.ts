import {
  AuthActionTypes,
  REQUEST_AUTH_TOKEN_START,
  REQUEST_AUTH_TOKEN_SUCCESS,
  REQUEST_AUTH_TOKEN_ERROR,
  REQUEST_SESSION_ID_START,
  REQUEST_SESSION_ID_ERROR,
  REQUEST_SESSION_ID_SUCCESS,
} from './types';

import { IRequestToken, ICreateSession } from '../../api/models';

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

export const requestSessionIdStart = (): AuthActionTypes => ({
  type: REQUEST_SESSION_ID_START,
});

export const requestSessionIdSuccess = (
  sessionId: ICreateSession
): AuthActionTypes => ({
  type: REQUEST_SESSION_ID_SUCCESS,
  sessionId: sessionId,
});

export const requestSessionIdError = (): AuthActionTypes => ({
  type: REQUEST_SESSION_ID_ERROR,
});
