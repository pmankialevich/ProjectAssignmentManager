import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project';
import { Project } from '../../../core/models/models';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error: string | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;

    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.projects = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (err) => {
          this.error = 'Failed to delete project';
          console.error(err);
        }
      });
    }
  }
}
