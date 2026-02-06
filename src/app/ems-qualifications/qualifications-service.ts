import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface QualificationPostDTO {
  skill: string;
}

export interface QualificationGetDTO {
  id: number;
  skill: string;
}

export interface EmployeeNameDataDTO {
  id: number;
  lastName: string;
  firstName: string;
}

export interface EmployeesForAQualificationDTO {
  qualification: QualificationGetDTO;
  employees: EmployeeNameDataDTO[];
}

@Injectable({
  providedIn: 'root',
})
export class QualificationsService {
  private readonly apiUrl = 'http://localhost:8089/qualifications';

  private readonly http = inject(HttpClient);

  getAll(): Observable<QualificationGetDTO[]> {
    return this.http.get<QualificationGetDTO[]>(this.apiUrl);
  }

  create(qualification: QualificationPostDTO): Observable<QualificationGetDTO> {
    return this.http.post<QualificationGetDTO>(this.apiUrl, qualification);
  }

  update(id: number, qualification: QualificationPostDTO): Observable<QualificationGetDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<QualificationGetDTO>(url, qualification);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  findEmployeesByQualification(id: number): Observable<EmployeesForAQualificationDTO> {
    const url = `${this.apiUrl}/${id}/employees`;
    return this.http.get<EmployeesForAQualificationDTO>(url);
  }
}
