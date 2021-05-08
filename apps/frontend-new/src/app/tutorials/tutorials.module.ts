import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorialsRoutingModule } from './tutorials-routing.module';
import { TutorialsComponent } from './tutorials.component';


@NgModule({
  declarations: [
    TutorialsComponent
  ],
  imports: [
    CommonModule,
    TutorialsRoutingModule
  ]
})
export class TutorialsModule { }
