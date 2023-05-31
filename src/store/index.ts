import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './exports';

export const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk),
);

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
