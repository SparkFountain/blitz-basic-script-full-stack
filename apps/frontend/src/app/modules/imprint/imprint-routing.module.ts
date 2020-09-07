import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImprintComponent } from './imprint.component';

const routes: Routes = [
  {
    path: '',
    component: ImprintComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprintRoutingModule {}
