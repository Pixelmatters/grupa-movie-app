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
  requestRateMoviesSuccess,
  addWatchListStart,
  addWatchListSuccess,
  addWatchListError
} from './actions';
import {
  getAccountDetails,
  getRatedMovies,
  addToWatchlist,
  getWatchList
} from '../../api/api';
import { IAccount, IWatchListMessage } from './types';
import { IMovie, IAddToWatchlist } from '../../api/models';

export const fetchAccountDetails = (
  sessionId: string
): AppThunk => async dispatch => {
  dispatch(requestAccountDetailsStart());
  getAccountDetails(sessionId)
    .then(response => {
      const account = response.data as IAccount;
      dispatch(requestAccountDetailsSuccess(account));
    })
    .catch(() => dispatch(requestAccountDetailsError()));
};

export const fetchWatchList = (
  sessionId: string
): AppThunk => async dispatch => {
  dispatch(requestMovieWatchlistStart());
  getWatchList(sessionId)
    .then(response => {
      const watchlist = response.data.results as Array<IMovie>;
      dispatch(requestMovieWatchlistSuccess(watchlist));
    })
    .catch(() => dispatch(requestMovieWatchlistError()));
};

export const fetchRatedMovies = (
  sessionId: string
): AppThunk => async dispatch => {
  dispatch(requestRateMoviesStart());
  getRatedMovies(sessionId)
    .then(response => {
      const ratedMovies = response.data as Array<IMovie>;
      dispatch(requestRateMoviesSuccess(ratedMovies));
    })
    .catch(() => dispatch(requestRateMoviesError()));
};

export const addWatchList = (
  sessionId: string,
  data: IAddToWatchlist
): AppThunk => async dispatch => {
  dispatch(addWatchListStart());
  addToWatchlist(sessionId, data)
    .then(response => {
      const successMessage = response.data as IWatchListMessage;
      dispatch(addWatchListSuccess(successMessage));
    })
    .catch(() => {
      dispatch(addWatchListError());
    });
};
