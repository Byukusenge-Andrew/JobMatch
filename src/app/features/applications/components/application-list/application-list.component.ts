import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationsService, Application } from '../../services/applications.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ApplicationListComponent implements OnInit {
  applications: Application[] = [];
  filterStatus: string = 'all';

  constructor(private applicationsService: ApplicationsService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  filterApplications(status: string): void {
    this.filterStatus = status;
    this.loadApplications();
  }

  getFilteredApplications(): Application[] {
    return this.applications;
  }

  private loadApplications(): void {
    this.applicationsService.getApplications(this.filterStatus)
      .subscribe(applications => {
        this.applications = applications;
      });
  }
}