import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneTreeComponent } from './scene-tree/scene-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [SceneTreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
  ],
  exports: [SceneTreeComponent],
})
export class SceneModule {}
