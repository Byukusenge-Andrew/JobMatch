import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent {
  categories = [
    {
      name: 'Software Development',
      icon: 'code',
      count: 1253,
      color: '#3B82F6',
      route: '/jobs/category/software-development'
    },
    {
      name: 'Design',
      icon: 'brush',
      count: 873,
      color: '#EC4899',
      route: '/jobs/category/design'
    },
    {
      name: 'Marketing',
      icon: 'trending-up',
      count: 982,
      color: '#10B981',
      route: '/jobs/category/marketing'
    },
    {
      name: 'Finance',
      icon: 'dollar-sign',
      count: 645,
      color: '#F59E0B',
      route: '/jobs/category/finance'
    },
    {
      name: 'Healthcare',
      icon: 'heart',
      count: 1089,
      color: '#EF4444',
      route: '/jobs/category/healthcare'
    },
    {
      name: 'Education',
      icon: 'book',
      count: 784,
      color: '#8B5CF6',
      route: '/jobs/category/education'
    },
    {
      name: 'Customer Service',
      icon: 'headphones',
      count: 1194,
      color: '#6366F1',
      route: '/jobs/category/customer-service'
    },
    {
      name: 'Engineering',
      icon: 'settings',
      count: 947,
      color: '#0EA5E9',
      route: '/jobs/category/engineering'
    }
  ];
}
