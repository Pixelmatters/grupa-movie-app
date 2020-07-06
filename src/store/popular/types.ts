import { IMovie } from '../../api/models';

export const REQUEST_POPULAR_START = 'REQUEST_POPULAR_START';
export const REQUEST_POPULAR_SUCCESS = 'REQUEST_POPULAR_SUCCESS';
export const REQUEST_POPULAR_ERROR = 'REQUEST_POPULAR_ERROR';

export type PopularActionTypes =
  | IRequestPopularStartAction
  | IRequestPopularSuccessAction
  | IRequestPopularErrorAction;

interface IRequestPopularStartAction {
  type: typeof REQUEST_POPULAR_START;
}

interface IRequestPopularSuccessAction {
  type: typeof REQUEST_POPULAR_SUCCESS;
  popular: IMovie[];
}

interface IRequestPopularErrorAction {
  type: typeof REQUEST_POPULAR_ERROR;
}

export interface IPopularState {
  isFetching: boolean;
  failed: boolean;
  popular?: IMovie[];
}
