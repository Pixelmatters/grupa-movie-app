import { AppThunk } from '../store';
import {
  requestAuthTokenStart,
  requestAuthTokenSuccess,
  requestAuthTokenError,
} from './actions';
import { createRequestToken } from '../../api/api';
import { IRequestToken } from '../../api/models';

export const requestAuthToken = (): AppThunk => async (dispatch) => {
  dispatch(requestAuthTokenStart());
  createRequestToken()
    .then((response) => {
      const token = response.data.request_token as IRequestToken;
      dispatch(requestAuthTokenSuccess(token));
    })
    .catch(() => dispatch(requestAuthTokenError()));
};
