import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './docs.actions';

export const initialState = 0;

const _docsReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, () => 0)
);

export function docsReducer(state, action) {
  return _docsReducer(state, action);
}
