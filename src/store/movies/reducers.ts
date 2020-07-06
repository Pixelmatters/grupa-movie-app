import {
  IMoviesState,
  MovieActionTypes,
  REQUEST_LATEST_START,
  REQUEST_LATEST_SUCCESS,
  REQUEST_LATEST_ERROR,
} from './types';
const initialState: IMoviesState = {
  latest: undefined,
  failed: false,
  isFetching: false,
};

export const moviesReducer = (
  state = initialState,
  action: MovieActionTypes
): IMoviesState => {
  switch (action.type) {
  case REQUEST_LATEST_START:
    return {
      isFetching: true,
      failed: false,
      latest: undefined,
    };
  case REQUEST_LATEST_SUCCESS:
    return {
      isFetching: false,
      failed: false,
      latest: action.latest,
    };
  case REQUEST_LATEST_ERROR:
    return {
      isFetching: false,
      failed: true,
      latest: undefined,
    };
  default:
    return state;
  }
};
