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
  }),
  on(IdeActions.selectUiMode, (state: IdeState) => {
    return {
      ...state,
      activeMainComponent: 'ui' as 'ui' | '3d' | 'editor',
    };
  }),
  on(IdeActions.select3dMode, (state: IdeState) => {
    return {
      ...state,
      activeMainComponent: '3d' as 'ui' | '3d' | 'editor',
    };
  }),
  on(IdeActions.select3dMode, (state: IdeState) => {
    return {
      ...state,
      activeMainComponent: 'editor' as 'ui' | '3d' | 'editor',
    };
  })
);

export function ideReducer(state, action) {
  return _ideReducer(state, action);
}
