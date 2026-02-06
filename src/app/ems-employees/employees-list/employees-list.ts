import {Component, inject, OnInit} from '@angular/core';
import {EmployeeStore} from '../employee-store';

@Component({
  selector: 'app-employees-list',
  imports: [],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit {
  readonly employeeStore = inject(EmployeeStore);

  employees = this.employeeStore.filteredEmployees;
  errorMessage = this.employeeStore.error;

  ngOnInit(): void {
    this.employeeStore.startPoll();
  }

  onClickDelete(id: number): void {
    this.employeeStore.delete(id);
  }

  onClearError(): void {
    this.employeeStore.clearError();
  }
}
