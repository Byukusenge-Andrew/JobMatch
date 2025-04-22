import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqSection {
  title: string;
  content: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <div class="page-header">
        <h1>About JobMatch</h1>
        <p class="breadcrumb">Home / About</p>
      </div>

      <div class="content-sections">
        <h2>Your Account</h2>
        <div class="faq-sections">
          <div class="faq-item" *ngFor="let section of accountSections; let i = index">
            <div class="faq-header" (click)="toggleSection(section)">
              <span>{{section.title}}</span>
              <button class="toggle-btn">
                {{section.isExpanded ? '×' : '+'}}
              </button>
            </div>
            <div class="faq-content" [class.expanded]="section.isExpanded">
              <p>{{section.content}}</p>
            </div>
          </div>
        </div>

        <h2>Employers and Jobs</h2>
        <div class="faq-sections">
          <div class="faq-item" *ngFor="let section of employerSections; let i = index">
            <div class="faq-header" (click)="toggleSection(section)">
              <span>{{section.title}}</span>
              <button class="toggle-btn">
                {{section.isExpanded ? '×' : '+'}}
              </button>
            </div>
            <div class="faq-content" [class.expanded]="section.isExpanded">
              <p>{{section.content}}</p>
            </div>
          </div>
        </div>

        <h2>Candidate & Resume</h2>
        <div class="faq-sections">
          <div class="faq-item" *ngFor="let section of candidateSections; let i = index">
            <div class="faq-header" (click)="toggleSection(section)">
              <span>{{section.title}}</span>
              <button class="toggle-btn">
                {{section.isExpanded ? '×' : '+'}}
              </button>
            </div>
            <div class="faq-content" [class.expanded]="section.isExpanded">
              <p>{{section.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .breadcrumb {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .content-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .faq-sections {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .faq-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #fff;
      cursor: pointer;
      font-weight: 500;
    }

    .toggle-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6b7280;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .faq-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      background-color: #f9fafb;
    }

    .faq-content.expanded {
      max-height: 500px;
      padding: 1rem;
    }

    .faq-content p {
      color: #4b5563;
      line-height: 1.5;
      margin: 0;
    }
  `]
})
export class AboutComponent {
  accountSections: FaqSection[] = [
    {
      title: 'How do I create an account?',
      content: 'Creating an account is simple. Click the "Sign Up" button, fill in your details, and verify your email address to get started.',
      isExpanded: false
    },
    {
      title: 'What are the benefits of having an account?',
      content: 'With an account, you can save jobs, track applications, receive job alerts, and maintain your professional profile.',
      isExpanded: false
    },
    {
      title: 'How do I reset my password?',
      content: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.',
      isExpanded: false
    }
  ];

  employerSections: FaqSection[] = [
    {
      title: 'How do I post a job?',
      content: 'Sign in as an employer, click "Post a Job", fill in the job details, and publish your listing.',
      isExpanded: false
    },
    {
      title: 'What are the costs involved?',
      content: 'We offer various pricing plans for employers. Check our Pricing page for detailed information.',
      isExpanded: false
    },
    {
      title: 'How long do job posts stay active?',
      content: 'Job posts remain active for 30 days by default, but you can extend or remove them at any time.',
      isExpanded: false
    }
  ];

  candidateSections: FaqSection[] = [
    {
      title: 'How do I create a resume?',
      content: 'Use our resume builder tool to create a professional resume. Add your experience, skills, and education.',
      isExpanded: false
    },
    {
      title: 'Can I apply to multiple jobs?',
      content: 'Yes, you can apply to as many jobs as you like. Each application is tracked separately in your dashboard.',
      isExpanded: false
    },
    {
      title: 'How do I make my profile stand out?',
      content: 'Complete all sections of your profile, add a professional photo, and keep your skills and experience up to date.',
      isExpanded: false
    }
  ];

  toggleSection(section: FaqSection): void {
    section.isExpanded = !section.isExpanded;
  }
}
