import { IMovie } from '../../api/models';

export const REQUEST_MOVIE_START = 'REQUEST_MOVIE_START';
export const REQUEST_MOVIE_SUCCESS = 'REQUEST_MOVIE_SUCCESS';
export const REQUEST_MOVIE_ERROR = 'REQUEST_MOVIE_ERROR';

export const REQUEST_ALL_MOVIES_START = 'REQUEST_ALL_MOVIES_START';
export const REQUEST_ALL_MOVIES_SUCCESS = 'REQUEST_ALL_MOVIES_SUCCESS';
export const REQUEST_ALL_MOVIES_ERROR = 'REQUEST_ALL_MOVIES_ERROR';

export const REQUEST_LATEST_START = 'REQUEST_LATEST_START';
export const REQUEST_LATEST_SUCCESS = 'REQUEST_LATEST_SUCCESS';
export const REQUEST_LATEST_ERROR = 'REQUEST_LATEST_ERROR';

export type MovieActionTypes =
  | IRequestMovieStartAction
  | IRequestMovieSuccessAction
  | IRequestMovieErrorAction
  | IrequestAllMoviesStartAction
  | IrequestAllMoviesSuccessAction
  | IrequestAllMoviesErrorAction
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

interface IrequestAllMoviesStartAction {
  type: typeof REQUEST_ALL_MOVIES_START;
}

interface IrequestAllMoviesSuccessAction {
  type: typeof REQUEST_ALL_MOVIES_SUCCESS;
  allMovies: IMovie[];
}

interface IrequestAllMoviesErrorAction {
  type: typeof REQUEST_ALL_MOVIES_ERROR;
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
  isFetchingAllMovies: boolean;
  failedFetchingAllMovies: boolean;
  allMovies?: IMovie[];
  isFetchingLatest: boolean;
  failedFetchingLatest: boolean;
  latest?: IMovie;
}
