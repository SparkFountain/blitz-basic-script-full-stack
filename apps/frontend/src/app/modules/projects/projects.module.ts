import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [CommonModule, ProjectsRoutingModule],
  declarations: [ProjectsComponent],
})
export class ProjectsModule {}
