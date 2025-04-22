import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
  path:'candidate',
  loadChildren: () => import('./features/candidates/candidates.module').then(m => m.CandidatesModule)
  },
  {
    path:'not-found',
    loadChildren: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
path:'applications',
loadChildren: () => import('./features/applications/applications.module').then(m => m.ApplicationsModule)
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
    component: NotFoundComponent
  }
];
