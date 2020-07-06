import { AppThunk } from '../store';
import {
  requestMovieStart,
  requestMovieSuccess,
  requestMovieError,
} from './actions';
import { getMovie } from '../../api/api';
import { IMovie } from '../../api/models';

export const fetchMovie = (id: number): AppThunk => async (dispatch) => {
  dispatch(requestMovieStart());
  getMovie(id)
    .then((response) => {
      const movie = response.data as IMovie;
      dispatch(requestMovieSuccess(movie));
    })
    .catch(() => dispatch(requestMovieError())
    );
};
