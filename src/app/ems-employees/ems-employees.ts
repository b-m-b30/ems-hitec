import {Component} from '@angular/core';
import {EmployeesFilter} from './employees-filter/employees-filter';
import {EmployeesList} from './employees-list/employees-list';
import {EmployeeCreate} from './employee-create/employee-create';

@Component({
  selector: 'app-ems-employees',
  imports: [EmployeesFilter, EmployeesList, EmployeeCreate],
  templateUrl: './ems-employees.html',
  styleUrl: './ems-employees.css',
})
export class EmsEmployees {
}
