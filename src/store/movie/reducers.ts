import {
  IMovieState,
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_MOVIE_ERROR,
} from './types';
const initialState: IMovieState = {
  movie: undefined,
  failed: false,
  isFetching: false,
};

export const movieReducer = (
  state = initialState,
  action: MovieActionTypes
): IMovieState => {
  switch (action.type) {
  case REQUEST_MOVIE_START:
    return {
      isFetching: true,
      failed: false,
      movie: undefined,
    };
  case REQUEST_MOVIE_SUCCESS:
    return {
      isFetching: false,
      failed: false,
      movie: action.movie,
    };
  case REQUEST_MOVIE_ERROR:
    return {
      isFetching: false,
      failed: true,
      movie: undefined,
    };
  default:
    return state;
  }
};
