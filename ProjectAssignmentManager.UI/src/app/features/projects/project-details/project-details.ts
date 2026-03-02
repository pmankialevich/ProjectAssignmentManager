import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project';
import { DeveloperService } from '../../../core/services/developer';
import { AssignmentService } from '../../../core/services/assignment';
import { Project, Developer, SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  developers: Developer[] = [];
  availableDevelopers: Developer[] = [];
  loading = false;
  error: string | null = null;
  SeniorityLevel = SeniorityLevel;
  selectedDeveloperId: string = '';

  constructor(
    private projectService: ProjectService,
    private developerService: DeveloperService,
    private assignmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProject(id);
      this.loadDevelopers(id);
      this.loadAvailableDevelopers();
    }
  }

  loadProject(id: string): void {
    this.loading = true;
    this.projectService.getProjectById(id).subscribe({
      next: (response) => {
        this.project = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load project';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadDevelopers(projectId: string): void {
    this.developerService.getDevelopersByProject(projectId).subscribe({
      next: (response) => {
        this.developers = response.data;
      },
      error: (err) => {
        console.error('Failed to load developers', err);
      }
    });
  }

  loadAvailableDevelopers(): void {
    this.developerService.getAllDevelopers().subscribe({
      next: (response) => {
        this.availableDevelopers = response.data;
      },
      error: (err) => {
        console.error('Failed to load available developers', err);
      }
    });
  }

  assignDeveloper(): void {
    if (!this.selectedDeveloperId || !this.project) return;

    this.assignmentService.assignDeveloperToProject({
      developerId: this.selectedDeveloperId,
      projectId: this.project.id
    }).subscribe({
      next: () => {
        this.loadDevelopers(this.project!.id);
        this.selectedDeveloperId = '';
      },
      error: (err) => {
        this.error = 'Failed to assign developer to project';
        console.error(err);
      }
    });
  }

  removeDeveloper(developerId: string): void {
    if (!this.project) return;

    if (confirm('Remove developer from this project?')) {
      this.assignmentService.removeDeveloperFromProject(developerId, this.project.id).subscribe({
        next: () => {
          this.loadDevelopers(this.project!.id);
        },
        error: (err) => {
          this.error = 'Failed to remove developer from project';
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
