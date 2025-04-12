import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EmployerService } from '../../services/employer.service';

interface Employer {
  id: number;
  name: string;
  logo: string;
  location: string;
  openPositions: number;
  featured?: boolean;
}

@Component({
  selector: 'app-employer-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.scss'],
  providers: [EmployerService]
})
export class EmployerListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchDebounce$ = new Subject<void>();

  // Search state
  searchQuery = '';
  locationQuery = '';

  // Pagination state
  currentPage = 1;
  itemsPerPage = 12;
  totalEmployers = 0;
  totalPages = 0;

  // Data
  employers: Employer[] = [];
  popularSearches: string[] = [
    'Front-end',
    'Back-end',
    'Development',
    'PHP',
    'Laravel',
    'Bootstrap',
    'Developer',
    'Team Lead',
    'Product Testing',
    'Javascript'
  ];
  isLoading = false;

  constructor(private employerService: EmployerService) {
    // Setup search debounce
    this.searchDebounce$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentPage = 1;
        this.loadEmployers();
      });
  }

  ngOnInit(): void {
    this.loadEmployers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(): void {
    this.searchDebounce$.next();
  }

  onPopularSearch(tag: string): void {
    this.searchQuery = tag;
    this.onSearch();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEmployers();
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pages: number[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push(-1); // Represents ellipsis
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push(-1); // Represents ellipsis
    }

    // Always show last page
    pages.push(totalPages);

    return pages;
  }

  private loadEmployers(): void {
    this.isLoading = true;

    this.employerService.searchEmployers({
      query: this.searchQuery,
      location: this.locationQuery,
      page: this.currentPage,
      limit: this.itemsPerPage
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.employers = response.employers;
        this.totalEmployers = response.total;
        this.totalPages = Math.ceil(this.totalEmployers / this.itemsPerPage);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading employers:', error);
        this.isLoading = false;
      }
    });
  }
}
