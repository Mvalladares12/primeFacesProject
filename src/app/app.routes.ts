import { Routes } from '@angular/router';
import {DepartamentoHomeComponent} from './departamento/departamento-home/departamento-home.component';
import {DepartamentoUpdateComponent} from './departamento/departamento-update/departamento-update.component';
import {HttpClient} from '@angular/common/http';

export const routes: Routes = [
  {path:'', component:DepartamentoHomeComponent},
  {path:'update',component:DepartamentoUpdateComponent,} //agregar el id
];
