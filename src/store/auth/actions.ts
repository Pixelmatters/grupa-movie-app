import {
  AuthActionTypes,
  REQUEST_AUTH_TOKEN_START,
  REQUEST_AUTH_TOKEN_SUCCESS,
  REQUEST_AUTH_TOKEN_ERROR,
  REQUEST_SESSION_ID_START,
  REQUEST_SESSION_ID_ERROR,
  REQUEST_SESSION_ID_SUCCESS,
  REQUEST_DELETE_SESSION_START,
  REQUEST_DELETE_SESSION_SUCCESS,
  REQUEST_DELETE_SESSION_ERROR,
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
  createSession: ICreateSession
): AuthActionTypes => ({
  type: REQUEST_SESSION_ID_SUCCESS,
  createSession: createSession,
});

export const requestSessionIdError = (): AuthActionTypes => ({
  type: REQUEST_SESSION_ID_ERROR,
});

export const requestDeleteSessionStart = (): AuthActionTypes => ({
  type: REQUEST_DELETE_SESSION_START,
});

export const requestDeleteSessionSuccess = (): AuthActionTypes => ({
  type: REQUEST_DELETE_SESSION_SUCCESS,
});

export const requestDeleteSessionError = (): AuthActionTypes => ({
  type: REQUEST_DELETE_SESSION_ERROR,
});
