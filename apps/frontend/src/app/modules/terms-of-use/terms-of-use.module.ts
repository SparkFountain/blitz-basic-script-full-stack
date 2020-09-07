import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TermsOfUseRoutingModule, TranslateModule],
  declarations: [TermsOfUseComponent],
  exports: [TermsOfUseComponent],
})
export class TermsOfUseModule {}
