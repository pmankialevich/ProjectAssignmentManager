import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Developer, CreateDeveloperDto, UpdateDeveloperDto } from '../models/models';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  private apiUrl = `${environment.apiUrl}/developers`;

  constructor(private http: HttpClient) {}

  getAllDevelopers(): Observable<ApiResponse<Developer[]>> {
    return this.http.get<ApiResponse<Developer[]>>(this.apiUrl);
  }

  getDeveloperById(id: string): Observable<ApiResponse<Developer>> {
    return this.http.get<ApiResponse<Developer>>(`${this.apiUrl}/${id}`);
  }

  createDeveloper(developer: CreateDeveloperDto): Observable<ApiResponse<Developer>> {
    return this.http.post<ApiResponse<Developer>>(this.apiUrl, developer);
  }

  updateDeveloper(id: string, developer: UpdateDeveloperDto): Observable<ApiResponse<Developer>> {
    return this.http.put<ApiResponse<Developer>>(`${this.apiUrl}/${id}`, developer);
  }

  deleteDeveloper(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  getDevelopersByProject(projectId: string): Observable<ApiResponse<Developer[]>> {
    return this.http.get<ApiResponse<Developer[]>>(`${this.apiUrl}/by-project/${projectId}`);
  }
}
