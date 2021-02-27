import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule } from '@angular/forms';
import { MedalsComponent } from './medals/medals.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [AccountComponent, MedalsComponent],
  imports: [CommonModule, AccountRoutingModule, TranslocoModule, FormsModule],
})
export class AccountModule {}
