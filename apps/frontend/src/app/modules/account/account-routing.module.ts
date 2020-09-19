import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { MedalsComponent } from './medals/medals.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'medals',
    component: MedalsComponent,
  },
  {
    path: 'medaillen',
    component: MedalsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
