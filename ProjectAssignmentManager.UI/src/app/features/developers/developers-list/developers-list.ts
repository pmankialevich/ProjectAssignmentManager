import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeveloperService } from '../../../core/services/developer';
import { Developer, SeniorityLevel } from '../../../core/models/models';

@Component({
  selector: 'app-developers-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './developers-list.html',
  styleUrl: './developers-list.css',
})
export class DevelopersListComponent implements OnInit {
  developers: Developer[] = [];
  loading = false;
  error: string | null = null;
  SeniorityLevel = SeniorityLevel;

  constructor(private developerService: DeveloperService) {}

  ngOnInit(): void {
    this.loadDevelopers();
  }

  loadDevelopers(): void {
    this.loading = true;
    this.error = null;

    this.developerService.getAllDevelopers().subscribe({
      next: (response) => {
        this.developers = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load developers';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteDeveloper(id: string): void {
    if (confirm('Are you sure you want to delete this developer?')) {
      this.developerService.deleteDeveloper(id).subscribe({
        next: () => {
          this.loadDevelopers();
        },
        error: (err) => {
          this.error = 'Failed to delete developer';
          console.error(err);
        }
      });
    }
  }

  getSeniorityText(level: SeniorityLevel): string {
    return SeniorityLevel[level];
  }
}
