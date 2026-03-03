import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeveloperService } from '../../../core/services/developer';
import { Developer, SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-developers-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './developers-list.html',
  styleUrl: './developers-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevelopersListComponent {
  private readonly developerService = inject(DeveloperService);
  private readonly destroyRef = inject(DestroyRef);

  readonly developers = signal<Developer[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly hasDevelopers = computed(() => this.developers().length > 0);
  readonly SeniorityLevel = SeniorityLevel;

  constructor() {
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.developerService
      .getAllDevelopers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response.data) {
            this.error.set(response?.message ?? 'Failed to load developers');
            this.developers.set([]);
          } else {
            this.developers.set(response.data);
            this.error.set(null);
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load developers');
          this.loading.set(false);
          console.error(err);
        }
      });
  }

  deleteDeveloper(id: string): void {
    if (confirm('Are you sure you want to delete this developer?')) {
      this.developerService
        .deleteDeveloper(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loadDevelopers();
          },
          error: (err) => {
            this.error.set('Failed to delete developer');
            console.error(err);
          }
        });
    }
  }

  getSeniorityText(level: SeniorityLevel): string {
    return SeniorityLevel[level];
  }
}
