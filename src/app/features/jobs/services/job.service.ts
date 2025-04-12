import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Job {
  id?: number;
  title: string;
  companyName: string;
  location: string;
  type: 'FULL-TIME' | 'PART-TIME' | 'INTERNSHIP' | 'CONTRACT' | 'REMOTE';
  salary: string;
  companyLogo: string;
  experience: string;
  postedDate: string;
  saved?: boolean;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  filters?: {
    jobType?: string[];
    experience?: string[];
    salary?: string[];
    companySize?: string[];
  };
}

export interface JobSearchResponse {
  jobs: Job[];
  total: number;
  page: number;
  limit: number;
  filters: {
    jobTypes: { value: string; label: string; count: number }[];
    experienceLevels: { value: string; label: string; count: number }[];
    salaryRanges: { value: string; label: string; count: number }[];
    companySizes: { value: string; label: string; count: number }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = `${environment.apiUrl}/jobs`;
  private savedJobsSubject = new BehaviorSubject<Set<number>>(new Set());
  savedJobs$ = this.savedJobsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadSavedJobs();
  }

  searchJobs(params: JobSearchParams): Observable<JobSearchResponse> {
    let httpParams = new HttpParams()
      .set('page', params.page?.toString() || '1')
      .set('limit', params.limit?.toString() || '10');

    if (params.query) {
      httpParams = httpParams.set('query', params.query);
    }

    if (params.location) {
      httpParams = httpParams.set('location', params.location);
    }

    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }

    if (params.filters) {
      Object.entries(params.filters).forEach(([key, values]) => {
        if (values && values.length > 0) {
          httpParams = httpParams.set(key, values.join(','));
        }
      });
    }

    return this.http.get<JobSearchResponse>(`${this.apiUrl}/search`, { params: httpParams })
      .pipe(
        map(response => ({
          ...response,
          jobs: response.jobs.map(job => ({
            ...job,
            saved: this.savedJobsSubject.value.has(job.id!)
          }))
        }))
      );
  }

  getPopularSearches(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/popular-searches`);
  }

  saveJob(jobId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${jobId}/save`, {}).pipe(
      map(() => {
        const currentSaved = new Set(this.savedJobsSubject.value);
        currentSaved.add(jobId);
        this.savedJobsSubject.next(currentSaved);
        this.saveSavedJobsToStorage();
      })
    );
  }

  unsaveJob(jobId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${jobId}/save`).pipe(
      map(() => {
        const currentSaved = new Set(this.savedJobsSubject.value);
        currentSaved.delete(jobId);
        this.savedJobsSubject.next(currentSaved);
        this.saveSavedJobsToStorage();
      })
    );
  }

  getSavedJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/saved`).pipe(
      map(jobs => jobs.map(job => ({ ...job, saved: true })))
    );
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
}
