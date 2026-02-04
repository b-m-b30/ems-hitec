import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface EmployeeResponseDTO {
  id: number | null;
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: number[] | null;
}

export interface EmployeeRequestPutDTO {
  lastName: string | null;
  firstName: string | null;
  street: string | null;
  postcode: string | null;
  city: string | null;
  phone: string | null;
  skillSet: number[] | null;
}

export interface EmployeeRequestDTO {
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: number[] | null;
}

export interface EmployeeNameAndSkillDataDTO {
  id: number | null;
  lastName: string | null;
  firstName: string | null;
  skillSet: number[] | null;
}

export interface EmployeeNameDataDTO {
  id: number | null;
  lastName: string | null;
  firstName: string | null;
}

export interface EmployeeQualificationDTO {
  id: number;
  skill: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:8089/employees';
  private readonly qualificationsUrl = 'qualifications';

  private readonly http = inject(HttpClient);

  getById(id: number): Observable<EmployeeResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<EmployeeResponseDTO>(url);
  }

  putById(id: number, employee: EmployeeRequestPutDTO): Observable<EmployeeResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<EmployeeResponseDTO>(url, employee);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  patchById(id: number, employee: EmployeeRequestPutDTO): Observable<EmployeeResponseDTO> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<EmployeeResponseDTO>(url, employee);
  }

  getAll(): Observable<EmployeeResponseDTO[]> {
    return this.http.get<EmployeeResponseDTO[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  postEmployee(employee: EmployeeRequestDTO): Observable<EmployeeResponseDTO> {
    return this.http.post<EmployeeResponseDTO>(this.apiUrl, employee).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeQualificationsById(id: number): Observable<EmployeeQualificationDTO[]> {
    const url = `${this.apiUrl}/${id}/${this.qualificationsUrl}`;
    return this.http.get<EmployeeQualificationDTO[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  postEmployeeNameAndSkillDataById(id: number, skill: string): Observable<EmployeeNameAndSkillDataDTO> {
    const url = `${this.apiUrl}/${id}/${this.qualificationsUrl}`;
    return this.http.post<EmployeeNameAndSkillDataDTO>(url, {skill}).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployeeQualificationById(employeeId: number, qualificationId: number): Observable<void> {
    const url = `${this.apiUrl}/${employeeId}/${this.qualificationsUrl}/${qualificationId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('Verbindungsfehler: Server nicht erreichbar.'));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

      let errorMessage = 'Unbekannter Fehler';
      if (error.error && typeof error.error === 'string') {
        // Known backend bug: 500 error returns "OK" string
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
