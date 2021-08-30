import { createAction, props } from '@ngrx/store';

const prefix = '[Docs]';

export const changeMessage = createAction(
  `${prefix} Change Message`,
  props<{ message: string; }>()
);