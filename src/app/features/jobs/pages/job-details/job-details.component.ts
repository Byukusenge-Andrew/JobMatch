import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from '../../services/job.service';
import { JobApplicationService } from '../../services/job-application.service';
import { ApplyDialogComponent } from '../../components/apply-dialog/apply-dialog.component';
import { MaterialModule } from '../../../../shared/material.module';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Job {
  id?: number;
  title: string;
  companyId: number;
  companyName: string;
  companyLogo: string;
  companyDescription: string;
  companyWebsite: string;
  companySize: string;
  location: string;
  type: string;
  category: string;
  salary: string;
  experience: string;
  postedDate: string;
  expiryDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: Benefit[];
  featured?: boolean;
  saved?: boolean;
}

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  job: Job | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private jobApplicationService: JobApplicationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const jobId = params['id'];
      if (jobId) {
        this.loadJob(jobId);
      } else {
        this.router.navigate(['/jobs']);
      }
    });
  }

  private loadJob(jobId: number): void {
    this.isLoading = true;
    this.error = null;

    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        this.job = job;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading job:', error);
        this.error = 'Failed to load job details. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  toggleSaveJob(): void {
    if (!this.job?.id) return;

    const action = this.job.saved ?
      this.jobService.unsaveJob(this.job.id) :
      this.jobService.saveJob(this.job.id);

    action.subscribe({
      next: () => {
        if (this.job) {
          this.job.saved = !this.job.saved;
        }
      },
      error: (error) => {
        console.error('Error toggling job save status:', error);
      }
    });
  }

  applyForJob(): void {
    if (!this.job?.id) return;

    // Navigate to job application page
    this.router.navigate(['/jobs', this.job.id, 'apply']);
  }

  openApplyDialog(): void {
    const dialogRef = this.dialog.open(ApplyDialogComponent, {
      data: {
        jobTitle: this.job?.title,
        jobId: this.job?.id
      },
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobApplicationService.applyForJob({
          jobId: this.job.id,
          ...result
        }).subscribe({
          next: () => {
            // Show success message
            console.log('Application submitted successfully');
          },
          error: (error) => {
            // Show error message
            console.error('Error submitting application:', error);
          }
        });
      }
    });
  }
}
