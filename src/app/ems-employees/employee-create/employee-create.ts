import {Component, computed, EventEmitter, inject, Output} from '@angular/core';
import {EmployeeStore} from '../employee-store';
import {QualificationsStore} from '../../ems-qualifications/qualifications-store';
import {EmployeeRequestDTO} from '../employee-service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.css'],
})
export class EmployeeCreate {
  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  firstName = this.store.firstNameCreate;
  lastName = this.store.lastNameCreate;
  city = this.store.cityCreate;
  qualificationIds = this.store.qualificationCreate;

  loading = this.store.loading;
  errorMessage = this.store.error;

  qualifications = this.qualificationsStore.filteredQualifications;

  selectedQualifications = computed(() =>
    this.qualificationIds().map(id => this.qualifications().find(q => q.id === id)!).filter(Boolean)
  );

  @Output() created = new EventEmitter<void>();

  onFirstNameChange(event: Event) {
    this.store.setFirstNameCreate((event.target as HTMLInputElement).value);
  }

  onLastNameChange(event: Event) {
    this.store.setLastNameCreate((event.target as HTMLInputElement).value);
  }

  onCityChange(event: Event) {
    this.store.setCityCreate((event.target as HTMLInputElement).value);
  }

  onAddQualification(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target?.value) return;

    const id = Number(target.value);
    const current = this.store.qualificationCreate();
    if (!current.includes(id)) {
      this.store.setQualificationCreate([...current, id]);
    }
    target.value = '';
  }

  removeQualification(id: number) {
    const current = this.store.qualificationCreate();
    this.store.setQualificationCreate(current.filter(qId => qId !== id));
  }

  onSubmit() {
    const dto: EmployeeRequestDTO = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      city: this.city(),
      street: '–',
      postcode: '00000',
      phone: '–',
      skillSet: this.qualificationIds(),
    };

    this.store.create(dto);

    this.store.setFirstNameCreate('');
    this.store.setLastNameCreate('');
    this.store.setCityCreate('');
    this.store.setQualificationCreate([]);

    this.created.emit();
  }
}
