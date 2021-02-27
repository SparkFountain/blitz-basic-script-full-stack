import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialsRoutingModule } from './tutorials-routing.module';
import { TutorialsComponent } from './tutorials.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, TutorialsRoutingModule, TranslocoModule],
  declarations: [TutorialsComponent],
})
export class TutorialsModule {}
