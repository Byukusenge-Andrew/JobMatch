import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployersRoutingModule } from './employers-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockEmployersInterceptor } from './interceptors/mock-employers.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployersRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockEmployersInterceptor,
      multi: true
    }
  ]
})
export class EmployersModule { }
