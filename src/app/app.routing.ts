import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { CatsComponent } from './components/cats/cats.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'sobre-miaunet', component: AboutComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'crear-gato', component: CreateComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'cat/:id', component: DetailComponent },
  { path: 'edit-cat/:id', component: EditComponent },
  { path: '**', component: ErrorComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes
);
