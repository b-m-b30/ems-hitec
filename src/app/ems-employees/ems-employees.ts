import {Component} from '@angular/core';
import {EmployeesFilter} from './employees-filter/employees-filter';
import {EmployeesList} from './employees-list/employees-list';
import {QualificationsFilter} from '../ems-qualifications/qualifications-filter/qualifications-filter';
import {QualificationsList} from '../ems-qualifications/qualifications-list/qualifications-list';

@Component({
  selector: 'app-ems-employees',
  imports: [EmployeesFilter, EmployeesList, QualificationsFilter, QualificationsList],
  templateUrl: './ems-employees.html',
  styleUrl: './ems-employees.css',
})
export class EmsEmployees {

}
