import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, FormsModule, ContactRoutingModule, TranslocoModule],
  declarations: [ContactComponent],
})
export class ContactModule {}
