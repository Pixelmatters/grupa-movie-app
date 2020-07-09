import {
  IAccountState,
  AccountActionTypes,
  REQUEST_ACCOUNT_DETAILS_START,
  REQUEST_ACCOUNT_DETAILS_SUCCESS,
  REQUEST_ACCOUNT_DETAILS_ERROR,
  REQUEST_MOVIE_WATCHLIST_START,
  REQUEST_MOVIE_WATCHLIST_ERROR,
  REQUEST_MOVIE_WATCHLIST_SUCCESS,
  REQUEST_RATED_MOVIES_START,
  ADD_WATCH_LIST_SUCCESS,
  ADD_WATCH_LIST_START,
  ADD_WATCH_LIST_ERROR,
  REQUEST_RATED_MOVIES_SUCCESS,
  REQUEST_RATED_MOVIES_ERROR,
} from './types';

const initialState: IAccountState = {
  isFetchingAccount: false,
  failedFatchingAccount: false,
  account: undefined,
  isFetchingRatedMovies: false,
  failedFetchingRatedMovies: false,
  ratedMovies: undefined,
  isFetchingWatchlist: false,
  failedFetchingWatchlist: false,
  watchList: undefined,
  isAddingWatchlist: false,
  failedAddingWatchList: false,
  addedWatchListMessage: undefined,
};

export const accountReducer = (
  state = initialState,
  action: AccountActionTypes
): IAccountState => {
  switch (action.type) {
    case ADD_WATCH_LIST_START:
      return {
        ...state,
        isAddingWatchlist: true,
        failedAddingWatchList: false,
        addedWatchListMessage: undefined,
      };
    case ADD_WATCH_LIST_SUCCESS:
      return {
        ...state,
        isAddingWatchlist: false,
        failedAddingWatchList: false,
        addedWatchListMessage: state.addedWatchListMessage,
      };
    case ADD_WATCH_LIST_ERROR:
      return {
        ...state,
        isAddingWatchlist: false,
        failedAddingWatchList: true,
        addedWatchListMessage: undefined,
      };
    case REQUEST_ACCOUNT_DETAILS_START:
      return {
        ...state,
        isFetchingAccount: true,
        failedFatchingAccount: false,
        account: undefined,
      };
    case REQUEST_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        isFetchingAccount: false,
        failedFatchingAccount: false,
        account: action.account,
      };
    case REQUEST_ACCOUNT_DETAILS_ERROR:
      return {
        ...state,
        isFetchingAccount: false,
        failedFatchingAccount: true,
        account: undefined,
      };
    case REQUEST_MOVIE_WATCHLIST_START:
      return {
        ...state,
        isFetchingWatchlist: true,
        failedFetchingWatchlist: false,
        watchList: undefined,
      };
    case REQUEST_MOVIE_WATCHLIST_SUCCESS:
      return {
        ...state,
        isFetchingWatchlist: false,
        failedFetchingWatchlist: false,
        watchList: action.watchlist,
      };
    case REQUEST_MOVIE_WATCHLIST_ERROR:
      return {
        ...state,
        isFetchingWatchlist: false,
        failedFetchingWatchlist: true,
        watchList: undefined,
      };
    case REQUEST_RATED_MOVIES_START:
      return {
        ...state,
        isFetchingRatedMovies: true,
        failedFetchingRatedMovies: false,
        ratedMovies: undefined,
      };
    case REQUEST_RATED_MOVIES_SUCCESS:
      return {
        ...state,
        isFetchingRatedMovies: false,
        failedFetchingRatedMovies: false,
        ratedMovies: action.ratedMovies,
      };
    case REQUEST_RATED_MOVIES_ERROR:
      return {
        ...state,
        isFetchingRatedMovies: false,
        failedFetchingRatedMovies: true,
        ratedMovies: undefined,
      };
    default:
      return state;
  }
};
