import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MedalsComponent } from './medals/medals.component';

@NgModule({
  declarations: [AccountComponent, MedalsComponent],
  imports: [CommonModule, AccountRoutingModule, TranslateModule, FormsModule],
})
export class AccountModule {}
