import { IMovie } from '../../api/models';

export const REQUEST_MOVIE_START = 'REQUEST_MOVIE_START';
export const REQUEST_MOVIE_SUCCESS = 'REQUEST_MOVIE_SUCCESS';
export const REQUEST_MOVIE_ERROR = 'REQUEST_MOVIE_ERROR';

export type MovieActionTypes =
  | IRequestMovieStartAction
  | IRequestMovieSuccessAction
  | IRequestMovieErrorAction;

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

export interface IMovieState {
  isFetching: boolean;
  failed: boolean;
  movie?: IMovie;
}
