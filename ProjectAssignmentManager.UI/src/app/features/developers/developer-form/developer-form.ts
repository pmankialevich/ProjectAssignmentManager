import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DeveloperService } from '../../../core/services/developer';
import { SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-developer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './developer-form.html',
  styleUrl: './developer-form.css',
})
export class DeveloperFormComponent implements OnInit {
  developerForm: FormGroup;
  isEditMode = false;
  developerId: string | null = null;
  loading = false;
  error: string | null = null;
  seniorityLevels = [
    { value: SeniorityLevel.Junior, label: 'Junior' },
    { value: SeniorityLevel.Middle, label: 'Middle' },
    { value: SeniorityLevel.Senior, label: 'Senior' },
    { value: SeniorityLevel.Lead, label: 'Lead' }
  ];

  constructor(
    private fb: FormBuilder,
    private developerService: DeveloperService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.developerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      seniorityLevel: [SeniorityLevel.Junior, Validators.required]
    });
  }

  ngOnInit(): void {
    this.developerId = this.route.snapshot.paramMap.get('id');
    if (this.developerId) {
      this.isEditMode = true;
      this.loadDeveloper();
    }
  }

  loadDeveloper(): void {
    if (!this.developerId) return;

    this.loading = true;
    this.developerService.getDeveloperById(this.developerId).subscribe({
      next: (response) => {
        this.developerForm.patchValue({
          name: response.data.name,
          email: response.data.email,
          seniorityLevel: response.data.seniorityLevel
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load developer';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.developerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.developerForm.value;

    if (this.isEditMode && this.developerId) {
      this.developerService.updateDeveloper(this.developerId, formValue).subscribe({
        next: () => {
          this.router.navigate(['/developers']);
        },
        error: (err) => {
          this.error = 'Failed to update developer';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.developerService.createDeveloper(formValue).subscribe({
        next: () => {
          this.router.navigate(['/developers']);
        },
        error: (err) => {
          this.error = 'Failed to create developer';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/developers']);
  }
}
