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
