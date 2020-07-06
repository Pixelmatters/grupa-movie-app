import {
  PopularActionTypes,
  REQUEST_POPULAR_START,
  REQUEST_POPULAR_ERROR,
  REQUEST_POPULAR_SUCCESS,
} from './types';
import { IMovie } from '../../api/models';

export const requestPopularStart = (): PopularActionTypes => ({
  type: REQUEST_POPULAR_START,
});

export const requestPopularSuccess = (popular: IMovie[]): PopularActionTypes => ({
  type: REQUEST_POPULAR_SUCCESS,
  popular: popular,
});

export const requestPopularError = (): PopularActionTypes => ({
  type: REQUEST_POPULAR_ERROR
});
