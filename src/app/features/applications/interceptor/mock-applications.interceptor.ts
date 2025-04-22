import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const MOCK_APPLICATIONS = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    companyName: 'Tech Solutions Inc',
    companyLogo: 'https://placehold.co/100x100?text=TS',
    applicationDate: new Date('2025-04-15'),
    status: 'pending',
    location: 'New York, NY'
  },
  {
    id: '2',
    jobTitle: 'Full Stack Engineer',
    companyName: 'Digital Innovations',
    companyLogo: 'https://placehold.co/100x100?text=DI',
    applicationDate: new Date('2025-04-10'),
    status: 'interview',
    location: 'Remote'
  },
  {
    id: '3',
    jobTitle: 'React Developer',
    companyName: 'StartUp Labs',
    companyLogo: 'https://placehold.co/100x100?text=SL',
    applicationDate: new Date('2025-04-05'),
    status: 'rejected',
    location: 'San Francisco, CA'
  },
  {
    id: '4',
    jobTitle: 'Angular Team Lead',
    companyName: 'Enterprise Solutions',
    companyLogo: 'https://placehold.co/100x100?text=ES',
    applicationDate: new Date('2025-04-18'),
    status: 'pending',
    location: 'Austin, TX'
  }
];

@Injectable()
export class MockApplicationsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url.includes('/api/applications')) {
      if (request.method === 'GET') {
        // Handle filtering
        const status = request.params.get('status');
        let applications = [...MOCK_APPLICATIONS];
        
        if (status && status !== 'all') {
          applications = applications.filter(app => app.status === status);
        }
        
        return of(new HttpResponse({ status: 200, body: applications }));
      }
    }
    
    return next.handle(request);
  }
}