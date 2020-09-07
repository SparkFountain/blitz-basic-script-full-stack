import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsComponent } from './tutorials.component';

const routes: Routes = [
  {
    path: '',
    component: TutorialsComponent
  },
  {
    path: 'grundlagen',
    component: TutorialsComponent
  },
  {
    path: 'grafik',
    component: TutorialsComponent
  },
  {
    path: 'eingabe-und-ausgabe',
    component: TutorialsComponent
  },
  {
    path: 'sound-und-musik',
    component: TutorialsComponent
  },
  {
    path: 'grafische-benutzeroberflaeche',
    component: TutorialsComponent
  },
  {
    path: 'partikel',
    component: TutorialsComponent
  },
  {
    path: '3d-objekte',
    component: TutorialsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialsRoutingModule {}
