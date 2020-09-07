import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentationComponent } from './documentation.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
  },
  {
    path: 'schluesselwoerter',
    component: DocumentationComponent,
  },
  { path: 'schluesselwoerter/:level1', component: DocumentationComponent },
  {
    path: 'schluesselwoerter/:level1/:level2',
    component: DocumentationComponent,
  },
  {
    path: 'befehle',
    component: DocumentationComponent,
  },
  { path: 'befehle/:level1', component: DocumentationComponent },
  { path: 'befehle/:level1/:level2', component: DocumentationComponent },
  {
    path: 'befehle/:level1/:level2/:level3',
    component: DocumentationComponent,
  },
  {
    path: 'befehle/:level1/:level2/:level3/:level4',
    component: DocumentationComponent,
  },
  {
    path: 'konstanten-und-scancodes',
    component: DocumentationComponent,
  },
  {
    path: 'unterschiede-zu-blitz-basic',
    component: DocumentationComponent,
  },
  {
    path: 'migrations-guide',
    component: DocumentationComponent,
  },
  { path: 'dokumentation/:level1', component: DocumentationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule {}
