import {Component, inject, signal} from '@angular/core';
import {EmployeesFilter} from './employees-filter/employees-filter';
import {EmployeesList} from './employees-list/employees-list';
import {EmployeeCreate} from './employee-create/employee-create';
import {EmployeeStore} from './employee-store';
import {Modal} from '../modal/modal';

@Component({
  selector: 'app-ems-employees',
  imports: [EmployeesFilter, EmployeesList, EmployeeCreate, Modal],
  templateUrl: './ems-employees.html',
  styleUrl: './ems-employees.css',
})
export class EmsEmployees {
  private readonly store = inject(EmployeeStore);

  isCreateModalOpen = signal(false);
  errorMessage = this.store.error;

  openCreateModal() {
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal() {
    this.isCreateModalOpen.set(false);
  }

  onEmployeeCreated() {
    this.closeCreateModal();
  }
}
