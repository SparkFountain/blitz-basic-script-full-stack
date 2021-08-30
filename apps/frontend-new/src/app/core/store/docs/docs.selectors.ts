import { createSelector } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state.interface';
import { DocsState } from './docs.reducer';

export const selectDocsFeature = (state: AppState) => state.docs;

export const selectMessage = (state: AppState) => state.docs.message;
