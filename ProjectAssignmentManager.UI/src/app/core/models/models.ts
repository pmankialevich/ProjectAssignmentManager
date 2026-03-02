// Enum for Seniority Levels
export enum SeniorityLevel {
  Junior = 0,
  Middle = 1,
  Senior = 2,
  Lead = 3
}

// Developer Model
export interface Developer {
  id: string;
  name: string;
  email: string;
  seniorityLevel: SeniorityLevel;
  projects?: Project[];
  createdAt: Date;
  updatedAt: Date;
}

// Project Model
export interface Project {
  id: string;
  name: string;
  description?: string;
  developers?: Developer[];
  createdAt: Date;
  updatedAt: Date;
}

// DTOs for API requests
export interface CreateDeveloperDto {
  name: string;
  email: string;
  seniorityLevel: SeniorityLevel;
}

export interface UpdateDeveloperDto {
  name: string;
  email: string;
  seniorityLevel: SeniorityLevel;
}

export interface CreateProjectDto {
  name: string;
  description?: string;
}

export interface UpdateProjectDto {
  name: string;
  description?: string;
}

export interface AssignDeveloperToProjectDto {
  developerId: string;
  projectId: string;
}
