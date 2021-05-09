import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeRoutingModule } from './ide-routing.module';
import { IdeComponent } from './ide.component';
import { StoreModule } from '@ngrx/store';
import { ideReducer } from './store/ide.reducer';

@NgModule({
  declarations: [IdeComponent],
  imports: [
    CommonModule,
    IdeRoutingModule,
    StoreModule.forFeature('ideFeature', {
      ide: ideReducer,
    }),
  ],
})
export class IdeModule {}
