import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeRoutingModule } from './ide-routing.module';
import { IdeComponent } from './ide.component';


@NgModule({
  declarations: [
    IdeComponent
  ],
  imports: [
    CommonModule,
    IdeRoutingModule
  ]
})
export class IdeModule { }
