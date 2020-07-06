import { AppThunk } from '../store';
import { IMovie } from './types';
import Axios from 'axios';
import {
  requestLatestStart,
  requestLatestSuccess,
  requestLatestError,
} from './actions';

export const fetchLatest = (): AppThunk => async (dispatch) => {
  dispatch(requestLatestStart());
  Axios.get(
    'https://api.themoviedb.org/3/movie/latest?api_key=5242f8d4a43ab8024bf540064d19b900'
  )
    .then((response) => {
      const movie = response.data as IMovie;
      dispatch(requestLatestSuccess(movie));
    })
    .catch((error) => dispatch(requestLatestError(error)));
};
