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
    return this.http.get<QualificationGetDTO[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  create(qualification: QualificationPostDTO): Observable<QualificationGetDTO> {
    return this.http.post<QualificationGetDTO>(this.apiUrl, qualification).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, qualification: QualificationPostDTO): Observable<QualificationGetDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<QualificationGetDTO>(url, qualification).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  findEmployeesByQualification(id: number): Observable<EmployeesForAQualificationDTO> {
    const url = `${this.apiUrl}/${id}/employees`;
    return this.http.get<EmployeesForAQualificationDTO>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Verbindungsfehler: Server nicht erreichbar.'));
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

      let errorMessage = 'Unbekannter Fehler';
      if (error.error && typeof error.error === 'string') {
        if (error.status === 500 && error.error === 'OK') {
          errorMessage = 'Interner Serverfehler (Backend Unhandled Exception)';
        } else if (error.status === 401 && error.error === 'OK') {
          errorMessage = 'Nicht autorisiert. Bitte Administrator konktaktieren oder neu einloggen.';
        } else {
          errorMessage = error.error;
        }
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = error.statusText || 'Server-Fehler';
      }

      return throwError(() => new Error(`Server Fehler (${error.status}): ${errorMessage}`));
    }
  }
}
