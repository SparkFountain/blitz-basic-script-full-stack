import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TranslocoModule } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from '../core/store/home/home.effects';
import { reducer } from '../core/store/home/home.reducer';

@NgModule({
  declarations: [HomeComponent, JumbotronComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslocoModule,
    MatCardModule,
    StoreModule.forFeature('home', reducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
