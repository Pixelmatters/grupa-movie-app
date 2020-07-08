import { AppThunk } from '../store';
import {
  requestCastStart,
  requestCastSuccess,
  requestCastError,
} from './actions';
import { getCast } from '../../api/api';
import { ICast } from '../../api/models';

export const fetchCast = (id: number): AppThunk => async dispatch => {
  dispatch(requestCastStart());
  getCast(id)
    .then(response => {
      const movie = response.data.cast as ICast[];
      dispatch(requestCastSuccess(movie));
    })
    .catch(() => dispatch(requestCastError()));
};
