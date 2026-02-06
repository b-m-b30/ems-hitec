import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QualificationGetDTO} from '../ems-qualifications/qualifications-service';
import { environment } from '../../environments/environment';

export interface EmployeeResponseDTO {
  id: number | null;
  lastName: string;
  firstName: string;
  street: string;
  postcode: string;
  city: string;
  phone: string;
  skillSet: QualificationGetDTO[] | null;
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
  skillSet: QualificationGetDTO[] | null;
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
  private readonly apiUrl = `${environment.api.employees}/employees`;
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
    return this.http.get<EmployeeResponseDTO[]>(this.apiUrl);
  }

  postEmployee(employee: EmployeeRequestDTO): Observable<EmployeeResponseDTO> {
    return this.http.post<EmployeeResponseDTO>(this.apiUrl, employee);
  }

  getEmployeeQualificationsById(id: number): Observable<EmployeeQualificationDTO[]> {
    const url = `${this.apiUrl}/${id}/${this.qualificationsUrl}`;
    return this.http.get<EmployeeQualificationDTO[]>(url);
  }

  postEmployeeNameAndSkillDataById(id: number, skill: string): Observable<EmployeeNameAndSkillDataDTO> {
    const url = `${this.apiUrl}/${id}/${this.qualificationsUrl}`;
    return this.http.post<EmployeeNameAndSkillDataDTO>(url, {skill});
  }

  deleteEmployeeQualificationById(employeeId: number, qualificationId: number): Observable<void> {
    const url = `${this.apiUrl}/${employeeId}/${this.qualificationsUrl}/${qualificationId}`;
    return this.http.delete<void>(url);
  }
}
