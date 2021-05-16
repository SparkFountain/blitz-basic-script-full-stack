import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeRoutingModule } from './ide-routing.module';
import { IdeComponent } from './ide.component';
import { StoreModule } from '@ngrx/store';
import { ideReducer } from './store/ide.reducer';
import { TranslocoModule } from '@ngneat/transloco';
import { InspectorModule } from './inspector/inspector.module';
import { AssetsModule } from './assets/assets.module';
import { SceneModule } from './scene/scene.module';
import { EditorModule } from './editor/editor.module';
import { ImportChooserComponent } from './import-chooser/import-chooser.component';

@NgModule({
  declarations: [IdeComponent, ImportChooserComponent],
  imports: [
    CommonModule,
    IdeRoutingModule,
    StoreModule.forFeature('ideFeature', {
      ide: ideReducer,
    }),
    TranslocoModule,
    SceneModule,
    InspectorModule,
    AssetsModule,
    EditorModule,
  ],
})
export class IdeModule {}
