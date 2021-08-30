import { Action, createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';

export interface HomeState {
  message: string
}

export const initialState: HomeState = {
  message: 'Hello World!'
};

const homeReducer = createReducer(
  initialState,
  on(HomeActions.changeMessage, (state, {message}) => ({ ...state, message }))
);

export function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}