import {
  IRequestAuthState,
  AuthActionTypes,
  REQUEST_AUTH_TOKEN_START,
  REQUEST_AUTH_TOKEN_SUCCESS,
  REQUEST_AUTH_TOKEN_ERROR,
  REQUEST_SESSION_ID_START,
  REQUEST_SESSION_ID_ERROR,
  REQUEST_SESSION_ID_SUCCESS,
} from './types';

const initialState: IRequestAuthState = {
  isFetchingAuthToken: false,
  isFetchingSessionId: false,
  failedAuthToken: false,
  failedSessionId: false,
  requestToken: undefined,
  sessionId: undefined,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): IRequestAuthState => {
  switch (action.type) {
  case REQUEST_AUTH_TOKEN_START:
    return {
      ...state,
      isFetchingAuthToken: true,
      failedAuthToken: false,
      requestToken: undefined,
    };
  case REQUEST_AUTH_TOKEN_SUCCESS:
    return {
      ...state,
      isFetchingAuthToken: false,
      failedAuthToken: false,
      requestToken: action.requestToken,
    };
  case REQUEST_AUTH_TOKEN_ERROR:
    return {
      ...state,
      isFetchingAuthToken: false,
      failedAuthToken: true,
      requestToken: undefined,
    };
  case REQUEST_SESSION_ID_START:
    return {
      ...state,
      isFetchingSessionId: true,
      failedSessionId: false,
      sessionId: undefined,
    };
  case REQUEST_SESSION_ID_SUCCESS:
    return {
      ...state,
      isFetchingSessionId: false,
      failedSessionId: false,
      sessionId: action.sessionId,
    };
  case REQUEST_SESSION_ID_ERROR:
    return {
      ...state,
      isFetchingSessionId: false,
      failedSessionId: true,
      sessionId: undefined,
    };
  default:
    return state;
  }
};
