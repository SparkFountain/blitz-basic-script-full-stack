import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeRoutingModule } from './ide-routing.module';
import { IdeComponent } from './ide.component';
import { StoreModule } from '@ngrx/store';
import { ideReducer } from './store/ide.reducer';
import { TranslocoModule } from '@ngneat/transloco';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InspectorModule } from './inspector/inspector.module';
import { AssetsModule } from './assets/assets.module';
import { SceneModule } from './scene/scene.module';

@NgModule({
  declarations: [IdeComponent],
  imports: [
    CommonModule,
    IdeRoutingModule,
    StoreModule.forFeature('ideFeature', {
      ide: ideReducer,
    }),
    TranslocoModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    SceneModule,
    InspectorModule,
    AssetsModule,
  ],
})
export class IdeModule {}
