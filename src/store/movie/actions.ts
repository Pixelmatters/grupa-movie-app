import {
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_ERROR,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_POPULAR_START,
  REQUEST_POPULAR_SUCCESS,
  REQUEST_POPULAR_ERROR,
  REQUEST_LATEST_START,
  REQUEST_LATEST_SUCCESS,
  REQUEST_LATEST_ERROR,
} from './types';
import { IMovie } from '../../api/models';

export const requestMovieStart = (): MovieActionTypes => ({
  type: REQUEST_MOVIE_START,
});

export const requestMovieSuccess = (movie: IMovie): MovieActionTypes => ({
  type: REQUEST_MOVIE_SUCCESS,
  movie: movie,
});

export const requestMovieError = (): MovieActionTypes => ({
  type: REQUEST_MOVIE_ERROR,
});

export const requestPopularStart = (): MovieActionTypes => ({
  type: REQUEST_POPULAR_START,
});

export const requestPopularSuccess = (popular: IMovie[]): MovieActionTypes => ({
  type: REQUEST_POPULAR_SUCCESS,
  popular: popular,
});

export const requestPopularError = (): MovieActionTypes => ({
  type: REQUEST_POPULAR_ERROR,
});

export const requestLatestStart = (): MovieActionTypes => ({
  type: REQUEST_LATEST_START,
});

export const requestLatestSuccess = (latest: IMovie): MovieActionTypes => ({
  type: REQUEST_LATEST_SUCCESS,
  latest: latest,
});

export const requestLatestError = (): MovieActionTypes => ({
  type: REQUEST_LATEST_ERROR,
});
