import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprintRoutingModule } from './imprint-routing.module';
import { ImprintComponent } from './imprint.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, ImprintRoutingModule, TranslateModule],
  declarations: [ImprintComponent],
})
export class ImprintModule {}
