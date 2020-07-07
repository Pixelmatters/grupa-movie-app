import { IRequestToken } from '../../api/models';

export const REQUEST_AUTH_TOKEN_START = 'REQUEST_AUTH_TOKEN_START';
export const REQUEST_AUTH_TOKEN_SUCCESS = 'REQUEST_AUTH_TOKEN_SUCCESS';
export const REQUEST_AUTH_TOKEN_ERROR = 'REQUEST_AUTH_TOKEN_ERROR';

export type AuthActionTypes =
  | IRequestAuthTokenStartAction
  | IRequestAuthTokenSuccessAction
  | IRequestAuthTokenErrorAction;

interface IRequestAuthTokenStartAction {
  type: typeof REQUEST_AUTH_TOKEN_START;
}

interface IRequestAuthTokenSuccessAction {
  type: typeof REQUEST_AUTH_TOKEN_SUCCESS;
  requestToken: IRequestToken;
}

interface IRequestAuthTokenErrorAction {
  type: typeof REQUEST_AUTH_TOKEN_ERROR;
}

export interface IRequestAuthTokenState {
  isFetching: boolean;
  failed: boolean;
  requestToken?: IRequestToken;
}
