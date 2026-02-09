import {Component, inject, OnInit} from '@angular/core';
import {EmployeeStore} from '../employee-store';
import {QualificationsStore} from '../../ems-qualifications/qualifications-store';
import { LucideAngularModule, RotateCcwIcon } from 'lucide-angular';

@Component({
  selector: 'app-employees-filter',
  imports: [LucideAngularModule],
  templateUrl: './employees-filter.html',
  styleUrl: './employees-filter.css',
})
export class EmployeesFilter implements OnInit {
  readonly RotateCcwIcon = RotateCcwIcon;

  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  firstName = this.store.firstNameFilter;
  lastName = this.store.lastNameFilter;
  city = this.store.cityFilter;

  qualifications = this.qualificationsStore.filteredQualifications;
  qualificationFilter = this.store.qualificationFilter;

  ngOnInit() {
    this.qualificationsStore.load();
  }

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

  setQualificationFilterFromEvent(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (!target) return;
    const value = target.value ? Number(target.value) : null;
    this.store.setQualificationFilter(value);
  }

  onClearFilter(): void {
    this.store.clearFilter();
  }
}
