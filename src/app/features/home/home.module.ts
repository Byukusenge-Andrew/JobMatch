import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { JobCategoriesComponent } from './components/job-categories/job-categories.component';
import { FeaturedJobsComponent } from './components/featured-jobs/featured-jobs.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeroComponent,
    JobCategoriesComponent,
    FeaturedJobsComponent,
    HowItWorksComponent,
    PopularCategoriesComponent,
    TestimonialsComponent,
    CallToActionComponent,
    HomePageComponent
  ],
  exports: [
    RouterModule
  ]
})
export class HomeModule { }
