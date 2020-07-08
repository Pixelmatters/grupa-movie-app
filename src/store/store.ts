import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { movieReducer } from './movie/reducers';
import { castReducer } from './cast/reducers';
import { authReducer } from './auth/reducers';
import { accountReducer } from './account/reducers';

const rootReducer = combineReducers({
  movie: movieReducer,
  cast: castReducer,
  auth: authReducer,
  account: accountReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
