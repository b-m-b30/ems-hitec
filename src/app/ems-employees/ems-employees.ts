import {Component, viewChild} from '@angular/core';
import {EmployeesFilter} from './employees-filter/employees-filter';
import {EmployeesList} from './employees-list/employees-list';
import {EmployeeCreate} from './employee-create/employee-create';
import { EmployeesEdit } from "./employees-edit/employees-edit";

@Component({
  selector: 'app-ems-employees',
  imports: [EmployeesFilter, EmployeesList, EmployeeCreate, EmployeesEdit],
  templateUrl: './ems-employees.html',
  styleUrl: './ems-employees.css',
})
export class EmsEmployees {
  employeeEdit = viewChild.required(EmployeesEdit);

  onEditEmployee(id: number): void {
    this.employeeEdit().openModal();
    this.employeeEdit().editEmployeeId.set(id);
  }
}
