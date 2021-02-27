import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprintRoutingModule } from './imprint-routing.module';
import { ImprintComponent } from './imprint.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, ImprintRoutingModule, TranslocoModule],
  declarations: [ImprintComponent],
})
export class ImprintModule {}
