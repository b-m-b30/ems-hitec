import {Component, effect, inject, signal} from '@angular/core';
import {EmployeeStore} from '../employee-store';
import {QualificationsStore} from '../../ems-qualifications/qualifications-store';
import {EmployeeRequestDTO} from '../employee-service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Modal} from '../../modal/modal';

@Component({
  selector: 'app-employee-create',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.css'],
})
export class EmployeeCreate {

  private readonly store = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);
  private readonly fb = inject(FormBuilder);

  isModalOpen = signal(false);
  isErrorModalOpen = signal(false);

  employeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    qualifications: [[] as number[]]
  });

  qualifications = this.qualificationsStore.filteredQualifications;

  errorMessage = this.store.error;

  selectedQualifications = signal<{ id: number; skill: string }[]>([]);


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
    this.employeeForm.reset({firstName: '', lastName: '', city: '', qualifications: []});
    this.selectedQualifications.set([]);
  }

  closeErrorModal() {
    this.isErrorModalOpen.set(false);
    this.store.clearError();
  }

  onAddQualification(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (!target?.value) return;

    const id = Number(target.value);
    const current = this.employeeForm.value.qualifications!;
    if (!current.includes(id)) {
      this.employeeForm.patchValue({qualifications: [...current, id]});

      const qual = this.qualificationsStore.filteredQualifications().find(q => q.id === id);
      if (qual) {
        this.selectedQualifications.update(list => [...list, qual]);
      }
    }
    target.value = '';
  }

  removeQualification(id: number) {
    const current = this.employeeForm.value.qualifications!;
    this.employeeForm.patchValue({qualifications: current.filter(qId => qId !== id)});

    this.selectedQualifications.update(list => list.filter(q => q.id !== id));
  }

  onSubmit() {
    if (this.employeeForm.invalid) return;

    const dto: EmployeeRequestDTO = {
      firstName: this.employeeForm.value.firstName!,
      lastName: this.employeeForm.value.lastName!,
      city: this.employeeForm.value.city!,
      street: '–',
      postcode: '00000',
      phone: '–',
      skillSet: this.employeeForm.value.qualifications!,
    };

    this.store.create(dto);

    this.closeModal();
  }
}
