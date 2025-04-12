import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';

@Injectable()
export class MockAuthInterceptor implements HttpInterceptor {
  private validCode = '123456'; // Mock valid verification code

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.includes('/api/auth/verify-email')) {
      return this.handleEmailVerification(request);
    }

    if (request.url.includes('/api/auth/resend-verification')) {
      return this.handleResendCode(request);
    }

    if (request.url.includes('/api/auth/forgot-password')) {
      return this.handleForgotPassword(request);
    }

    return next.handle(request);
  }

  private handleEmailVerification(request: HttpRequest<any>): Observable<any> {
    const { code } = request.body;

    if (code === this.validCode) {
      return of(new HttpResponse({
        status: 200,
        body: { success: true, message: 'Email verified successfully' }
      })).pipe(delay(1000)); // Simulate network delay
    }

    // Simulate error response
    throw new HttpResponse({
      status: 400,
      body: { success: false, message: 'Invalid verification code' }
    });
  }

  private handleResendCode(request: HttpRequest<any>): Observable<any> {
    const { email } = request.body;

    if (email) {
      return of(new HttpResponse({
        status: 200,
        body: { success: true, message: 'Verification code sent successfully' }
      })).pipe(delay(1000));
    }

    throw new HttpResponse({
      status: 400,
      body: { success: false, message: 'Email is required' }
    });
  }

  private handleForgotPassword(request: HttpRequest<any>): Observable<any> {
    const { email } = request.body;

    if (email && email.includes('@')) {
      return of(new HttpResponse({
        status: 200,
        body: { success: true, message: 'Password reset instructions sent to your email' }
      })).pipe(delay(1000));
    }

    throw new HttpResponse({
      status: 400,
      body: { success: false, message: 'Please enter a valid email address' }
    });
  }
}
