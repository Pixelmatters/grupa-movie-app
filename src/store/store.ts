import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { latestReducer } from './latest/reducers';
import { movieReducer } from './movie/reducers';
import { castReducer } from './cast/reducers';
import { popularReducer } from './popular/reducers';

const rootReducer = combineReducers({
  latest: latestReducer,
  movie: movieReducer,
  cast: castReducer,
  popular: popularReducer,
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
