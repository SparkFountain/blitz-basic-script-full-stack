import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeComponent } from './ide.component';

const routes: Routes = [
  {
    path: '',
    component: IdeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdeRoutingModule {}
