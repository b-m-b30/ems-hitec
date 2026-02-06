import { authGuard } from './auth/auth-guard';
import { EmsHome } from './ems-home/ems-home';
import { LoginComponent } from './login/login';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		component: EmsHome,
		canActivate: [authGuard],
		children: [
			{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full',
			},
			{
				path: 'home',
				loadComponent: () => import('./ems-dashboard/ems-dashboard').then(m => m.EmsDashboard),
			},
			{
				path: 'employees',
				loadComponent: () => import('./ems-employees/ems-employees').then(m => m.EmsEmployees),
			},
			{
				path: 'qualifications',
				loadComponent: () => import('./ems-qualifications/ems-qualifications').then(m => m.EmsQualifications),
			},
			{
				path: 'assign-qualifications',
				loadComponent: () => import('./ems-assign-qualifications/ems-assign-qualifications').then(m => m.EmsAssignQualifications),
			}
		]
	},
];
