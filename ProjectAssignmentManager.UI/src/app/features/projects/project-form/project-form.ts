import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly projectForm = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),
    description: this.fb.control('')
  });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private readonly projectId = signal<string | null>(null);
  readonly isEditMode = computed(() => this.projectId() !== null);
  readonly formTitle = computed(() => (this.isEditMode() ? 'Edit Project' : 'Create Project'));
  readonly actionLabel = computed(() => (this.isEditMode() ? 'Update' : 'Create'));

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        this.projectId.set(id);
        if (id) {
          this.loadProject(id);
        } else {
          this.loading.set(false);
        }
      });
  }

  private loadProject(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.projectService
      .getProjectById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response.data) {
            this.error.set(response?.message ?? 'Failed to load project');
          } else {
            this.projectForm.patchValue({
              name: response.data.name,
              description: response.data.description ?? ''
            });
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

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const formValue = this.projectForm.getRawValue();
    const id = this.projectId();
    const request$ = id
      ? this.projectService.updateProject(id, formValue)
      : this.projectService.createProject(formValue);

    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.error.set(id ? 'Failed to update project' : 'Failed to create project');
          this.loading.set(false);
          console.error(err);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}
