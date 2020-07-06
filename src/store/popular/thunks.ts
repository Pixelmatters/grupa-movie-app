import { AppThunk } from '../store';
import {
  requestPopularStart,
  requestPopularSuccess,
  requestPopularError,
} from './actions';
import { getPopular } from '../../api/api';
import { IMovie } from '../../api/models';

export const fetchPopular = (): AppThunk => async (dispatch) => {
  dispatch(requestPopularStart());
  getPopular()
    .then((response) => {
      const popular = response.data.results as IMovie[];
      dispatch(requestPopularSuccess(popular));
    })
    .catch(() => dispatch(requestPopularError())
    );
};
