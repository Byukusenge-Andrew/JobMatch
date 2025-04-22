import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'find-job',
    loadChildren: () => import('./features/jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'jobs',
    redirectTo: 'find-job',
    pathMatch: 'full'
  },
  {
    path: 'employers',
    loadChildren: () => import('./features/employers/employers.module').then(m => m.EmployersModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'candidate',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/candidates/pages/dashboard/candidate-dashboard.component').then(m => m.CandidateDashboardComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/find-job',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
