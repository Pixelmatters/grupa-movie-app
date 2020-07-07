import {
  IRequestAuthTokenState,
  AuthActionTypes,
  REQUEST_AUTH_TOKEN_START,
  REQUEST_AUTH_TOKEN_SUCCESS,
  REQUEST_AUTH_TOKEN_ERROR,
} from './types';
const initialState: IRequestAuthTokenState = {
  isFetching: false,
  failed: false,
  requestToken: undefined,
};

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): IRequestAuthTokenState => {
  switch (action.type) {
  case REQUEST_AUTH_TOKEN_START:
    return {
      isFetching: true,
      failed: false,
      requestToken: undefined,
    };
  case REQUEST_AUTH_TOKEN_SUCCESS:
    return {
      isFetching: false,
      failed: false,
      requestToken: action.requestToken,
    };
  case REQUEST_AUTH_TOKEN_ERROR:
    return {
      isFetching: false,
      failed: true,
      requestToken: undefined,
    };
  default:
    return state;
  }
};
