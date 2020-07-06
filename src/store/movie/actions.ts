import {
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_ERROR,
  REQUEST_MOVIE_SUCCESS,
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
  type: REQUEST_MOVIE_ERROR
});
