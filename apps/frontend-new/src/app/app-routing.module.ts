import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'game-development',
    loadChildren: () => import('./ide/ide.module').then((m) => m.IdeModule),
  },
  {
    path: 'tutorials',
    loadChildren: () =>
      import('./tutorials/tutorials.module').then((m) => m.TutorialsModule),
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.module').then((m) => m.DocsModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
