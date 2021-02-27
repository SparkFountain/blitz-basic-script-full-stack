import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, FeaturesRoutingModule, TranslocoModule],
  declarations: [FeaturesComponent],
})
export class FeaturesModule {}
