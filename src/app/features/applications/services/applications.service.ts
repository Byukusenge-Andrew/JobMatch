import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  applicationDate: Date;
  status: 'pending' | 'interview' | 'rejected';
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getApplications(status?: string): Observable<Application[]> {
    let url = this.apiUrl ;
    if (status && status !== 'all') {
    
    return this.http.get<Application[]>(`${url}/applications/${status}`);
    }
    return this.http.get<Application[]>(`${url}/applications`);
  }
}