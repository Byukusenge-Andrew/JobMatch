import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  showPassword: boolean = false;

  // Path to the static interview image
  backgroundImage: string = 'interview.jpg';

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.signInForm.controls).forEach(key => {
        const control = this.signInForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { email, password } = this.signInForm.value;

    // Mock successful login after 1 second
    setTimeout(() => {
      console.log('Sign in with:', email, password);
      this.isLoading = false;

      // For mock purposes, show error for specific test email
      if (email === 'test@error.com') {
        this.errorMessage = 'Invalid email or password. Please try again.';
      } else {
        // Redirect would happen here in a real implementation
        console.log('Successfully logged in!');
        // In a real app: this.router.navigate(['/dashboard']);
      }
    }, 1000);
  }

  navigateToSignUp(): void {
    // In a real app: this.router.navigate(['/auth/sign-up']);
  }

  navigateToForgotPassword(): void {
    // In a real app: this.router.navigate(['/auth/forgot-password']);
  }
}

