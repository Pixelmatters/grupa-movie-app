import {
  IPopularState,
  PopularActionTypes,
  REQUEST_POPULAR_START,
  REQUEST_POPULAR_SUCCESS,
  REQUEST_POPULAR_ERROR,
} from './types';
const initialState: IPopularState = {
  popular: undefined,
  failed: false,
  isFetching: false,
};

export const popularReducer = (
  state = initialState,
  action: PopularActionTypes
): IPopularState => {
  switch (action.type) {
  case REQUEST_POPULAR_START:
    return {
      isFetching: true,
      failed: false,
      popular: undefined,
    };
  case REQUEST_POPULAR_SUCCESS:
    return {
      isFetching: false,
      failed: false,
      popular: action.popular,
    };
  case REQUEST_POPULAR_ERROR:
    return {
      isFetching: false,
      failed: true,
      popular: undefined,
    };
  default:
    return state;
  }
};
