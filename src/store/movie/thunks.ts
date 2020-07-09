import { AppThunk } from '../store';
import { IMovie } from '../../api/models';
import {
  requestMovieStart,
  requestMovieSuccess,
  requestMovieError,
  requestAllMoviesStart,
  requestAllMoviesSuccess,
  requestAllMoviesError,
  requestPopularStart,
  requestPopularSuccess,
  requestPopularError,
} from './actions';
import { getMovie, getAllMovies, getPopular } from '../../api/api';

export const fetchMovie = (id: number): AppThunk => async dispatch => {
  dispatch(requestMovieStart());
  getMovie(id)
    .then(response => {
      const movie = response.data as IMovie;
      dispatch(requestMovieSuccess(movie));
    })
    .catch(() => dispatch(requestMovieError()));
};

export const fetchAllMovies = (
  pageNumber: number
): AppThunk => async dispatch => {
  dispatch(requestAllMoviesStart());
  getAllMovies(pageNumber)
    .then(response => {
      const allMovies = response.data.results as IMovie[];
      dispatch(requestAllMoviesSuccess(allMovies));
    })
    .catch(() => dispatch(requestAllMoviesError()));
};

export const fetchPopular = (): AppThunk => async dispatch => {
  dispatch(requestPopularStart());
  getPopular()
    .then(response => {
      const popular = response.data.results as Array<IMovie>;
      dispatch(requestPopularSuccess(popular));
    })
    .catch(() => dispatch(requestPopularError()));
};
