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
 styleUrls: ['./candidate-dashboard.component.scss'],
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
    { name: 'Add Skills', completed: true },
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
