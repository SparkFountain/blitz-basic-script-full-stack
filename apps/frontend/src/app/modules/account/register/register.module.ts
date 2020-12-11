import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TermsOfUseModule } from '../../terms-of-use/terms-of-use.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    TranslateModule.forChild(),
    FormsModule,
    TermsOfUseModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}
