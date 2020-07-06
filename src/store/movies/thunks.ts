import { AppThunk } from '../store';
import { IMovie } from './types';
import {
  requestLatestStart,
  requestLatestSuccess,
  requestLatestError,
} from './actions';
import { getLatestMovie } from '../../api/api';

export const fetchLatest = (): AppThunk => async (dispatch) => {
  dispatch(requestLatestStart());
  getLatestMovie()
    .then((response) => {
      const movie = response.data as IMovie;
      dispatch(requestLatestSuccess(movie));
      
    })
    .catch(() => dispatch(requestLatestError())
    );
};
