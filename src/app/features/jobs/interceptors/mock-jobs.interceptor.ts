import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  featured?: boolean;
}

interface JobsResponse {
  jobs: Job[];
  total: number;
  filters: {
    jobTypes: { value: string; count: number }[];
    experienceLevels: { value: string; count: number }[];
    salaryRanges: { value: string; count: number }[];
    companySizes: { value: string; count: number }[];
  };
}

interface PopularSearch {
  id: number;
  term: string;
  count: number;
}

@Injectable()
export class MockJobsInterceptor implements HttpInterceptor {
  private mockJobs: Job[] = [
    {
      id: 1,
      title: 'Senior UX Designer',
      company: 'Google',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      postedDate: '2024-03-15',
      description: 'We are looking for a Senior UX Designer to join our team...',
      requirements: [
        '7+ years of experience in UX design',
        'Strong portfolio demonstrating end-to-end design process',
        'Experience with design systems',
        'Excellent communication skills'
      ],
      responsibilities: [
        'Lead design projects from concept to implementation',
        'Collaborate with product managers and engineers',
        'Conduct user research and usability testing',
        'Mentor junior designers'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Stock options',
        'Flexible work hours'
      ],
      featured: true
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Microsoft',
      //person image
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      location: 'Redmond, WA',
      type: 'Full-time',
      salary: '$130,000 - $190,000',
      postedDate: '2024-03-14',
      description: 'Join our team as a Full Stack Developer...',
      requirements: [
        '5+ years of experience in full stack development',
        'Strong knowledge of React and Node.js',
        'Experience with cloud platforms (Azure preferred)',
        'CS degree or equivalent'
      ],
      responsibilities: [
        'Develop and maintain web applications',
        'Write clean, maintainable code',
        'Participate in code reviews',
        'Collaborate with cross-functional teams'
      ],
      benefits: [
        'Comprehensive benefits package',
        '401(k) matching',
        'Professional development',
        'Remote work options'
      ]
    },{
      id: 3,
      title: 'Software Engineer',
      company: 'Apple',
      companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      location: 'Cupertino, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      postedDate: '2024-03-13',
      description: 'We are looking for a Software Engineer to join our team...',
      requirements: [
        '5+ years of experience in software development',
        'Strong knowledge of React and Node.js',
        'Experience with cloud platforms (Azure preferred)',
        'CS degree or equivalent'
      ],
      responsibilities: [
        'Develop and maintain web applications',
        'Write clean, maintainable code',
        'Participate in code reviews',
        'Collaborate with cross-functional teams'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Stock options',
        'Flexible work hours'
      ]
    }
  ];

  private mockPopularSearches: PopularSearch[] = [
    { id: 1, term: 'Software Engineer', count: 1250 },
    { id: 2, term: 'Product Manager', count: 850 },
    { id: 3, term: 'Data Scientist', count: 720 },
    { id: 4, term: 'UX Designer', count: 680 },
    { id: 5, term: 'Frontend Developer', count: 590 }
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle job search endpoint
    if (request.url.match(/\/api\/jobs\/search$/)) {
      const page = Number(request.params.get('page')) || 1;
      const limit = Number(request.params.get('limit')) || 10;
      const sortBy = request.params.get('sortBy') || 'relevance';

      // Calculate pagination
      const total = this.mockJobs.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedJobs = this.mockJobs.slice(start, end);

      const response: JobsResponse = {
        jobs: paginatedJobs,
        total,
        filters: {
          jobTypes: [
            { value: 'Full-time', count: 156 },
            { value: 'Part-time', count: 89 },
            { value: 'Contract', count: 45 },
            { value: 'Internship', count: 32 }
          ],
          experienceLevels: [
            { value: 'Entry Level', count: 78 },
            { value: 'Mid Level', count: 156 },
            { value: 'Senior Level', count: 89 },
            { value: 'Executive', count: 23 }
          ],
          salaryRanges: [
            { value: '$0-$50K', count: 45 },
            { value: '$50K-$100K', count: 123 },
            { value: '$100K-$150K', count: 89 },
            { value: '$150K+', count: 34 }
          ],
          companySizes: [
            { value: '1-50', count: 67 },
            { value: '51-200', count: 89 },
            { value: '201-500', count: 56 },
            { value: '500+', count: 78 }
          ]
        }
      };

      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(500));
    }

    // Handle popular searches endpoint
    if (request.url.match(/\/api\/jobs\/popular-searches$/)) {
      return of(new HttpResponse({
        status: 200,
        body: this.mockPopularSearches
      })).pipe(delay(500));
    }

    return next.handle(request);
  }
}
