import {Component, effect, inject, signal, computed} from '@angular/core';
import {EmployeeStore} from '../employee-store';
import {QualificationsStore} from '../../ems-qualifications/qualifications-store';
import {EmployeeRequestDTO} from '../employee-service';
import {Modal} from '../../modal/modal';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-employee-create',
  imports: [Modal],
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.css'],
})
export class EmployeeCreate {
  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  isModalOpen = signal(false);
  isErrorModalOpen = signal(false);

  firstName = signal('');
  lastName = signal('');
  city = signal('');
  qualifications = this.qualificationsStore.filteredQualifications;
  selectedQualifications = signal<{ id: number; skill: string }[]>([]);

  firstNameValid = computed(() => this.firstName().trim().length > 0);
  lastNameValid = computed(() => this.lastName().trim().length > 0);
  cityValid = computed(() => this.city().trim().length > 0);
  formValid = computed(() => this.firstNameValid() && this.lastNameValid() && this.cityValid());

  errorMessage = this.store.error;

  constructor() {
    effect(() => {
      if (this.errorMessage()) {
        this.isErrorModalOpen.set(true);
      }
    });
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.firstName.set('');
    this.lastName.set('');
    this.city.set('');
    this.selectedQualifications.set([]);
  }

  onAddQualification(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target?.value) return;
    const id = Number(target.value);
    if (!this.selectedQualifications().some(q => q.id === id)) {
      const qual = this.qualifications().find(q => q.id === id);
      if (qual) {
        this.selectedQualifications.update(list => [...list, qual]);
      }
    }
    target.value = '';
  }

  removeQualification(id: number) {
    this.selectedQualifications.update(list => list.filter(q => q.id !== id));
  }

  onSubmit() {
    if (!this.formValid()) return;
    const dto: EmployeeRequestDTO = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      city: this.city(),
      street: environment.defaults.employee.street,
      postcode: environment.defaults.employee.postcode,
      phone: environment.defaults.employee.phone,
      skillSet: this.selectedQualifications().map(q => q.id),
    };
    this.store.create(dto);
    this.closeModal();
  }

  isQualificationSelected(qId: number): boolean {
    return this.selectedQualifications().some(q => q.id === qId);
  }
}
