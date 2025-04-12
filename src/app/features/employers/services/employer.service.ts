import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface SearchParams {
  query: string;
  location: string;
  page: number;
  limit: number;
}

interface SearchResponse {
  employers: any[];
  total: number;
}

@Injectable()
export class EmployerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchEmployers(params: SearchParams): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}/employers`, { params: params as any });
  }
}