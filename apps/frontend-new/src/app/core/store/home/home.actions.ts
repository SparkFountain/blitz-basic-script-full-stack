import { createAction, props } from '@ngrx/store';

const prefix = '[Home]';

export const changeMessage = createAction(
  `${prefix} Change Message`,
  props<{ message: string; }>()
);