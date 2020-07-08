import {
  IRequestAuthState,
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

const initialState: IRequestAuthState = {
  isFetchingRequestToken: false,
  failedRequestToken: false,
  requestToken: undefined,
  isFetchingCreateSession: false,
  failedCreateSession: false,
  sessionId: localStorage.getItem('session_id') ?? undefined,
  isFetchingDeleteSession: false,
  failedDeleteSession: false,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): IRequestAuthState => {
  switch (action.type) {
    case REQUEST_AUTH_TOKEN_START:
      return {
        ...state,
        isFetchingRequestToken: true,
        failedRequestToken: false,
        requestToken: undefined,
      };
    case REQUEST_AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        isFetchingRequestToken: false,
        failedRequestToken: false,
        requestToken: action.requestToken,
      };
    case REQUEST_AUTH_TOKEN_ERROR:
      return {
        ...state,
        isFetchingRequestToken: false,
        failedRequestToken: true,
        requestToken: undefined,
      };
    case REQUEST_SESSION_ID_START:
      return {
        ...state,
        isFetchingCreateSession: true,
        failedCreateSession: false,
        sessionId: undefined,
      };
    case REQUEST_SESSION_ID_SUCCESS:
      return {
        ...state,
        isFetchingCreateSession: false,
        failedCreateSession: false,
        sessionId: action.createSession.session_id,
      };
    case REQUEST_SESSION_ID_ERROR:
      return {
        ...state,
        isFetchingCreateSession: false,
        failedCreateSession: true,
        sessionId: undefined,
      };
    case REQUEST_DELETE_SESSION_START:
      return {
        ...state,
        isFetchingDeleteSession: true,
        failedDeleteSession: false,
      };
    case REQUEST_DELETE_SESSION_SUCCESS:
      return {
        ...state,
        isFetchingDeleteSession: false,
        failedDeleteSession: false,
        sessionId: undefined,
      };
    case REQUEST_DELETE_SESSION_ERROR:
      return {
        ...state,
        isFetchingDeleteSession: false,
        failedDeleteSession: true,
      };
    default:
      return state;
  }
};
