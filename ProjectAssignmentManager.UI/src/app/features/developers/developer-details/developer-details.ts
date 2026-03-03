import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeveloperService } from '../../../core/services/developer';
import { ProjectService } from '../../../core/services/project';
import { AssignmentService } from '../../../core/services/assignment';
import { Developer, Project, SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-developer-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './developer-details.html',
  styleUrl: './developer-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperDetailsComponent {
  private readonly developerService = inject(DeveloperService);
  private readonly projectService = inject(ProjectService);
  private readonly assignmentService = inject(AssignmentService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly developer = signal<Developer | null>(null);
  readonly projects = signal<Project[]>([]);
  readonly availableProjects = signal<Project[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedProjectId = signal('');
  readonly hasProjects = computed(() => this.projects().length > 0);
  readonly SeniorityLevel = SeniorityLevel;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.loadDeveloper(id);
          this.loadProjects(id);
          this.loadAvailableProjects();
        }
      });
  }

  loadDeveloper(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.developerService
      .getDeveloperById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response.data) {
            this.developer.set(null);
            this.error.set(response?.message ?? 'Failed to load developer');
          } else {
            this.developer.set(response.data);
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load developer');
          this.loading.set(false);
          console.error(err);
        }
      });
  }

  loadProjects(developerId: string): void {
    this.projectService
      .getProjectsByDeveloper(developerId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.projects.set(response?.data ?? []);
        },
        error: (err) => {
          this.error.set('Failed to load projects');
          console.error('Failed to load projects', err);
        }
      });
  }

  loadAvailableProjects(): void {
    this.projectService
      .getAllProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.availableProjects.set(response?.data ?? []);
        },
        error: (err) => {
          this.error.set('Failed to load available projects');
          console.error('Failed to load available projects', err);
        }
      });
  }

  assignToProject(): void {
    const developer = this.developer();
    const projectId = this.selectedProjectId();

    if (!developer || !projectId) {
      return;
    }

    this.assignmentService
      .assignDeveloperToProject({
        developerId: developer.id,
        projectId
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadProjects(developer.id);
          this.selectedProjectId.set('');
        },
        error: (err) => {
          this.error.set('Failed to assign developer to project');
          console.error(err);
        }
      });
  }

  removeFromProject(projectId: string): void {
    const developer = this.developer();

    if (!developer) {
      return;
    }

    if (confirm('Remove developer from this project?')) {
      this.assignmentService
        .removeDeveloperFromProject(developer.id, projectId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loadProjects(developer.id);
          },
          error: (err) => {
            this.error.set('Failed to remove developer from project');
            console.error(err);
          }
        });
    }
  }

  getSeniorityText(level: SeniorityLevel): string {
    return SeniorityLevel[level];
  }

  goBack(): void {
    this.router.navigate(['/developers']);
  }
}
