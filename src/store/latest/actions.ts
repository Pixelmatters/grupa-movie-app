import {
  LatestActionTypes,
  REQUEST_LATEST_START,
  REQUEST_LATEST_ERROR,
  REQUEST_LATEST_SUCCESS,
} from './types';
import { IMovie } from '../../api/models';

export const requestLatestStart = (): LatestActionTypes => ({
  type: REQUEST_LATEST_START,
});

export const requestLatestSuccess = (latest: IMovie): LatestActionTypes => ({
  type: REQUEST_LATEST_SUCCESS,
  latest: latest,
});

export const requestLatestError = (): LatestActionTypes => ({
  type: REQUEST_LATEST_ERROR
});
