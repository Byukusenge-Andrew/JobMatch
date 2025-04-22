import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationDetailComponent } from './components/application-detail/application-detail.module';

const routes: Routes = [
  {
    path: '',
    component: ApplicationListComponent
  },{
    path: 'application/:id',
    component: ApplicationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
