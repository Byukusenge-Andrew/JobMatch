import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface VerificationResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  verifyEmail(code: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/auth/verify-email`, { code });
  }

  resendVerificationCode(email: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/auth/resend-verification`, { email });
  }

  forgotPassword(email: string): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/auth/forgot-password`, { email });
  }
}
