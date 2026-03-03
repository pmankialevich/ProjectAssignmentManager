import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../core/services/project';
import { Project } from '../../../core/models/models';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  private readonly projectService = inject(ProjectService);
  private readonly destroyRef = inject(DestroyRef);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly hasProjects = computed(() => this.projects().length > 0);

  constructor() {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectService
      .getAllProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response.data) {
            this.projects.set([]);
            this.error.set(response?.message ?? 'Failed to load projects');
          } else {
            this.projects.set(response.data);
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load projects');
          this.loading.set(false);
          console.error(err);
        }
      });
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService
        .deleteProject(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loadProjects();
          },
          error: (err) => {
            this.error.set('Failed to delete project');
            console.error(err);
          }
        });
    }
  }
}
