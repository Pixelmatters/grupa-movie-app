import { IMovie } from '../../api/models';

export const REQUEST_MOVIE_START = 'REQUEST_MOVIE_START';
export const REQUEST_MOVIE_SUCCESS = 'REQUEST_MOVIE_SUCCESS';
export const REQUEST_MOVIE_ERROR = 'REQUEST_MOVIE_ERROR';

export const REQUEST_ALL_MOVIES_START = 'REQUEST_ALL_MOVIES_START';
export const REQUEST_ALL_MOVIES_SUCCESS = 'REQUEST_ALL_MOVIES_SUCCESS';
export const REQUEST_ALL_MOVIES_ERROR = 'REQUEST_ALL_MOVIES_ERROR';

export const REQUEST_POPULAR_START = 'REQUEST_POPULAR_START';
export const REQUEST_POPULAR_SUCCESS = 'REQUEST_POPULAR_SUCCESS';
export const REQUEST_POPULAR_ERROR = 'REQUEST_POPULAR_ERROR';

export type MovieActionTypes =
  | IRequestMovieStartAction
  | IRequestMovieSuccessAction
  | IRequestMovieErrorAction
  | IrequestAllMoviesStartAction
  | IrequestAllMoviesSuccessAction
  | IrequestAllMoviesErrorAction
  | IRequestPopularStartAction
  | IRequestPopularSuccessAction
  | IRequestPopularErrorAction;

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

interface IRequestPopularStartAction {
  type: typeof REQUEST_POPULAR_START;
}

interface IRequestPopularSuccessAction {
  type: typeof REQUEST_POPULAR_SUCCESS;
  popular: Array<IMovie>;
}

interface IRequestPopularErrorAction {
  type: typeof REQUEST_POPULAR_ERROR;
}

export interface IMovieState {
  isFetchingMovie: boolean;
  failedFetchingMovie: boolean;
  movie?: IMovie;
  isFetchingAllMovies: boolean;
  failedFetchingAllMovies: boolean;
  allMovies?: IMovie[];
  isFetchingPopular: boolean;
  failedFetchingPopular: boolean;
  popular?: Array<IMovie>;
}
