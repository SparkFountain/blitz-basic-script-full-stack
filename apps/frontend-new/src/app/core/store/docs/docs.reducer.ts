import { Action, createReducer, on } from '@ngrx/store';
import * as DocsActions from './docs.actions';

export interface DocsState {
  message: string
}

export const initialState: DocsState = {
  message: 'Hello World!'
};

const docsReducer = createReducer(
  initialState,
  on(DocsActions.changeMessage, (state, {message}) => ({ ...state, message }))
);

export function reducer(state: DocsState | undefined, action: Action) {
  return docsReducer(state, action);
}