import { IMovie } from '../../api/models';

export const REQUEST_ACCOUNT_DETAILS_START = 'REQUEST_ACCOUNT_DETAILS_START';
export const REQUEST_ACCOUNT_DETAILS_SUCCESS =
  'REQUEST_ACCOUNT_DETAILS_SUCCESS';
export const REQUEST_ACCOUNT_DETAILS_ERROR = 'REQUEST_ACCOUNT_DETAILS_ERROR';

export const REQUEST_MOVIE_WATCHLIST_START = 'REQUEST_MOVIE_WATCHLIST_START';
export const REQUEST_MOVIE_WATCHLIST_SUCCESS =
  'REQUEST_MOVIE_WATCHLIST_SUCCESS';
export const REQUEST_MOVIE_WATCHLIST_ERROR = 'REQUEST_MOVIE_WATCHLIST_ERROR';

export const REQUEST_RATED_MOVIES_START = 'REQUEST_RATED_MOVIES_START';
export const REQUEST_RATED_MOVIES_SUCCESS = 'REQUEST_RATED_MOVIES_SUCCESS';
export const REQUEST_RATED_MOVIES_ERROR = 'REQUEST_RATED_MOVIES_ERROR';

export const ADD_WATCH_LIST_START = 'ADD_WATCH_LIST_START';
export const ADD_WATCH_LIST_SUCCESS = 'ADD_WATCH_LIST_SUCCESS';
export const ADD_WATCH_LIST_ERROR = 'ADD_WATCH_LIST_ERROR';
export const REQUEST_RATE_MOVIE_START = 'REQUEST_RATE_MOVIE_START';
export const REQUEST_RATE_MOVIE_SUCCESS = 'REQUEST_RATE_MOVIE_SUCCESS';
export const REQUEST_RATE_MOVIE_ERROR = 'REQUEST_RATE_MOVIE_ERROR';

export type AccountActionTypes =
  | IRequestAccountDetailsStartAction
  | IRequestAccountDetailsSuccessction
  | IRequestAccountDetailsErrorAction
  | IRequestMovieWatchListStartAction
  | IRequestMovieWatchListSucessAction
  | IRequestMovieWatchListErrorAction
  | IRequestRatedMoviesStartAction
  | IRequestRatedMoviesSuccessAction
  | IRequestRatedMoviesErrorAction
  | IAddWatchListStartAction
  | IAddWatchListSuccessAction
  | IAddWatchListErrorAction
  | IRequestRateMovieStartAction
  | IRequestRateMovieSuccessAction
  | IRequestRateMovieErrorAction;

interface IRequestAccountDetailsStartAction {
  type: typeof REQUEST_ACCOUNT_DETAILS_START;
}
interface IRequestAccountDetailsSuccessction {
  account: IAccount | undefined;
  type: typeof REQUEST_ACCOUNT_DETAILS_SUCCESS;
}
interface IRequestAccountDetailsErrorAction {
  type: typeof REQUEST_ACCOUNT_DETAILS_ERROR;
}

interface IRequestMovieWatchListStartAction {
  type: typeof REQUEST_MOVIE_WATCHLIST_START;
}
interface IRequestMovieWatchListSucessAction {
  watchlist: IMovie[] | undefined;
  type: typeof REQUEST_MOVIE_WATCHLIST_SUCCESS;
}
interface IRequestMovieWatchListErrorAction {
  type: typeof REQUEST_MOVIE_WATCHLIST_ERROR;
}

interface IRequestRatedMoviesStartAction {
  type: typeof REQUEST_RATED_MOVIES_START;
}
interface IRequestRatedMoviesSuccessAction {
  ratedMovies: IMovie[] | undefined;
  type: typeof REQUEST_RATED_MOVIES_SUCCESS;
}
interface IRequestRatedMoviesErrorAction {
  type: typeof REQUEST_RATED_MOVIES_ERROR;
}

interface IAddWatchListStartAction {
  type: typeof ADD_WATCH_LIST_START;
}

interface IAddWatchListSuccessAction {
  watchList: IMovie[] | undefined;
  type: typeof ADD_WATCH_LIST_SUCCESS;
}

interface IAddWatchListErrorAction {
  type: typeof ADD_WATCH_LIST_ERROR;
}

interface IRequestRateMovieStartAction {
  type: typeof REQUEST_RATE_MOVIE_START;
}

interface IRequestRateMovieSuccessAction {
  type: typeof REQUEST_RATE_MOVIE_SUCCESS;
}

interface IRequestRateMovieErrorAction {
  type: typeof REQUEST_RATE_MOVIE_ERROR;
}

export interface IAccountState {
  isFetchingAccount: boolean;
  failedFatchingAccount: boolean;
  account?: IAccount;
  isFetchingRatedMovies: boolean;
  failedFetchingRatedMovies: boolean;
  ratedMovies?: Array<IMovie>;
  isFetchingWatchlist: boolean;
  failedFetchingWatchlist: boolean;
  watchlist?: Array<IMovie>;
  isAddingWatchlist: boolean;
  failedAddingWatchList: boolean;
  addedWatchListMessage?: IWatchListMessage;
  isRequestingRateMovie: boolean;
  failedRequestingRateMovie: boolean;
}

export interface IWatchListMessage {
  status_code: number;
  staus_message: string;
}

export interface IAccount {
  id: number;
  name: string;
  include_adult: boolean;
  username: string;
}
