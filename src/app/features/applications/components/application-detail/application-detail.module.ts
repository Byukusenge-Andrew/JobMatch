import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ApplicationDetailComponent implements OnInit {
  applicationId: string = '';
  application: any; // TODO: Add proper interface

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.applicationId = id;
      // TODO: Load application details
    }
  }
}