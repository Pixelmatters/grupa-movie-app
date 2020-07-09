import {
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_ERROR,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_ALL_MOVIES_START,
  REQUEST_ALL_MOVIES_SUCCESS,
  REQUEST_ALL_MOVIES_ERROR,
  REQUEST_LATEST_START,
  REQUEST_LATEST_SUCCESS,
  REQUEST_LATEST_ERROR
} from './types';
import { IMovie } from '../../api/models';

export const requestMovieStart = (): MovieActionTypes => ({
  type: REQUEST_MOVIE_START
});

export const requestMovieSuccess = (movie: IMovie): MovieActionTypes => ({
  type: REQUEST_MOVIE_SUCCESS,
  movie: movie
});

export const requestMovieError = (): MovieActionTypes => ({
  type: REQUEST_MOVIE_ERROR
});

export const requestAllMoviesStart = (): MovieActionTypes => ({
  type: REQUEST_ALL_MOVIES_START
});

export const requestAllMoviesSuccess = (allMovies: IMovie[]): MovieActionTypes => ({
  type: REQUEST_ALL_MOVIES_SUCCESS,
  allMovies: allMovies
});

export const requestAllMoviesError = (): MovieActionTypes => ({
  type: REQUEST_ALL_MOVIES_ERROR
});

export const requestLatestStart = (): MovieActionTypes => ({
  type: REQUEST_LATEST_START
});

export const requestLatestSuccess = (latest: IMovie): MovieActionTypes => ({
  type: REQUEST_LATEST_SUCCESS,
  latest: latest
});

export const requestLatestError = (): MovieActionTypes => ({
  type: REQUEST_LATEST_ERROR
});
