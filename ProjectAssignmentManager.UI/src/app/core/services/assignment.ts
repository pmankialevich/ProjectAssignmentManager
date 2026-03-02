import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AssignDeveloperToProjectDto } from '../models/models';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = `${environment.apiUrl}/assignments`;

  constructor(private http: HttpClient) {}

  assignDeveloperToProject(assignment: AssignDeveloperToProjectDto): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, assignment);
  }

  removeDeveloperFromProject(developerId: string, projectId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.apiUrl}?developerId=${developerId}&projectId=${projectId}`
    );
  }
}
