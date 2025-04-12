import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerListComponent } from './pages/employer-list/employer-list.component';
import { EmployerDetailsComponent } from './pages/employer-details/employer-details.component';
const routes: Routes = [
  {
    path: '',
    component: EmployerListComponent
  },{
    path: 'employer/:id',
    component: EmployerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployersRoutingModule { }
