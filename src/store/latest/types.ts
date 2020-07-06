import { IMovie } from '../../api/models';

export const REQUEST_LATEST_START = 'REQUEST_LATEST_START';
export const REQUEST_LATEST_SUCCESS = 'REQUEST_LATEST_SUCCESS';
export const REQUEST_LATEST_ERROR = 'REQUEST_LATEST_ERROR';

export type LatestActionTypes =
  | IRequestLatestStartAction
  | IRequestLatestSuccessAction
  | IRequestLatestErrorAction;

interface IRequestLatestStartAction {
  type: typeof REQUEST_LATEST_START;
}

interface IRequestLatestSuccessAction {
  type: typeof REQUEST_LATEST_SUCCESS;
  latest: IMovie;
}

interface IRequestLatestErrorAction {
  type: typeof REQUEST_LATEST_ERROR;
}

export interface ILatestState {
  isFetching: boolean;
  failed: boolean;
  latest?: IMovie;
}
