
import { EmsHome } from './ems-home/ems-home';
import { LoginComponent } from './login/login';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'home', component:  EmsHome },
];
