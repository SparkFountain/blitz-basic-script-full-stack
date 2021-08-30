import { createSelector } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state.interface';
import { HomeState } from './home.reducer';

export const selectHomeFeature = (state: AppState) => state.home;

export const selectMessage = (state: AppState) => state.home.message;
