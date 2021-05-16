import { createReducer, on } from '@ngrx/store';
import { IdeState } from './ide.state.interface';
import * as IdeActions from './ide.actions';

export const initialState: IdeState = {
  windowActive: {
    scene: true,
    mainContainer: true,
    inspector: true,
    assets: true,
  },
  activeMainComponent: 'editor',
  assetBreadcrumbs: [],
  sceneTree: [],
  showEditorSettingsDialog: false,
};

const _ideReducer = createReducer(
  initialState,
  on(IdeActions.doNothing, (state: IdeState) => {
    return {
      ...state,
    };
  }),
  on(IdeActions.selectUiMode, (state: IdeState) => ({
    ...state,
    activeMainComponent: 'ui' as 'ui' | '3d' | 'editor',
  })),
  on(IdeActions.select3dMode, (state: IdeState) => ({
    ...state,
    activeMainComponent: '3d' as 'ui' | '3d' | 'editor',
  })),
  on(IdeActions.select3dMode, (state: IdeState) => ({
    ...state,
    activeMainComponent: 'editor' as 'ui' | '3d' | 'editor',
  })),
  on(IdeActions.addEntityToScene, (state: IdeState, { entity }) => ({
    ...state,
    sceneTree: [...state.sceneTree, entity],
  })),
  on(IdeActions.openEditorSettingsDialog, (state: IdeState) => ({
    ...state,
    showEditorSettingsDialog: true,
  })),
  on(IdeActions.closeEditorSettingsDialog, (state: IdeState) => ({
    ...state,
    showEditorSettingsDialog: false,
  })),
  on(IdeActions.cancelEditorSettings, (state: IdeState) => ({
    ...state,
    showEditorSettingsDialog: false,
  }))
);

export function ideReducer(state, action) {
  return _ideReducer(state, action);
}
