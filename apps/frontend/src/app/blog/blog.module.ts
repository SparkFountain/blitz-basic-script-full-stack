import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BlogComponent],
  imports: [CommonModule, BlogRoutingModule, TranslateModule],
})
export class BlogModule {}
