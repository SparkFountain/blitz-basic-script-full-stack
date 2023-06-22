import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AppState } from '../../../app.state.interface';
import { HomeService } from '../../../services/home.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) // private homeService: HomeService
  {}

  // getMessage$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getMessage),
  //     exhaustMap(() =>
  //       this.homeService.getMessage$().pipe(
  //         map((message: string) =>
  //           FlightsActions.getMessageSuccess({ message })
  //         ),
  //         catchError(() => of(getMessageFailed()))
  //       )
  //     )
  //   )
  // );
}
