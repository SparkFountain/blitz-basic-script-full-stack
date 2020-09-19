import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'ueberblick', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'blog',
    loadChildren: () =>
      import('../home/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('../home/features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: 'lets-code',
    loadChildren: () =>
      import('../lets-code/lets-code.module').then((m) => m.LetsCodeModule),
  },
  {
    path: 'coden',
    loadChildren: () =>
      import('../lets-code/lets-code.module').then((m) => m.LetsCodeModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('../projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'projekte',
    loadChildren: () =>
      import('../projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'tutorials',
    loadChildren: () =>
      import('../tutorials/tutorials.module').then((m) => m.TutorialsModule),
  },
  {
    path: 'documentation',
    loadChildren: () =>
      import('../documentation/documentation.module').then(
        (m) => m.DocumentationModule
      ),
  },
  {
    path: 'dokumentation',
    loadChildren: () =>
      import('../documentation/documentation.module').then(
        (m) => m.DocumentationModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'nutzerkonto',
    loadChildren: () =>
      import('../account/account.module').then((m) => m.AccountModule),
  },
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
  {
    path: '404',
    loadChildren: () =>
      import('../not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
