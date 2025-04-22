import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationDetailComponent } from './components/application-detail/application-detail.module';
import { MockApplicationsInterceptor } from './interceptor/mock-applications.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationsRoutingModule } from './applications-routing.module';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApplicationsInterceptor,
      multi: true
    }
  ]
})
export class ApplicationsModule { }