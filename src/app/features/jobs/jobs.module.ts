import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobListComponent } from './components/job-list/job-list.component';
import { MaterialModule } from '../../shared/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockJobsInterceptor } from './interceptors/mock-jobs.interceptor';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    MaterialModule,
    JobListComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockJobsInterceptor,
      multi: true
    }
  ]
})
export class JobsModule { }
