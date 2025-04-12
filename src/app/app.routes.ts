import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'find-job',
    loadChildren: () => import('./features/jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path: 'employers',
    loadChildren: () => import('./features/employers/employers.module').then(m => m.EmployersModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
