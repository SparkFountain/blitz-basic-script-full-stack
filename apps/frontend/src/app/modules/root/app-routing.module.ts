import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
// import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'ueberblick', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'blog',
    loadChildren: () =>
      import('../../blog/blog.module').then((m) => m.BlogModule),
  },
  // {
  //   path: 'features',
  //   loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  // },
  // {
  //   path: 'lets-code',
  //   loadChildren: () => import('./lets-code/lets-code.module').then(m => m.LetsCodeModule)
  // },
  // {
  //   path: 'coden',
  //   loadChildren: () => import('./lets-code/lets-code.module').then(m => m.LetsCodeModule)
  // },
  // {
  //   path: 'projects',
  //   loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  // },
  // {
  //   path: 'projekte',
  //   loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  // },
  // {
  //   path: 'commands',
  //   loadChildren: () => import('./commands/commands.module').then(m => m.CommandsModule)
  // },
  // {
  //   path: 'gaming',
  //   loadChildren: () => import('./gaming/gaming.module').then(m => m.GamingModule)
  // },
  // {
  //   path: 'tutorials',
  //   loadChildren: () => import('./tutorials/tutorials.module').then(m => m.TutorialsModule)
  // },
  // {
  //   path: 'documentation',
  //   loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  // },
  // {
  //   path: 'dokumentation',
  //   loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  // },
  // {
  //   path: 'anmelden',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'registrieren',
  //   loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  // },
  {
    path: 'contact',
    loadChildren: () =>
      import('../contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'kontakt',
    loadChildren: () =>
      import('../contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'imprint',
    loadChildren: () =>
      import('../imprint/imprint.module').then((m) => m.ImprintModule),
  },
  {
    path: 'impressum',
    loadChildren: () =>
      import('../imprint/imprint.module').then((m) => m.ImprintModule),
  },
  {
    path: 'terms-of-use',
    loadChildren: () =>
      import('../terms-of-use/terms-of-use.module').then(
        (m) => m.TermsOfUseModule
      ),
  },
  {
    path: 'nutzungsbedingungen',
    loadChildren: () =>
      import('../terms-of-use/terms-of-use.module').then(
        (m) => m.TermsOfUseModule
      ),
  },
  {
    path: 'disclaimer',
    loadChildren: () =>
      import('../disclaimer/disclaimer.module').then((m) => m.DisclaimerModule),
  },
  {
    path: 'haftungsausschluss',
    loadChildren: () =>
      import('../disclaimer/disclaimer.module').then((m) => m.DisclaimerModule),
  },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
