import { IRequestToken, ICreateSession } from '../../api/models';

export const REQUEST_AUTH_TOKEN_START = 'REQUEST_AUTH_TOKEN_START';
export const REQUEST_AUTH_TOKEN_SUCCESS = 'REQUEST_AUTH_TOKEN_SUCCESS';
export const REQUEST_AUTH_TOKEN_ERROR = 'REQUEST_AUTH_TOKEN_ERROR';

export const REQUEST_SESSION_ID_START = 'REQUEST_SESSION_ID_START';
export const REQUEST_SESSION_ID_SUCCESS = 'REQUEST_SESSION_ID_SUCCESS';
export const REQUEST_SESSION_ID_ERROR = 'REQUEST_SESSION_ID_ERROR';

export const REQUEST_DELETE_SESSION_START = 'REQUEST_DELETE_SESSION_START';
export const REQUEST_DELETE_SESSION_SUCCESS = 'REQUEST_DELETE_SESSION_SUCCESS';
export const REQUEST_DELETE_SESSION_ERROR = 'REQUEST_DELETE_SESSION_ERROR';

export type AuthActionTypes =
  | IRequestAuthTokenStartAction
  | IRequestAuthTokenSuccessAction
  | IRequestAuthTokenErrorAction
  | IRequestSessionIdStartAction
  | IRequestSessionIdSuccessAction
  | IRequestSessionIdErrorAction
  | IRequestDeleteSessionStartAction
  | IRequestDeleteSessionSuccessAction
  | IRequestDeleteSessionErrorAction;

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

interface IRequestSessionIdStartAction {
  type: typeof REQUEST_SESSION_ID_START;
}

interface IRequestSessionIdSuccessAction {
  type: typeof REQUEST_SESSION_ID_SUCCESS;
  createSession: ICreateSession;
}

interface IRequestSessionIdErrorAction {
  type: typeof REQUEST_SESSION_ID_ERROR;
}

interface IRequestDeleteSessionStartAction {
  type: typeof REQUEST_DELETE_SESSION_START;
}

interface IRequestDeleteSessionSuccessAction {
  type: typeof REQUEST_DELETE_SESSION_SUCCESS;
}

interface IRequestDeleteSessionErrorAction {
  type: typeof REQUEST_DELETE_SESSION_ERROR;
}

export interface IRequestAuthState {
  isFetchingRequestToken: boolean;
  failedRequestToken: boolean;
  requestToken?: IRequestToken;
  isFetchingCreateSession: boolean;
  failedCreateSession: boolean;
  sessionId?: string;
  isFetchingDeleteSession: boolean;
  failedDeleteSession: boolean;
}
