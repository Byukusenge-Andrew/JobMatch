import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateDashboardComponent } from './pages/dashboard/candidate-dashboard.component';
import { CandidateDetailsComponent } from './pages/candidate-details/candidate-details.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateDashboardComponent
  },{
    path: 'candidate/:id',
    component: CandidateDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
