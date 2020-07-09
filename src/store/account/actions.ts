import {
  REQUEST_ACCOUNT_DETAILS_SUCCESS,
  REQUEST_ACCOUNT_DETAILS_ERROR,
  REQUEST_ACCOUNT_DETAILS_START,
  REQUEST_MOVIE_WATCHLIST_ERROR,
  REQUEST_MOVIE_WATCHLIST_START,
  REQUEST_MOVIE_WATCHLIST_SUCCESS,
  REQUEST_RATED_MOVIES_ERROR,
  REQUEST_RATED_MOVIES_START,
  REQUEST_RATED_MOVIES_SUCCESSS,
  IAccount,
  ADD_WATCH_LIST_SUCCESS,
  ADD_WATCH_LIST_START,
  ADD_WATCH_LIST_ERROR,
  IWatchListMessage
} from './types';
import { IMovie } from '../../api/models';

export const requestAccountDetailsStart = () => ({
  type: REQUEST_ACCOUNT_DETAILS_START
});

export const requestAccountDetailsSuccess = (account: IAccount) => ({
  type: REQUEST_ACCOUNT_DETAILS_SUCCESS,
  account: account
});

export const requestAccountDetailsError = () => ({
  type: REQUEST_ACCOUNT_DETAILS_ERROR
});

export const requestMovieWatchlistStart = () => ({
  type: REQUEST_MOVIE_WATCHLIST_START
});

export const requestMovieWatchlistSuccess = (
  watchlist: Array<IMovie>
): any => ({
  type: REQUEST_MOVIE_WATCHLIST_SUCCESS,
  watchlist: watchlist
});

export const requestMovieWatchlistError = () => ({
  type: REQUEST_MOVIE_WATCHLIST_ERROR
});

export const requestRateMoviesStart = () => ({
  type: REQUEST_RATED_MOVIES_START
});

export const requestRateMoviesSuccess = (ratedMovies: Array<IMovie>) => ({
  type: REQUEST_RATED_MOVIES_SUCCESSS,
  ratedMovies: ratedMovies
});

export const requestRateMoviesError = () => ({
  type: REQUEST_RATED_MOVIES_ERROR
});

export const addWatchListStart = () => ({
  type: ADD_WATCH_LIST_START
});

export const addWatchListSuccess = (statusMessage: IWatchListMessage) => ({
  type: ADD_WATCH_LIST_SUCCESS,
  message: statusMessage
});

export const addWatchListError = () => ({
  type: ADD_WATCH_LIST_ERROR
});
