import {
  IMovieState,
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_MOVIE_ERROR,
  REQUEST_ALL_MOVIES_START,
  REQUEST_ALL_MOVIES_SUCCESS,
  REQUEST_ALL_MOVIES_ERROR,
  REQUEST_LATEST_START,
  REQUEST_LATEST_SUCCESS,
  REQUEST_LATEST_ERROR,
} from './types';
const initialState: IMovieState = {
  movie: undefined,
  failedFetchingMovie: false,
  isFetchingMovie: false,
  allMovies: undefined,
  failedFetchingAllMovies: false,
  isFetchingAllMovies: false,
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
    case REQUEST_ALL_MOVIES_START:
      return {
        ...state,
        isFetchingAllMovies: true,
        failedFetchingAllMovies: false,
        allMovies: undefined,
      };
    case REQUEST_ALL_MOVIES_SUCCESS:
      return {
        ...state,
        isFetchingAllMovies: false,
        failedFetchingAllMovies: false,
        allMovies: action.allMovies,
      };
    case REQUEST_ALL_MOVIES_ERROR:
      return {
        ...state,
        isFetchingAllMovies: false,
        failedFetchingAllMovies: true,
        allMovies: undefined,
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
