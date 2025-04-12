import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employer-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="employer-details" *ngIf="employer">
      <h1>{{employer.name}}</h1>
      <p>{{employer.location}}</p>
      <p>Open Positions: {{employer.openPositions}}</p>
    </div>
  `,
  styleUrls: ['./employer-details.component.scss'],
  providers: [EmployerService]
})
export class EmployerDetailsComponent implements OnInit {
  employer: any;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Load employer details
    }
  }
}
