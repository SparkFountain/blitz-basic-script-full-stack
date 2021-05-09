import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { StoreModule } from '@ngrx/store';
import { docsReducer } from './store/docs.reducer';

@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    StoreModule.forFeature('docsFeature', {
      docs: docsReducer,
    }),
  ],
})
export class DocsModule {}
