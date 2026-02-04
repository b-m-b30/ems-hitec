import {Component, inject} from '@angular/core';
import {EmployeeStore} from '../employee-store';
import {QualificationsStore} from '../../ems-qualifications/qualifications-store';
import {EmployeeRequestDTO} from '../employee-service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.css'],
})
export class EmployeeCreateComponent {
  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  firstName = this.store.firstNameCreate;
  lastName = this.store.lastNameCreate;
  city = this.store.cityCreate;
  qualificationId = this.store.qualificationCreate;

  loading = this.store.loading;
  errorMessage = this.store.error;

  qualifications = this.qualificationsStore.filteredQualifications;

  onFirstNameChange(event: Event) {
    this.store.setFirstNameCreate(
      (event.target as HTMLInputElement).value
    );
  }

  onLastNameChange(event: Event) {
    this.store.setLastNameCreate(
      (event.target as HTMLInputElement).value
    );
  }

  onCityChange(event: Event) {
    this.store.setCityCreate(
      (event.target as HTMLInputElement).value
    );
  }

  onQualificationChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.store.setQualificationCreate(value ? Number(value) : null);
  }

  onSubmit(): void {
    const dto: EmployeeRequestDTO = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      city: this.city(),
      street: '',
      postcode: '',
      phone: '',
      skillSet: this.qualificationId() ? [this.qualificationId()!] : [], // empty if null
    };

    this.store.create(dto);

    // reset form
    this.store.setFirstNameCreate('');
    this.store.setLastNameCreate('');
    this.store.setCityCreate('');
    this.store.setQualificationCreate(null);
  }
}
