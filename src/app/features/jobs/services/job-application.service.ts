import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface JobApplication {
  jobId: number;
  resume: string;
  coverLetter: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = `${environment.apiUrl}/applications`;

  constructor(private http: HttpClient) {}

  applyForJob(application: JobApplication): Observable<void> {
    return this.http.post<void>(this.apiUrl, application);
  }
}
