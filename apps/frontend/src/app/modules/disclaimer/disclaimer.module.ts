import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisclaimerRoutingModule } from './disclaimer-routing.module';
import { DisclaimerComponent } from './disclaimer.component';

@NgModule({
  imports: [CommonModule, DisclaimerRoutingModule],
  declarations: [DisclaimerComponent],
})
export class DisclaimerModule {}
