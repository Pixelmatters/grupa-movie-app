export const REQUEST_LATEST_START = 'REQUEST_LATEST_START';
export const REQUEST_LATEST_SUCCESS = 'REQUEST_LATEST_SUCCESS';
export const REQUEST_LATEST_ERROR = 'REQUEST_LATEST_ERROR';

export type MovieActionTypes =
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
  error: Error;
}

export interface IMovie {
  id: number;
  title: string;
  poster_path?: string;
}

export interface IMoviesState {
  isFetching: boolean;
  latest?: IMovie;
  error?: Error;
}
