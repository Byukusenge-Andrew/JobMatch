import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CandidateService, Candidate } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss'],
  providers: [CandidateService]
})
export class CandidateDetailsComponent implements OnInit {
  candidate?: Candidate;
  isLoading = true;
  error?: string;

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute
  ) {}
  public  handleError(error: any): void {
    console.error('Error:', error);
    this.error = 'An error occurred while loading candidate details.';
    this.isLoading = false;

  }
  public handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/images/default-avatar.png'; // Fallback image path
    target.alt = 'Default Avatar'; // Fallback alt text
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
    this.loadCandidate(id);
  }

  private loadCandidate(id: number): void {
    this.isLoading = true;
    this.candidateService.getCandidateById(id).subscribe({
      next: (candidate) => {
        this.candidate = candidate;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading candidate:', error);
        this.error = 'Failed to load candidate details';
        this.isLoading = false;
      }
    });
  }
}
