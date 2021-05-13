import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import * as IdeActions from './ide/store/ide.actions';
import * as IdeSelectors from './ide/store/ide.selectors';

@Component({
  selector: 'blitz-basic-script-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions!: Subscription[];

  enableIdeNavigation!: boolean;
  activeIdeMainComponent$!: Observable<'ui' | '3d' | 'editor'>;

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit(): void {
    this.subscriptions = [];
    this.subscriptions.push(
      this.router.events.subscribe(() => {
        this.enableIdeNavigation = this.router.url === '/game-development';
      })
    );

    this.activeIdeMainComponent$ = this.store.select(
      IdeSelectors.selectActiveMainComponent
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }

  selectUiMode(): void {
    this.store.dispatch(IdeActions.selectUiMode());
  }

  select3dMode(): void {
    this.store.dispatch(IdeActions.select3dMode());
  }

  selectEditorMode(): void {
    this.store.dispatch(IdeActions.selectEditorMode());
  }
}
