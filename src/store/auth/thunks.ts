import { AppThunk } from '../store';
import {
  requestAuthTokenStart,
  requestAuthTokenSuccess,
  requestAuthTokenError,
  requestSessionIdStart,
  requestSessionIdSuccess,
  requestSessionIdError,
  requestDeleteSessionStart,
  requestDeleteSessionSuccess,
  requestDeleteSessionError,
} from './actions';
import {
  createRequestToken,
  createSession,
  deleteSession,
} from '../../api/api';
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
      const createSession = response.data as ICreateSession;
      localStorage.setItem('session_id', createSession.session_id ?? '');
      dispatch(requestSessionIdSuccess(createSession));
    })
    .catch(() => dispatch(requestSessionIdError()));
};

export const requestDeleteSession = (sessionId: string): AppThunk => async (
  dispatch
) => {
  dispatch(requestDeleteSessionStart());
  deleteSession(sessionId)
    .then(() => {
      localStorage.removeItem('session_id');
      dispatch(requestDeleteSessionSuccess());
    })
    .catch(() => dispatch(requestDeleteSessionError()));
};
