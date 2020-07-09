import {
  IMovieState,
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_MOVIE_ERROR,
  REQUEST_ALL_MOVIES_START,
  REQUEST_ALL_MOVIES_SUCCESS,
  REQUEST_ALL_MOVIES_ERROR,
  REQUEST_POPULAR_START,
  REQUEST_POPULAR_SUCCESS,
  REQUEST_POPULAR_ERROR,
} from './types';
const initialState: IMovieState = {
  movie: undefined,
  failedFetchingMovie: false,
  isFetchingMovie: false,
  allMovies: undefined,
  failedFetchingAllMovies: false,
  isFetchingAllMovies: false,
  popular: undefined,
  isFetchingPopular: false,
  failedFetchingPopular: false,
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
    default:
      return state;
  }
};
