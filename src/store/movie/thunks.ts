import { AppThunk } from '../store';
import { IMovie } from '../../api/models';
import {
  requestMovieStart,
  requestMovieSuccess,
  requestMovieError,
  requestAllMoviesStart,
  requestAllMoviesSuccess,
  requestAllMoviesError,
  requestLatestStart,
  requestLatestSuccess,
  requestLatestError,
} from './actions';
import { getMovie, getAllMovies, getLatestMovie } from '../../api/api';

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

export const fetchLatest = (): AppThunk => async dispatch => {
  dispatch(requestLatestStart());
  getLatestMovie()
    .then(response => {
      const movie = response.data as IMovie;
      dispatch(requestLatestSuccess(movie));
    })
    .catch(() => dispatch(requestLatestError()));
};
