import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';
import { JumbotronComponent } from './jumbotron/jumbotron.component';

@NgModule({
  declarations: [HomeComponent, JumbotronComponent],
  imports: [CommonModule, HomeRoutingModule, TranslocoModule, MatCardModule],
})
export class HomeModule {}
