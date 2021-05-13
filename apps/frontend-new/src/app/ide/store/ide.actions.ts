import { createAction, props } from '@ngrx/store';
import { GameEntity } from '../scene/scene-tree/game-entity.interface';

const ideActionPrefix = '[IDE COMPONENT]';

export const doNothing = createAction(
  `${ideActionPrefix} Do nothing (placeholder)`
);

export const selectUiMode = createAction(`${ideActionPrefix} Select UI Mode`);

export const select3dMode = createAction(`${ideActionPrefix} Select 3D Mode`);

export const selectEditorMode = createAction(
  `${ideActionPrefix} Select Editor Mode`
);

export const addEntityToScene = createAction(
  `${ideActionPrefix} Add Entity To Scene`,
  props<{ entity: GameEntity }>()
);
