import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode = false;
  projectId: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject();
    }
  }

  loadProject(): void {
    if (!this.projectId) return;

    this.loading = true;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.projectForm.patchValue({
          name: response.data.name,
          description: response.data.description
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load project';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const formValue = this.projectForm.value;

    if (this.isEditMode && this.projectId) {
      this.projectService.updateProject(this.projectId, formValue).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.error = 'Failed to update project';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.projectService.createProject(formValue).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.error = 'Failed to create project';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}
