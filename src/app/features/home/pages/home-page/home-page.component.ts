import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { JobCategoriesComponent } from '../../components/job-categories/job-categories.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { PopularCategoriesComponent } from '../../components/popular-categories/popular-categories.component';
import { FeaturedJobsComponent } from '../../components/featured-jobs/featured-jobs.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    JobCategoriesComponent,
    HowItWorksComponent,
    PopularCategoriesComponent,
    FeaturedJobsComponent,
    TestimonialsComponent,
    CallToActionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
