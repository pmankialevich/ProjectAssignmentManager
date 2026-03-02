import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { DeveloperService } from '../../../core/services/developer';
import { ProjectService } from '../../../core/services/project';
import { AssignmentService } from '../../../core/services/assignment';
import { Developer, Project, SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-developer-details',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './developer-details.html',
  styleUrl: './developer-details.css',
})
export class DeveloperDetailsComponent implements OnInit {
  developer: Developer | null = null;
  projects: Project[] = [];
  availableProjects: Project[] = [];
  loading = false;
  error: string | null = null;
  SeniorityLevel = SeniorityLevel;
  selectedProjectId: string = '';

  constructor(
    private developerService: DeveloperService,
    private projectService: ProjectService,
    private assignmentService: AssignmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDeveloper(id);
      this.loadProjects(id);
      this.loadAvailableProjects();
    }
  }

  loadDeveloper(id: string): void {
    this.loading = true;
    this.developerService.getDeveloperById(id).subscribe({
      next: (response) => {
        this.developer = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load developer';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadProjects(developerId: string): void {
    this.projectService.getProjectsByDeveloper(developerId).subscribe({
      next: (response) => {
        this.projects = response.data;
      },
      error: (err) => {
        console.error('Failed to load projects', err);
      }
    });
  }

  loadAvailableProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.availableProjects = response.data;
      },
      error: (err) => {
        console.error('Failed to load available projects', err);
      }
    });
  }

  assignToProject(): void {
    if (!this.selectedProjectId || !this.developer) return;

    this.assignmentService.assignDeveloperToProject({
      developerId: this.developer.id,
      projectId: this.selectedProjectId
    }).subscribe({
      next: () => {
        this.loadProjects(this.developer!.id);
        this.selectedProjectId = '';
      },
      error: (err) => {
        this.error = 'Failed to assign developer to project';
        console.error(err);
      }
    });
  }

  removeFromProject(projectId: string): void {
    if (!this.developer) return;

    if (confirm('Remove developer from this project?')) {
      this.assignmentService.removeDeveloperFromProject(this.developer.id, projectId).subscribe({
        next: () => {
          this.loadProjects(this.developer!.id);
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
    this.router.navigate(['/developers']);
  }
}
