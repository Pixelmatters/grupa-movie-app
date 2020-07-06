import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { moviesReducer } from './movies/reducers';
import thunk, { ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
  movies: moviesReducer,
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
