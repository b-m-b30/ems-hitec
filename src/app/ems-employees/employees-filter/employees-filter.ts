import { Component, inject } from '@angular/core';
import { EmployeeStore } from '../employee-store';

@Component({
  selector: 'app-employees-filter',
  templateUrl: './employees-filter.html',
  styleUrl: './employees-filter.css',
})
export class EmployeesFilter {
  private readonly store = inject(EmployeeStore);

  filterText = this.store.filterText;

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.store.setFilter(input.value);
  }

  onClearFilter(): void {
    this.store.clearFilter();
  }
}
