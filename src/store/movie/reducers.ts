import {
  IMovieState,
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_MOVIE_ERROR,
  REQUEST_POPULAR_START,
  REQUEST_POPULAR_SUCCESS,
  REQUEST_POPULAR_ERROR,
  REQUEST_LATEST_START,
  REQUEST_LATEST_SUCCESS,
  REQUEST_LATEST_ERROR,
} from './types';
const initialState: IMovieState = {
  movie: undefined,
  failedFetchingMovie: false,
  isFetchingMovie: false,
  popular: undefined,
  failedFetchingPopular: false,
  isFetchingPopular: false,
  latest: undefined,
  isFetchingLatest: false,
  failedFetchingLatest: false,
};

export const movieReducer = (
  state = initialState,
  action: MovieActionTypes
): IMovieState => {
  switch (action.type) {
  case REQUEST_MOVIE_START:
    return {
      ...state,
      isFetchingMovie: true,
      failedFetchingMovie: false,
      movie: undefined,
    };
  case REQUEST_MOVIE_SUCCESS:
    return {
      ...state,
      isFetchingMovie: false,
      failedFetchingMovie: false,
      movie: action.movie,
    };
  case REQUEST_MOVIE_ERROR:
    return {
      ...state,
      isFetchingMovie: false,
      failedFetchingMovie: true,
      movie: undefined,
    };
  case REQUEST_POPULAR_START:
    return {
      ...state,
      isFetchingPopular: true,
      failedFetchingPopular: false,
      popular: undefined,
    };
  case REQUEST_POPULAR_SUCCESS:
    return {
      ...state,
      isFetchingPopular: false,
      failedFetchingPopular: false,
      popular: action.popular,
    };
  case REQUEST_POPULAR_ERROR:
    return {
      ...state,
      isFetchingPopular: false,
      failedFetchingPopular: true,
      popular: undefined,
    };
  case REQUEST_LATEST_START:
    return {
      ...state,
      isFetchingLatest: true,
      failedFetchingLatest: false,
      latest: undefined,
    };
  case REQUEST_LATEST_SUCCESS:
    return {
      ...state,
      isFetchingLatest: false,
      failedFetchingLatest: false,
      latest: action.latest,
    };
  case REQUEST_LATEST_ERROR:
    return {
      ...state,
      isFetchingLatest: false,
      failedFetchingLatest: true,
      latest: undefined,
    };
  default:
    return state;
  }
};
