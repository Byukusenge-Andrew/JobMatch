import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';
import { MockJobsInterceptor } from './interceptors/mock-jobs.interceptor';
import { JobService } from './services/job.service';
import { JobListComponent } from './components/job-list/job-list.component';
// import { JobDetailsComponent } from './components/job-details/job-details.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    JobListComponent
    // JobDetailsComponent
  ],
  providers: [
    JobService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockJobsInterceptor,
      multi: true
    }
  ]
})
export class JobsModule { }
