import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../core/services/project';
import { DeveloperService } from '../../../core/services/developer';
import { AssignmentService } from '../../../core/services/assignment';
import { Project, Developer, SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsComponent {
  private readonly projectService = inject(ProjectService);
  private readonly developerService = inject(DeveloperService);
  private readonly assignmentService = inject(AssignmentService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly project = signal<Project | null>(null);
  readonly developers = signal<Developer[]>([]);
  readonly availableDevelopers = signal<Developer[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedDeveloperId = signal('');
  readonly hasDevelopers = computed(() => this.developers().length > 0);
  readonly SeniorityLevel = SeniorityLevel;

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.loadProject(id);
          this.loadDevelopers(id);
          this.loadAvailableDevelopers();
        }
      });
  }

  loadProject(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectService
      .getProjectById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response.data) {
            this.project.set(null);
            this.error.set(response?.message ?? 'Failed to load project');
          } else {
            this.project.set(response.data);
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load project');
          this.loading.set(false);
          console.error(err);
        }
      });
  }

  loadDevelopers(projectId: string): void {
    this.developerService
      .getDevelopersByProject(projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.developers.set(response?.data ?? []);
        },
        error: (err) => {
          this.error.set('Failed to load developers');
          console.error('Failed to load developers', err);
        }
      });
  }

  loadAvailableDevelopers(): void {
    this.developerService
      .getAllDevelopers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.availableDevelopers.set(response?.data ?? []);
        },
        error: (err) => {
          this.error.set('Failed to load available developers');
          console.error('Failed to load available developers', err);
        }
      });
  }

  assignDeveloper(): void {
    const project = this.project();
    const developerId = this.selectedDeveloperId();

    if (!project || !developerId) {
      return;
    }

    this.assignmentService
      .assignDeveloperToProject({
        developerId,
        projectId: project.id
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loadDevelopers(project.id);
          this.selectedDeveloperId.set('');
        },
        error: (err) => {
          this.error.set('Failed to assign developer to project');
          console.error(err);
        }
      });
  }

  removeDeveloper(developerId: string): void {
    const project = this.project();

    if (!project) {
      return;
    }

    if (confirm('Remove developer from this project?')) {
      this.assignmentService
        .removeDeveloperFromProject(developerId, project.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loadDevelopers(project.id);
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
    this.router.navigate(['/projects']);
  }
}
