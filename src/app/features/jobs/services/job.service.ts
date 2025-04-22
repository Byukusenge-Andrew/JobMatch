import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Job {
  id: number;
  title: string;
  companyId: number;
  companyName: string;
  companyLogo: string;
  companyDescription: string;
  companyWebsite: string;
  companySize: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  experience: string;
  postedDate: string;
  expiryDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: { icon: string; title: string; description: string }[];
  featured?: boolean;
  saved?: boolean;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  filters: {
    jobTypes: { value: string; count: number }[];
    experienceLevels: { value: string; count: number }[];
    salaryRanges: { value: string; count: number }[];
    companySizes: { value: string; count: number }[];
  };
}

export interface SearchJobsParams {
  query?: string;
  location?: string;
  page?: number;
  limit?: number;
  filters?: {
    jobType?: string[];
    experience?: string[];
    salary?: string[];
    companySize?: string[];
  };
  sortBy?: 'relevance' | 'recent' | 'salary-high' | 'salary-low';
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = environment.apiUrl;
  private savedJobsSubject = new BehaviorSubject<Set<number>>(new Set());
  savedJobs$ = this.savedJobsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadSavedJobs();
  }

  searchJobs(params: SearchJobsParams): Observable<JobsResponse> {
    let httpParams = new HttpParams();

    if (params.query) {
      httpParams = httpParams.set('query', params.query);
    }
    if (params.location) {
      httpParams = httpParams.set('location', params.location);
    }
    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params.filters) {
      if (params.filters.jobType) {
        httpParams = httpParams.set('jobType', params.filters.jobType.join(','));
      }
      if (params.filters.experience) {
        httpParams = httpParams.set('experience', params.filters.experience.join(','));
      }
      if (params.filters.salary) {
        httpParams = httpParams.set('salary', params.filters.salary.join(','));
      }
      if (params.filters.companySize) {
        httpParams = httpParams.set('companySize', params.filters.companySize.join(','));
      }
    }
    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }

    return this.http.get<JobsResponse>(`${this.apiUrl}/jobs/search`, { params: httpParams });
  }

  getPopularSearches(): Observable<{ id: number; term: string; count: number }[]> {
    return this.http.get<{ id: number; term: string; count: number }[]>(`${this.apiUrl}/jobs/popular-searches`);
  }

  saveJob(jobId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/jobs/${jobId}/save`, {}).pipe(
      map(() => {
        const currentSaved = new Set(this.savedJobsSubject.value);
        currentSaved.add(jobId);
        this.savedJobsSubject.next(currentSaved);
        this.saveSavedJobsToStorage();
      })
    );
  }

  unsaveJob(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/jobs/${jobId}/save`).pipe(
      map(() => {
        const currentSaved = new Set(this.savedJobsSubject.value);
        currentSaved.delete(jobId);
        this.savedJobsSubject.next(currentSaved);
        this.saveSavedJobsToStorage();
      })
    );
  }

  getSavedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs/saved`).pipe(
      map(jobs => jobs.map(job => ({ ...job, saved: true })))
    );
  }

  getJobById(jobId: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${jobId}`);
  }

  private loadSavedJobs(): void {
    const savedJobsStr = localStorage.getItem('savedJobs');
    if (savedJobsStr) {
      try {
        const savedJobIds = new Set<number>(JSON.parse(savedJobsStr) as number[]);
        this.savedJobsSubject.next(savedJobIds);
      } catch (e) {
        console.error('Error loading saved jobs from storage:', e);
      }
    }
  }

  private saveSavedJobsToStorage(): void {
    try {
      localStorage.setItem('savedJobs', JSON.stringify(Array.from(this.savedJobsSubject.value)));
    } catch (e) {
      console.error('Error saving jobs to storage:', e);
    }
  }

  getJobImage(jobId: number): string {
    // Using placeholder.com for demonstration with a fallback image
    return `https://picsum.photos/200/200?random=${jobId}` || 'assets/images/default-company-logo.png';
  }
}
