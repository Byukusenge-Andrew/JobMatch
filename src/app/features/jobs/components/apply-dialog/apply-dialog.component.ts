import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface DialogData {
  jobTitle: string;
  jobId: number;
}

@Component({
  selector: 'app-apply-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="apply-dialog">
      <div class="dialog-header">
        <h2>Apply Job: {{ data.jobTitle }}</h2>
        <button mat-icon-button (click)="close()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form [formGroup]="applyForm" (ngSubmit)="onSubmit()">
        <div class="form-section">
          <label>Choose Resume</label>
          <select formControlName="resume">
            <option value="">Select...</option>
            <option value="resume1">My Resume.pdf</option>
            <option value="resume2">Software Engineer Resume.pdf</option>
          </select>
        </div>

        <div class="form-section">
          <label>Cover Letter</label>
          <textarea
            formControlName="coverLetter"
            rows="6"
            placeholder="Write down your biography here. Let the employers know who you are...">
          </textarea>
        </div>

        <div class="dialog-actions">
          <button type="button" mat-button (click)="close()">Cancel</button>
          <button type="submit" mat-raised-button color="primary" [disabled]="applyForm.invalid">
            Apply Now
          </button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./apply-dialog.component.scss']
})
export class ApplyDialogComponent {
  applyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ApplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.applyForm = this.fb.group({
      resume: ['', Validators.required],
      coverLetter: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.applyForm.valid) {
      this.dialogRef.close(this.applyForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
