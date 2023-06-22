import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset/asset.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AssetComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [AssetComponent],
})
export class AssetsModule {}
