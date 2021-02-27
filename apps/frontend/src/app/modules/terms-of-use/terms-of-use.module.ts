import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, TermsOfUseRoutingModule, TranslocoModule],
  declarations: [TermsOfUseComponent],
  exports: [TermsOfUseComponent],
})
export class TermsOfUseModule {}
