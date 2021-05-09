import { createAction } from '@ngrx/store';

const ideActionPrefix = '[IDE COMPONENT]';

export const doNothing = createAction(
  `${ideActionPrefix} Do nothing (placeholder)`
);
