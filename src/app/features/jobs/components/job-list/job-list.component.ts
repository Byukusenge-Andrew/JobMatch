import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { JobService, Job } from '../../services/job.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockJobsInterceptor } from '../../interceptors/mock-jobs.interceptor';

interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface PopularSearch {
  id: number;
  term: string;
  count: number;
}

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private searchDebounce$ = new Subject<void>();

  // Search and filter state
  searchQuery = '';
  locationQuery = '';
  showFilters = false;
  selectedFilters: { [key: string]: string[] } = {
    jobType: [],
    experience: [],
    salary: [],
    companySize: []
  };

  // Pagination state
  currentPage = 1;
  itemsPerPage = 10;
  totalJobs = 0;
  totalPages = 1;

  // Sorting
  sortBy = 'relevance';

  // Data
  jobs: Job[] = [];
  jobTypes: FilterOption[] = [];
  experienceLevels: FilterOption[] = [];
  salaryRanges: FilterOption[] = [];
  companySizes: FilterOption[] = [];
  popularSearches: string[] = [];
  isLoading = false;
  savedJobs = new Set<number>();

  constructor(private jobService: JobService) {
    // Setup search debounce
    this.searchDebounce$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentPage = 1;
        this.loadJobs();
      });

    this.jobService.savedJobs$.subscribe(savedJobs => {
      this.savedJobs = savedJobs;
    });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadPopularSearches();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadJobs(): void {
    this.isLoading = true;
    this.jobService.searchJobs({
      query: this.searchQuery,
      location: this.locationQuery,
      page: this.currentPage,
      limit: this.itemsPerPage,
      filters: this.selectedFilters,
      sortBy: this.sortBy as 'relevance' | 'recent' | 'salary-high' | 'salary-low' | undefined
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.jobs = response.jobs;
        this.totalJobs = response.total;
        this.totalPages = Math.ceil(this.totalJobs / this.itemsPerPage);

        // Transform filter options to include labels
        this.jobTypes = response.filters.jobTypes.map(option => ({
          ...option,
          label: option.value.charAt(0).toUpperCase() + option.value.slice(1)
        }));
        this.experienceLevels = response.filters.experienceLevels.map(option => ({
          ...option,
          label: option.value.charAt(0).toUpperCase() + option.value.slice(1)
        }));
        this.salaryRanges = response.filters.salaryRanges.map(option => ({
          ...option,
          label: option.value
        }));
        this.companySizes = response.filters.companySizes.map(option => ({
          ...option,
          label: option.value
        }));

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.isLoading = false;
      }
    });
  }

  loadPopularSearches(): void {
    this.jobService.getPopularSearches()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (searches: PopularSearch[]) => {
          this.popularSearches = searches.map(search => search.term);
        },
        error: (error) => {
          console.error('Error loading popular searches:', error);
        }
      });
  }

  onSearch(): void {
    this.searchDebounce$.next();
  }

  onPopularSearch(tag: string): void {
    this.searchQuery = tag;
    this.onSearch();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  isFilterSelected(filterType: string, value: string): boolean {
    return this.selectedFilters[filterType]?.includes(value) || false;
  }

  toggleFilter(filterType: string, value: string): void {
    if (!this.selectedFilters[filterType]) {
      this.selectedFilters[filterType] = [];
    }

    const index = this.selectedFilters[filterType].indexOf(value);
    if (index === -1) {
      this.selectedFilters[filterType].push(value);
    } else {
      this.selectedFilters[filterType].splice(index, 1);
    }

    this.currentPage = 1;
    this.loadJobs();
  }

  clearFilters(): void {
    this.selectedFilters = {
      jobType: [],
      experience: [],
      salary: [],
      companySize: []
    };
    this.loadJobs();
  }

  onSortChange(): void {
    this.loadJobs();
  }

  toggleSaveJob(job: Job): void {
    const isSaved = this.savedJobs.has(job.id);
    const action$ = isSaved ? this.jobService.unsaveJob(job.id) : this.jobService.saveJob(job.id);

    action$.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // The savedJobs$ observable will automatically update the UI
        },
        error: (error: Error) => {
          console.error('Error toggling save job:', error);
        }
      });
  }

  isJobSaved(jobId: number): boolean {
    return this.savedJobs.has(jobId);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadJobs();
    }
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalJobs / this.itemsPerPage);
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

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    const companyInitial = img.alt.split(' ')[0].charAt(0) || 'C';
    img.src = `https://placehold.co/100x100?text=${companyInitial}`;
  }
}
