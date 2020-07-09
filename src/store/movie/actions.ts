import {
  MovieActionTypes,
  REQUEST_MOVIE_START,
  REQUEST_MOVIE_ERROR,
  REQUEST_MOVIE_SUCCESS,
  REQUEST_ALL_MOVIES_START,
  REQUEST_ALL_MOVIES_SUCCESS,
  REQUEST_ALL_MOVIES_ERROR,
  REQUEST_POPULAR_START,
  REQUEST_POPULAR_SUCCESS,
  REQUEST_POPULAR_ERROR,
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

export const requestAllMoviesStart = (): MovieActionTypes => ({
  type: REQUEST_ALL_MOVIES_START,
});

export const requestAllMoviesSuccess = (
  allMovies: IMovie[]
): MovieActionTypes => ({
  type: REQUEST_ALL_MOVIES_SUCCESS,
  allMovies: allMovies,
});

export const requestAllMoviesError = (): MovieActionTypes => ({
  type: REQUEST_ALL_MOVIES_ERROR,
});

export const requestPopularStart = (): MovieActionTypes => ({
  type: REQUEST_POPULAR_START,
});

export const requestPopularSuccess = (
  popular: Array<IMovie>
): MovieActionTypes => ({
  type: REQUEST_POPULAR_SUCCESS,
  popular: popular,
});

export const requestPopularError = (): MovieActionTypes => ({
  type: REQUEST_POPULAR_ERROR,
});
