import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployersRoutingModule } from './employers-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployersRoutingModule,
    HttpClientModule
  ]
})
export class EmployersModule { }
