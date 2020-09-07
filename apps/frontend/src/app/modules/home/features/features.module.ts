import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FeaturesRoutingModule, TranslateModule],
  declarations: [FeaturesComponent],
})
export class FeaturesModule {}
