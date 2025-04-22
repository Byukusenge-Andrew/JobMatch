import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Employer {
  id: number;
  name: string;
  logo: string;
  location: string;
  openPositions: number;
  featured?: boolean;
}

interface EmployersResponse {
  employers: Employer[];
  total: number;
}

@Injectable()
export class MockEmployersInterceptor implements HttpInterceptor {
  private mockEmployers: Employer[] = [
    {
      id: 1,
      name: 'Google LLC',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      location: 'Mountain View, CA',
      openPositions: 150,
      featured: true
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      location: 'Redmond, WA',
      openPositions: 89,
      featured: true
    },
    {
      id: 3,
      name: 'Apple Inc.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      location: 'Cupertino, CA',
      openPositions: 72
    },
    {
      id: 4,
      name: 'Meta',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png',
      location: 'Menlo Park, CA',
      openPositions: 65,
      featured: true
    },
    {
      id: 5,
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      location: 'Seattle, WA',
      openPositions: 234
    }
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.match(/\/api\/employers$/)) {
      const query = request.params.get('query')?.toLowerCase() || '';
      const location = request.params.get('location')?.toLowerCase() || '';
      const page = Number(request.params.get('page')) || 1;
      const limit = Number(request.params.get('limit')) || 12;

      let filteredEmployers = [...this.mockEmployers];

      // Apply search filters
      if (query || location) {
        filteredEmployers = filteredEmployers.filter(employer => {
          const matchesQuery = !query || employer.name.toLowerCase().includes(query);
          const matchesLocation = !location || employer.location.toLowerCase().includes(location);
          return matchesQuery && matchesLocation;
        });
      }

      // Calculate pagination
      const total = filteredEmployers.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedEmployers = filteredEmployers.slice(start, end);

      const response: EmployersResponse = {
        employers: paginatedEmployers,
        total
      };

      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(500));
    }

    return next.handle(request);
  }
}
