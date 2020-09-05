import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LetsCodeComponent } from './lets-code.component';
import { EmptyProjectComponent } from './empty-project/empty-project.component';
import { TemplatesComponent } from './templates/templates.component';

const routes: Routes = [
  {
    path: '',
    component: LetsCodeComponent,
  },
  {
    path: 'leeres-projekt',
    component: EmptyProjectComponent,
  },
  {
    path: 'vorlagen',
    component: TemplatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LetsCodeRoutingModule {}
