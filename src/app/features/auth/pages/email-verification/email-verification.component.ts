import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [AuthService]
})
export class EmailVerificationComponent implements OnInit {
  verificationForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Get email from route params or state
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const code = this.verificationForm.get('verificationCode')?.value;

      this.authService.verifyEmail(code).subscribe({
        next: () => {
          this.isLoading = false;
          // Navigate to login or dashboard based on your app flow
          this.router.navigate(['/auth/sign-in']);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to verify email. Please try again.';
        }
      });
    }
  }

  resendCode() {
    if (!this.email) {
      this.errorMessage = 'Email address not found. Please try again.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.resendVerificationCode(this.email).subscribe({
      next: () => {
        this.isLoading = false;
        // Show success message or notification
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to resend verification code. Please try again.';
      }
    });
  }
}
