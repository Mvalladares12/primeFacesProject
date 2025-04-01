import { Routes } from '@angular/router';
import {DepartamentoHomeComponent} from './departamento/departamento-home/departamento-home.component';
import {DepartamentoUpdateComponent} from './departamento/departamento-update/departamento-update.component';
import {MunicipioHomeComponent} from './municipio/municipio-home/municipio-home.component';
import {DistritoHomeComponent} from './distrito/distrito-home/distrito-home.component';
import {MunicipioUpdateComponent} from './municipio/municipio-update/municipio-update.component';
import {DistritoUpdateComponent} from './distrito/distrito-update/distrito-update.component';
import {LoginComponent} from './login/login.component';
import {LoginGuardian} from './login/login-guardian';

export const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'depa', component:DepartamentoHomeComponent, canActivate:[LoginGuardian]},
  {path:'update/:id',component:DepartamentoUpdateComponent,canActivate:[LoginGuardian]}, //agregar el id
  {path: 'municipio',component:MunicipioHomeComponent, canActivate:[LoginGuardian]},
  {path: 'distrito',component:DistritoHomeComponent, canActivate:[LoginGuardian]},
  {path: 'updateMuni/:id',component:MunicipioUpdateComponent, canActivate:[LoginGuardian]},
  {path: 'updateDist/:id',component:DistritoUpdateComponent, canActivate:[LoginGuardian]},
];
