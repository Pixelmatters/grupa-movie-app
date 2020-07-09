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
export const REQUEST_RATED_MOVIES_SUCCESSS = 'REQUEST_RATED_MOVIES_SUCCESSS';
export const REQUEST_RATED_MOVIES_ERROR = 'REQUEST_RATED_MOVIES_ERROR';

export const ADD_WATCH_LIST_START = 'ADD_WATCH_LIST_START';
export const ADD_WATCH_LIST_SUCCESS = 'ADD_WATCH_LIST_SUCCESS';
export const ADD_WATCH_LIST_ERROR = 'ADD_WATCH_LIST_ERROR';

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
  | IAddWatchListErrorAction;

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
  type: typeof REQUEST_RATED_MOVIES_SUCCESSS;
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

export interface IAccountState {
  isFetchingAccount: boolean;
  failedFatchingAccount: boolean;
  account?: IAccount;
  isFetchingRatedMovies: boolean;
  failedFetchingRatedMovies: boolean;
  ratedMovies?: Array<IMovie>;
  isFetchingWatchlist: boolean;
  failedFetcingWatchlist: boolean;
  watchList?: Array<IMovie>;
  isAddingWatchlist: boolean;
  failedAddingWatchList: boolean;
  addedWatchListMessage?: IWatchListMessage;
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
