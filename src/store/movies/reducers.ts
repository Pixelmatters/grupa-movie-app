import {
  IMoviesState,
  MovieActionTypes,
  REQUEST_LATEST_START,
  REQUEST_LATEST_SUCCESS,
  REQUEST_LATEST_ERROR,
} from './types';
const initialState: IMoviesState = {
  latest: undefined,
  isFetching: false,
  error: undefined,
};

export const moviesReducer = (
  state = initialState,
  action: MovieActionTypes
): IMoviesState => {
  switch (action.type) {
    case REQUEST_LATEST_START:
      return {
        isFetching: true,
        latest: undefined,
        error: undefined,
      };
    case REQUEST_LATEST_SUCCESS:
      return {
        isFetching: false,
        latest: action.latest,
        error: undefined,
      };
    case REQUEST_LATEST_ERROR:
      return {
        isFetching: false,
        latest: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};
