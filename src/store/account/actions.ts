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
  IAccount
} from './types';
import { IMovie } from '../../api/models';

export const requestAccountDetailsStart = (): any => ({
  type: REQUEST_ACCOUNT_DETAILS_START
});

export const requestAccountDetailsSuccess = (account: IAccount): any => ({
  type: REQUEST_ACCOUNT_DETAILS_SUCCESS,
  account: account
});

export const requestAccountDetailsError = (): any => ({
  type: REQUEST_ACCOUNT_DETAILS_ERROR
});

export const requestMovieWatchlistStart = (): any => ({
  type: REQUEST_MOVIE_WATCHLIST_START
});

export const requestMovieWatchlistSuccess = (
  watchList: Array<IMovie>
): any => ({
  type: REQUEST_MOVIE_WATCHLIST_SUCCESS,
  watchList: watchList
});

export const requestMovieWatchlistError = (): any => ({
  type: REQUEST_MOVIE_WATCHLIST_ERROR
});

export const requestRateMoviesStart = (): any => ({
  type: REQUEST_RATED_MOVIES_START
});

export const requestRateMoviesSuccess = (ratedMovies: Array<IMovie>): any => ({
  type: REQUEST_RATED_MOVIES_SUCCESSS,
  ratedMovies: ratedMovies
});

export const requestRateMoviesError = (): any => ({
  type: REQUEST_RATED_MOVIES_ERROR
});