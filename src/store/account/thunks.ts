import { AppThunk } from '../store';
import {
  requestAccountDetailsError,
  requestAccountDetailsStart,
  requestAccountDetailsSuccess,
  requestMovieWatchlistError,
  requestMovieWatchlistStart,
  requestMovieWatchlistSuccess,
  addWatchListStart,
  addWatchListSuccess,
  addWatchListError,
  requestRatedMoviesError,
  requestRatedMoviesStart,
  requestRatedMoviesSuccess,
  requestRateMovieError,
  requestRateMovieStart,
  requestRateMovieSuccess,
} from './actions';
import {
  getAccountDetails,
  getRatedMovies,
  addToWatchlist,
  getWatchList,
  rateMovie,
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
  dispatch(requestRatedMoviesStart());
  getRatedMovies(sessionId)
    .then(response => {
      const ratedMovies = response.data.results as Array<IMovie>;
      dispatch(requestRatedMoviesSuccess(ratedMovies));
    })
    .catch(() => dispatch(requestRatedMoviesError()));
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

export const requestRateMovie = (
  movieId: number,
  value: number,
  sessionId: string
): AppThunk => async dispatch => {
  dispatch(requestRateMovieStart());
  rateMovie(movieId, value, sessionId)
    .then(() => {
      dispatch(requestRateMovieSuccess());
    })
    .catch(() => dispatch(requestRateMovieError()));
};
