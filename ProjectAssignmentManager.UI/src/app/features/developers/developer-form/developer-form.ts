import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeveloperService } from '../../../core/services/developer';
import { SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-developer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './developer-form.html',
  styleUrl: './developer-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly developerService = inject(DeveloperService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly developerForm = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
    email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    seniorityLevel: this.fb.control<SeniorityLevel>(SeniorityLevel.Junior, {
      validators: [Validators.required]
    })
  });

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private readonly developerId = signal<string | null>(null);
  readonly isEditMode = computed(() => this.developerId() !== null);
  readonly formTitle = computed(() => (this.isEditMode() ? 'Edit Developer' : 'Create Developer'));
  readonly actionLabel = computed(() => (this.isEditMode() ? 'Update' : 'Create'));
  readonly seniorityLevels = [
    { value: SeniorityLevel.Junior, label: 'Junior' },
    { value: SeniorityLevel.Middle, label: 'Middle' },
    { value: SeniorityLevel.Senior, label: 'Senior' },
    { value: SeniorityLevel.Lead, label: 'Lead' }
  ];

  constructor() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');
        this.developerId.set(id);
        if (id) {
          this.loadDeveloper(id);
        } else {
          this.loading.set(false);
        }
      });
  }

  private loadDeveloper(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.developerService
      .getDeveloperById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          if (!response?.success || !response.data) {
            this.error.set(response?.message ?? 'Failed to load developer');
          } else {
            this.developerForm.patchValue({
              name: response.data.name,
              email: response.data.email,
              seniorityLevel: response.data.seniorityLevel
            });
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

  onSubmit(): void {
    if (this.developerForm.invalid) {
      this.developerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const formValue = this.developerForm.getRawValue();
    const id = this.developerId();
    const request$ = id
      ? this.developerService.updateDeveloper(id, formValue)
      : this.developerService.createDeveloper(formValue);

    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/developers']);
        },
        error: (err) => {
          this.error.set(id ? 'Failed to update developer' : 'Failed to create developer');
          this.loading.set(false);
          console.error(err);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/developers']);
  }
}
