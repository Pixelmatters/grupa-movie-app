import {
  IMovie,
  MovieActionTypes,
  REQUEST_LATEST_START,
  REQUEST_LATEST_ERROR,
  REQUEST_LATEST_SUCCESS,
} from './types';

export const requestLatestStart = (): MovieActionTypes => ({
  type: REQUEST_LATEST_START,
});

export const requestLatestSuccess = (latest: IMovie): MovieActionTypes => ({
  type: REQUEST_LATEST_SUCCESS,
  latest: latest,
});

export const requestLatestError = (error: Error): MovieActionTypes => ({
  type: REQUEST_LATEST_ERROR,
  error: error,
});
