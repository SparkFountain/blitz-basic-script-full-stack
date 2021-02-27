import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { TermsOfUseModule } from '../../terms-of-use/terms-of-use.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    TranslocoModule,
    FormsModule,
    TermsOfUseModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
