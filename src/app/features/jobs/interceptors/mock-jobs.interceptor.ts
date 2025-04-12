import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior UX Designer',
    companyId: 1,
    companyName: 'Instagram',
    companyLogo: 'assets/images/companies/instagram.png',
    location: 'New York, USA',
    type: 'FULL-TIME',
    salary: '$120k - $150k',
    experience: '5+ years',
    postedDate: '2024-03-15',
    expiryDate: 'June 30, 2024',
    description: 'We are looking for a Senior UX Designer to join our team...',
    requirements: [
      'Bachelor's degree in Design, HCI, or related field',
      '5+ years of experience in UX design',
      'Strong portfolio demonstrating complex problems solved through design',
      'Experience with design systems and component libraries',
      'Excellent communication and collaboration skills'
    ],
    responsibilities: [
      'Lead design projects from concept to implementation',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and high-fidelity designs',
      'Collaborate with product managers and engineers',
      'Mentor junior designers'
    ],
    benefits: [
      {
        icon: 'fa-heart',
        title: 'Health Insurance',
        description: 'Comprehensive health, dental, and vision coverage'
      },
      {
        icon: 'fa-plane',
        title: 'Paid Time Off',
        description: 'Generous vacation and sick leave policy'
      }
    ],
    featured: true,
    saved: false
  }
];

@Injectable()
export class MockJobsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes('/api/applications') && request.method === 'POST') {
      // Simulate successful job application
      return of(new HttpResponse({ status: 200 })).pipe(delay(1000));
    }

    if (request.url.includes('/api/jobs/search')) {
      // Return mock jobs list
      return of(new HttpResponse({
        status: 200,
        body: {
          jobs: MOCK_JOBS,
          total: MOCK_JOBS.length,
          page: 1,
          limit: 10,
          filters: {
            jobTypes: [
              { value: 'FULL-TIME', label: 'Full Time', count: 1 },
              { value: 'PART-TIME', label: 'Part Time', count: 0 }
            ],
            experienceLevels: [
              { value: 'SENIOR', label: 'Senior Level', count: 1 },
              { value: 'MID', label: 'Mid Level', count: 0 }
            ],
            salaryRanges: [
              { value: '100k-150k', label: '$100k - $150k', count: 1 },
              { value: '150k+', label: '$150k+', count: 0 }
            ],
            companySizes: [
              { value: 'LARGE', label: '1000+ employees', count: 1 },
              { value: 'MEDIUM', label: '100-1000 employees', count: 0 }
            ]
          }
        }
      })).pipe(delay(800));
    }

    // Pass through any other requests
    return next.handle(request);
  }
}
