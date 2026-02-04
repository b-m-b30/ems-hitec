import {Component, inject} from '@angular/core';
import {EmployeeStore} from '../employee-store';
import {QualificationsStore} from '../../ems-qualifications/qualifications-store';

@Component({
  selector: 'app-employees-filter',
  templateUrl: './employees-filter.html',
  styleUrl: './employees-filter.css',
})
export class EmployeesFilter {
  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  // expose store signals directly to the template
  firstName = this.store.firstNameFilter;
  lastName = this.store.lastNameFilter;
  city = this.store.cityFilter;
  qualifications = this.qualificationsStore.filteredQualifications;
  qualificationFilter = this.store.qualificationFilter;

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

  setQualificationFilter(value: string) {
    this.store.setQualificationFilter(value ? Number(value) : null);
  }

  onClearFilter(): void {
    this.store.clearFilter();
  }

  protected readonly Number = Number;
}
