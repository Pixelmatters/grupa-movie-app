import {
  ICastState,
  CastActionTypes,
  REQUEST_CAST_START,
  REQUEST_CAST_SUCCESS,
  REQUEST_CAST_ERROR,
} from './types';
const initialState: ICastState = {
  cast: undefined,
  failed: false,
  isFetching: false,
};

export const castReducer = (
  state = initialState,
  action: CastActionTypes
): ICastState => {
  switch (action.type) {
    case REQUEST_CAST_START:
      return {
        isFetching: true,
        failed: false,
        cast: undefined,
      };
    case REQUEST_CAST_SUCCESS:
      return {
        isFetching: false,
        failed: false,
        cast: action.cast,
      };
    case REQUEST_CAST_ERROR:
      return {
        isFetching: false,
        failed: true,
        cast: undefined,
      };
    default:
      return state;
  }
};
