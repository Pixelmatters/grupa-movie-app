import { IMovie } from '../../api/models';

export const REQUEST_MOVIE_START = 'REQUEST_MOVIE_START';
export const REQUEST_MOVIE_SUCCESS = 'REQUEST_MOVIE_SUCCESS';
export const REQUEST_MOVIE_ERROR = 'REQUEST_MOVIE_ERROR';

export const REQUEST_POPULAR_START = 'REQUEST_POPULAR_START';
export const REQUEST_POPULAR_SUCCESS = 'REQUEST_POPULAR_SUCCESS';
export const REQUEST_POPULAR_ERROR = 'REQUEST_POPULAR_ERROR';

export const REQUEST_LATEST_START = 'REQUEST_LATEST_START';
export const REQUEST_LATEST_SUCCESS = 'REQUEST_LATEST_SUCCESS';
export const REQUEST_LATEST_ERROR = 'REQUEST_LATEST_ERROR';

export type MovieActionTypes =
  | IRequestMovieStartAction
  | IRequestMovieSuccessAction
  | IRequestMovieErrorAction
  | IRequestPopularStartAction
  | IRequestPopularSuccessAction
  | IRequestPopularErrorAction
  | IRequestLatestStartAction
  | IRequestLatestSuccessAction
  | IRequestLatestErrorAction;

interface IRequestMovieStartAction {
  type: typeof REQUEST_MOVIE_START;
}

interface IRequestMovieSuccessAction {
  type: typeof REQUEST_MOVIE_SUCCESS;
  movie: IMovie;
}

interface IRequestMovieErrorAction {
  type: typeof REQUEST_MOVIE_ERROR;
}

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

export interface IMovieState {
  isFetchingMovie: boolean;
  failedFetchingMovie: boolean;
  movie?: IMovie;
  isFetchingPopular: boolean;
  failedFetchingPopular: boolean;
  popular?: IMovie[];
  isFetchingLatest: boolean;
  failedFetchingLatest: boolean;
  latest?: IMovie;
}
