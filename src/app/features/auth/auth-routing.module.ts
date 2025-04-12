import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path:'reset-password',
    component:ResetPasswordComponent
  },
  {
    path:'email-verification',
    component:EmailVerificationComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
