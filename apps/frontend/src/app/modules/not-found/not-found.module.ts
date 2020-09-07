import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, TranslateModule],
})
export class NotFoundModule {}
