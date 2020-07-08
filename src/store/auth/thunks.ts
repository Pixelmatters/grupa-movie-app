import { AppThunk } from '../store';
import {
  requestAuthTokenStart,
  requestAuthTokenSuccess,
  requestAuthTokenError,
  requestSessionIdStart,
  requestSessionIdSuccess,
  requestSessionIdError,
} from './actions';
import { createRequestToken, createSession } from '../../api/api';
import { IRequestToken, ICreateSession } from '../../api/models';

export const requestAuthToken = (): AppThunk => async (dispatch) => {
  dispatch(requestAuthTokenStart());
  createRequestToken()
    .then((response) => {
      const requestToken = response.data as IRequestToken;
      dispatch(requestAuthTokenSuccess(requestToken));
    })
    .catch(() => dispatch(requestAuthTokenError()));
};

export const requestSessionId = (authToken: string): AppThunk => async (
  dispatch
) => {
  dispatch(requestSessionIdStart());
  createSession(authToken)
    .then((response) => {
      const sessionId = response.data.session_id as ICreateSession;
      dispatch(requestSessionIdSuccess(sessionId));
    })
    .catch(() => dispatch(requestSessionIdError()));
};
