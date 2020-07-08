import { AppThunk } from '../store';
import {
  requestAccountDetailsError,
  requestAccountDetailsStart,
  requestAccountDetailsSuccess,
  requestMovieWatchlistError,
  requestMovieWatchlistStart,
  requestMovieWatchlistSuccess,
  requestRateMoviesError,
  requestRateMoviesStart,
  requestRateMoviesSuccess
} from './actions';
import { getAccountDetails, getRatedMovies } from '../../api/api';
import { IAccount } from './types';
import { IMovie } from '../../api/models';

export const fetchAccountDetails = (
  sessionId: string
): AppThunk => async dispatch => {
  dispatch(requestAccountDetailsStart());
  getAccountDetails(sessionId)
    .then(response => {
      const account = response.data as IAccount;
      console.log('account', account);
      dispatch(requestAccountDetailsSuccess(account));
    })
    .catch(() => dispatch(requestAccountDetailsError()));
};

export const fetchWatchList = (
  accountId: number
): AppThunk => async dispatch => {
  dispatch(requestMovieWatchlistStart());
  getRatedMovies(accountId)
    .then(response => {
      const watchList = response.data as Array<IMovie>;
      dispatch(requestMovieWatchlistSuccess(watchList));
    })
    .catch(() => dispatch(requestMovieWatchlistError()));
};

export const fetchRateMovies = (
  accountId: number
): AppThunk => async dispatch => {
  dispatch(requestRateMoviesStart());
  getRatedMovies(accountId)
    .then(response => {
      const ratedMovies = response.data as Array<IMovie>;
      dispatch(requestRateMoviesSuccess(ratedMovies));
    })
    .catch(() => dispatch(requestRateMoviesError()));
};
