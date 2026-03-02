import { Routes } from '@angular/router';
import { DevelopersListComponent } from './features/developers/developers-list/developers-list';
import { DeveloperFormComponent } from './features/developers/developer-form/developer-form';
import { DeveloperDetailsComponent } from './features/developers/developer-details/developer-details';
import { ProjectsListComponent } from './features/projects/projects-list/projects-list';
import { ProjectFormComponent } from './features/projects/project-form/project-form';
import { ProjectDetailsComponent } from './features/projects/project-details/project-details';

export const routes: Routes = [
  { path: '', redirectTo: '/developers', pathMatch: 'full' },
  { path: 'developers', component: DevelopersListComponent },
  { path: 'developers/new', component: DeveloperFormComponent },
  { path: 'developers/edit/:id', component: DeveloperFormComponent },
  { path: 'developers/:id', component: DeveloperDetailsComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'projects/new', component: ProjectFormComponent },
  { path: 'projects/edit/:id', component: ProjectFormComponent },
  { path: 'projects/:id', component: ProjectDetailsComponent }
];
