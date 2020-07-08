import {
  CastActionTypes,
  REQUEST_CAST_START,
  REQUEST_CAST_ERROR,
  REQUEST_CAST_SUCCESS,
} from './types';
import { ICast } from '../../api/models';

export const requestCastStart = (): CastActionTypes => ({
  type: REQUEST_CAST_START,
});

export const requestCastSuccess = (cast: ICast[]): CastActionTypes => ({
  type: REQUEST_CAST_SUCCESS,
  cast: cast,
});

export const requestCastError = (): CastActionTypes => ({
  type: REQUEST_CAST_ERROR,
});
