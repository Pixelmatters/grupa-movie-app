import { ICast } from '../../api/models';

export const REQUEST_CAST_START = 'REQUEST_CAST_START';
export const REQUEST_CAST_SUCCESS = 'REQUEST_CAST_SUCCESS';
export const REQUEST_CAST_ERROR = 'REQUEST_CAST_ERROR';

export type CastActionTypes =
  | IRequestCastStartAction
  | IRequestCastSuccessAction
  | IRequestCastErrorAction;

interface IRequestCastStartAction {
  type: typeof REQUEST_CAST_START;
}

interface IRequestCastSuccessAction {
  type: typeof REQUEST_CAST_SUCCESS;
  cast: ICast[];
}

interface IRequestCastErrorAction {
  type: typeof REQUEST_CAST_ERROR;
}

export interface ICastState {
  isFetching: boolean;
  failed: boolean;
  cast?: ICast[];
}
