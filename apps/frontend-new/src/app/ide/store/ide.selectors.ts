import { createSelector } from '@ngrx/store';
import { IdeState } from './ide.state.interface';

export const selectIdeFeature = (state: any) => state.ideFeature;

export const selectActiveMainComponent = createSelector(
  selectIdeFeature,
  (state: any) => {
    console.log('[STATE]', state);
    return state?.ide?.activeMainComponent;
  }
);

export const selectSceneTree = createSelector(
  selectIdeFeature,
  (state: any) => state?.ide?.sceneTree
);

export const showEditorSettingsDialog = createSelector(
  selectIdeFeature,
  (state: any) => state?.ide?.showEditorSettingsDialog
);
