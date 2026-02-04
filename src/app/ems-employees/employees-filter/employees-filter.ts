import {Component, inject} from '@angular/core';
import {EmployeeStore} from '../employee-store';

@Component({
  selector: 'app-employees-filter',
  templateUrl: './employees-filter.html',
  styleUrl: './employees-filter.css',
})
export class EmployeesFilter {
  private readonly store = inject(EmployeeStore);

  // expose store signals directly to the template
  firstName = this.store.firstNameFilter;
  lastName = this.store.lastNameFilter;
  city = this.store.cityFilter;
  qualificationId = this.store.qualificationFilter;

  onFirstNameChange(event: Event): void {
    this.store.setFirstNameFilter(
      (event.target as HTMLInputElement).value
    );
  }

  onLastNameChange(event: Event): void {
    this.store.setLastNameFilter(
      (event.target as HTMLInputElement).value
    );
  }

  onCityChange(event: Event): void {
    this.store.setCityFilter(
      (event.target as HTMLInputElement).value
    );
  }

  onQualificationChange(event: Event): void {
    this.store.setQualificationFilter(
      (event.target as HTMLSelectElement).value
    );
  }

  onClearFilter(): void {
    this.store.clearFilter();
  }
}
