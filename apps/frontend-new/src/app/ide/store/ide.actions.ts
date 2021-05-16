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

export const openEditorSettingsDialog = createAction(
  `${ideActionPrefix} Open Editor Settings`
);

export const closeEditorSettingsDialog = createAction(
  `${ideActionPrefix} Close Editor Settings`
);

export const saveEditorSettings = createAction(
  `${ideActionPrefix} Save Editor Settings`
);

export const cancelEditorSettings = createAction(
  `${ideActionPrefix} Cancel Editor Settings`
);

export const saveScript = createAction(
  `${ideActionPrefix} Save Script`,
  props<{ script: string[] }>()
);

export const activateCodeAssistant = createAction(
  `${ideActionPrefix} Activate Code Assistant`
);

export const formatCode = createAction(
  `${ideActionPrefix} Format Code`,
  props<{ code: string[] }>()
);
