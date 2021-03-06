import {
  REQUEST_ACCOUNT_DETAILS_SUCCESS,
  REQUEST_ACCOUNT_DETAILS_ERROR,
  REQUEST_ACCOUNT_DETAILS_START,
  REQUEST_MOVIE_WATCHLIST_ERROR,
  REQUEST_MOVIE_WATCHLIST_START,
  REQUEST_MOVIE_WATCHLIST_SUCCESS,
  REQUEST_RATED_MOVIES_ERROR,
  REQUEST_RATED_MOVIES_START,
  REQUEST_RATED_MOVIES_SUCCESS,
  REQUEST_RATE_MOVIE_START,
  REQUEST_RATE_MOVIE_SUCCESS,
  REQUEST_RATE_MOVIE_ERROR,
  IAccount,
  ADD_WATCH_LIST_SUCCESS,
  ADD_WATCH_LIST_START,
  ADD_WATCH_LIST_ERROR,
  REQUEST_DELETE_MOVIE_RATING_START,
  REQUEST_DELETE_MOVIE_RATING_SUCCESS,
  REQUEST_DELETE_MOVIE_RATING_ERROR,
  IWatchListMessage,
} from './types';
import { IMovie } from '../../api/models';

export const requestAccountDetailsStart = () => ({
  type: REQUEST_ACCOUNT_DETAILS_START,
});

export const requestAccountDetailsSuccess = (account: IAccount) => ({
  type: REQUEST_ACCOUNT_DETAILS_SUCCESS,
  account: account,
});

export const requestAccountDetailsError = (): any => ({
  type: REQUEST_ACCOUNT_DETAILS_ERROR,
});

export const requestMovieWatchlistStart = (): any => ({
  type: REQUEST_MOVIE_WATCHLIST_START,
});

export const requestMovieWatchlistSuccess = (
  watchlist: Array<IMovie>
): any => ({
  type: REQUEST_MOVIE_WATCHLIST_SUCCESS,
  watchlist: watchlist,
});

export const requestMovieWatchlistError = (): any => ({
  type: REQUEST_MOVIE_WATCHLIST_ERROR,
});

export const requestRatedMoviesStart = (): any => ({
  type: REQUEST_RATED_MOVIES_START,
});

export const requestRatedMoviesSuccess = (ratedMovies: Array<IMovie>): any => ({
  type: REQUEST_RATED_MOVIES_SUCCESS,
  ratedMovies: ratedMovies,
});

export const requestRatedMoviesError = (): any => ({
  type: REQUEST_RATED_MOVIES_ERROR,
});

export const addWatchListStart = () => ({
  type: ADD_WATCH_LIST_START,
});

export const addWatchListSuccess = (statusMessage: IWatchListMessage) => ({
  type: ADD_WATCH_LIST_SUCCESS,
  message: statusMessage,
});

export const addWatchListError = () => ({
  type: ADD_WATCH_LIST_ERROR,
});

export const requestRateMovieStart = (): any => ({
  type: REQUEST_RATE_MOVIE_START,
});

export const requestRateMovieSuccess = (): any => ({
  type: REQUEST_RATE_MOVIE_SUCCESS,
});

export const requestRateMovieError = (): any => ({
  type: REQUEST_RATE_MOVIE_ERROR,
});

export const requestDeleteMovieRatingStart = (): any => ({
  type: REQUEST_DELETE_MOVIE_RATING_START,
});

export const requestDeleteMovieRatingSuccess = (): any => ({
  type: REQUEST_DELETE_MOVIE_RATING_SUCCESS,
});

export const requestDeleteMovieRatingError = (): any => ({
  type: REQUEST_DELETE_MOVIE_RATING_ERROR,
});
