import { Component, computed, effect, inject, signal } from '@angular/core';
import { Modal } from "../../modal/modal";
import { EmployeeStore } from '../employee-store';
import { QualificationsStore } from '../../ems-qualifications/qualifications-store';
import { EmployeeRequestPutDTO } from '../employee-service';
import { LucideAngularModule, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-employees-edit',
  imports: [
    Modal,
    LucideAngularModule
  ],
  templateUrl: './employees-edit.html',
  styleUrl: './employees-edit.css',
})
export class EmployeesEdit {
  readonly XIcon = XIcon;

  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  isModalOpen = signal(false);
  editEmployeeId = signal<number | null>(null);

  firstName = signal('');
  lastName = signal('');
  street = signal('');
  postcode = signal('');
  phone = signal('');
  city = signal('');
  qualifications = this.qualificationsStore.filteredQualifications;
  selectedQualifications = signal<{ id: number; skill: string }[]>([]);

  firstNameValid = computed(() => this.firstName().trim().length > 0);
  lastNameValid = computed(() => this.lastName().trim().length > 0);
  streetValid = computed(() => this.street().trim().length > 0);
  postcodeValid = computed(() => this.postcode().trim().length > 0 && this.postcode().trim().length <= 6);
  phoneValid = computed(() => this.phone().trim().length > 0);
  cityValid = computed(() => this.city().trim().length > 0);
  formValid = computed(() => this.firstNameValid() && this.lastNameValid() && this.streetValid() && this.postcodeValid() && this.phoneValid() && this.cityValid());

  constructor() {
    effect(() => {
      const employeeId = this.editEmployeeId();
      if (employeeId !== null) {
        this.store.selectEmployee(employeeId);
      }
    });

    effect(() => {
      const employee = this.store.selectedEmployee();
      if (employee && this.isModalOpen()) {
        this.firstName.set(employee.firstName || '');
        this.lastName.set(employee.lastName || '');
        this.street.set(employee.street || '');
        this.postcode.set(employee.postcode || '');
        this.phone.set(employee.phone || '');
        this.city.set(employee.city || '');
        this.selectedQualifications.set(employee.skillSet || []);
      }
    });
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.editEmployeeId.set(null);
    this.firstName.set('');
    this.lastName.set('');
    this.street.set('');
    this.postcode.set('');
    this.phone.set('');
    this.city.set('');
    this.selectedQualifications.set([]);
    this.store.clearSelection();
  }

  onAddQualification(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target?.value) return;
    const id = Number(target.value);
    if (!this.selectedQualifications().some(q => q.id === id)) {
      const qual = this.qualifications().find(q => q.id === id);
      if (qual) {
        this.selectedQualifications.set([...this.selectedQualifications(), qual]);
      }
    }
    target.value = '';
  }

  removeQualification(id: number) {
    this.selectedQualifications.set(this.selectedQualifications().filter(q => q.id !== id));
  }

  isQualificationSelected(id: number): boolean {
    return this.selectedQualifications().some(q => q.id === id);
  }

  onSubmit() {
    if (!this.formValid()) return;

    const employeeId = this.editEmployeeId();
    if (employeeId === null) return;

    const dto: EmployeeRequestPutDTO = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      street: this.street(),
      postcode: this.postcode(),
      phone: this.phone(),
      city: this.city(),
      skillSet: this.selectedQualifications().map(q => q.id),
    };
    this.store.update(employeeId, dto);
    this.closeModal();
  }
}
