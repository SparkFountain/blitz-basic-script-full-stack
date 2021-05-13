import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetComponent } from './asset/asset.component';

@NgModule({
  declarations: [AssetComponent],
  imports: [CommonModule],
  exports: [AssetComponent],
})
export class AssetsModule {}
