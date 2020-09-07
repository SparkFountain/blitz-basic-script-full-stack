import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialsRoutingModule } from './tutorials-routing.module';
import { TutorialsComponent } from './tutorials.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TutorialsRoutingModule, TranslateModule],
  declarations: [TutorialsComponent],
})
export class TutorialsModule {}
