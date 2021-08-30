import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AppState } from 'src/app/interfaces/app-state.interface';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private homeService: HomeService
  ) {}

  getMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.getMessage),
      exhaustMap(() =>
        this.homeService.getMessage$().pipe(
          map((message: string) =>
            FlightsActions.getMessageSuccess({ message })
          ),
          catchError(() => of(HomeActions.getMessageFailed()))
        )
      )
    )
  );
