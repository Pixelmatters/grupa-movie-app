import { AppThunk } from '../store';
import { IMovie } from '../../api/models';
import {
  requestMovieStart,
  requestMovieSuccess,
  requestMovieError,
  requestPopularStart,
  requestPopularSuccess,
  requestPopularError,
  requestLatestStart,
  requestLatestSuccess,
  requestLatestError,
} from './actions';
import { getMovie, getPopular, getLatestMovie } from '../../api/api';

export const fetchMovie = (id: number): AppThunk => async dispatch => {
  dispatch(requestMovieStart());
  getMovie(id)
    .then(response => {
      const movie = response.data as IMovie;
      dispatch(requestMovieSuccess(movie));
    })
    .catch(() => dispatch(requestMovieError()));
};

export const fetchPopular = (
  pageNumber: number
): AppThunk => async dispatch => {
  dispatch(requestPopularStart());
  getPopular(pageNumber)
    .then(response => {
      const popular = response.data.results as IMovie[];
      dispatch(requestPopularSuccess(popular));
    })
    .catch(() => dispatch(requestPopularError()));
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
