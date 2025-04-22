import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Candidate {
  id: number;
  name: string;
  title: string;
  avatar: string;
  biography: string;
  coverLetter: string;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  gender: string;
  experience: string;
  education: string;
  website?: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    secondaryPhone?: string;
    email: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCandidateById(id: number): Observable<Candidate> {
    return this.http.get<Candidate>(`${this.apiUrl}/candidates/${id}`);
  }
}
