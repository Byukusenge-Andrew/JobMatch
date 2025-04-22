import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../shared/material.module';

interface Application {
  id: number;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

interface SavedJob {
  id: number;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  salary: string;
  postedDate: string;
  expiryDate: string;
}

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './candidate-dashboard.component.html',
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .user-welcome {
      margin-bottom: 1.5rem;
    }

    .user-welcome h1 {
      font-size: 1.875rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .user-welcome p {
      color: #6b7280;
    }

    .quick-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background-color: #fff;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 600;
      color: #2563eb;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-header h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .view-all, .edit-profile {
      color: #2563eb;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }

    .applications-list, .saved-jobs-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .application-card, .job-card {
      background-color: #fff;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .company-logo {
      width: 3rem;
      height: 3rem;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 0.25rem;
      }
    }

    .application-info, .job-info {
      flex: 1;

      h3 {
        font-size: 1rem;
        font-weight: 500;
        color: #1f2937;
        margin-bottom: 0.25rem;
      }

      .company-name {
        color: #6b7280;
        font-size: 0.875rem;
        margin-bottom: 0.25rem;
      }
    }

    .application-status {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 500;

      &.pending {
        background-color: #fef3c7;
        color: #92400e;
      }

      &.reviewed {
        background-color: #e0f2fe;
        color: #0369a1;
      }

      &.shortlisted {
        background-color: #dcfce7;
        color: #15803d;
      }

      &.rejected {
        background-color: #fee2e2;
        color: #b91c1c;
      }
    }

    .job-details {
      display: flex;
      gap: 1rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .job-actions {
      display: flex;
      gap: 0.5rem;
    }

    .apply-btn {
      padding: 0.5rem 1rem;
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;

      &:hover {
        background-color: #1d4ed8;
      }
    }

    .remove-btn {
      padding: 0.5rem;
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;

      &:hover {
        color: #ef4444;
      }
    }

    .profile-section {
      grid-column: 1 / -1;
    }

    .profile-completion {
      background-color: #fff;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .completion-progress {
      height: 0.5rem;
      background-color: #e5e7eb;
      border-radius: 1rem;
      margin-bottom: 1.5rem;
    }

    .progress-bar {
      height: 100%;
      background-color: #2563eb;
      border-radius: 1rem;
      transition: width 0.3s ease;
      text-align: center;
      color: white;
      font-size: 0.75rem;
      line-height: 0.5rem;
    }

    .completion-tasks {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6b7280;

      i {
        color: #2563eb;
      }
    }

    @media (max-width: 768px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }

      .quick-stats {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }
  `]
})
export class CandidateDashboardComponent implements OnInit {
  profileCompletion = 75;

  recentApplications: Application[] = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      companyName: 'Tech Corp',
      companyLogo: 'https://placehold.co/100x100?text=TC',
      appliedDate: '2024-03-15',
      status: 'shortlisted'
    },
    {
      id: 2,
      jobTitle: 'Full Stack Engineer',
      companyName: 'Innovation Labs',
      companyLogo: 'https://placehold.co/100x100?text=IL',
      appliedDate: '2024-03-14',
      status: 'pending'
    },
    {
      id: 3,
      jobTitle: 'React Developer',
      companyName: 'Digital Solutions',
      companyLogo: 'https://placehold.co/100x100?text=DS',
      appliedDate: '2024-03-12',
      status: 'reviewed'
    }
  ];

  savedJobs: SavedJob[] = [
    {
      id: 1,
      title: 'UX Designer',
      companyName: 'Creative Agency',
      companyLogo: 'https://placehold.co/100x100?text=CA',
      location: 'New York, NY',
      salary: '$80k - $100k',
      postedDate: '2024-03-10',
      expiryDate: '2024-04-10'
    },
    {
      id: 2,
      title: 'Backend Developer',
      companyName: 'Cloud Systems',
      companyLogo: 'https://placehold.co/100x100?text=CS',
      location: 'Remote',
      salary: '$90k - $120k',
      postedDate: '2024-03-12',
      expiryDate: '2024-04-12'
    }
  ];

  completionTasks = [
    { name: 'Upload Profile Picture', completed: true },
    { name: 'Add Work Experience', completed: true },
    { name: 'Add Education', completed: true },
    { name: 'Add Skills', completed: false },
    { name: 'Upload Resume', completed: true }
  ];

  constructor() {}

  ngOnInit(): void {}

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const companyInitial = img.alt.split(' ')[0].charAt(0) || 'C';
    img.src = `https://placehold.co/100x100?text=${companyInitial}`;
  }

  applyForJob(jobId: number): void {
    // Implement job application logic
    console.log('Applying for job:', jobId);
  }

  removeSavedJob(jobId: number): void {
    // Implement remove saved job logic
    this.savedJobs = this.savedJobs.filter(job => job.id !== jobId);
  }
}
