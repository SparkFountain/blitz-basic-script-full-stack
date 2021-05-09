import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as IdeActions from './store/ide.actions';
import * as IdeSelectors from './store/ide.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'blitz-basic-script-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.scss'],
})
export class IdeComponent implements OnInit {
  activeMainComponent$!: Observable<'ui' | '3d' | 'editor'>;

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.activeMainComponent$ = this.store.select(
      IdeSelectors.selectActiveMainComponent
    );
  }
}
