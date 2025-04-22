import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockCandidatesInterceptor } from './interceptors/mock-candidates.interceptor';
import { CandidatesRoutingModule } from './candidates-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockCandidatesInterceptor,
      multi: true
    }
  ]
})
export class CandidatesModule { }
