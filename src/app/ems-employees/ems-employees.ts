import {Component} from '@angular/core';
import {EmployeesFilter} from './employees-filter/employees-filter';
import {EmployeesList} from './employees-list/employees-list';

@Component({
  selector: 'app-ems-employees',
  imports: [EmployeesFilter, EmployeesList],
  templateUrl: './ems-employees.html',
  styleUrl: './ems-employees.css',
})
export class EmsEmployees {

}
