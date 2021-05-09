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
  activeMainComponent: '3d',
  assetBreadcrumbs: [],
};

const _ideReducer = createReducer(
  initialState,
  on(IdeActions.doNothing, (state: IdeState) => {
    return {
      ...state,
    };
  })
);

export function ideReducer(state, action) {
  return _ideReducer(state, action);
}
