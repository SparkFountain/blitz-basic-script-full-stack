import { createAction } from '@ngrx/store';

const ideActionPrefix = '[IDE COMPONENT]';

export const doNothing = createAction(
  `${ideActionPrefix} Do nothing (placeholder)`
);

export const selectUiMode = createAction(`${ideActionPrefix} Select UI Mode`);

export const select3dMode = createAction(`${ideActionPrefix} Select 3D Mode`);

export const selectEditorMode = createAction(
  `${ideActionPrefix} Select Editor Mode`
);
