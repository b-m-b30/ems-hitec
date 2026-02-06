import { Component, inject, OnInit, signal } from '@angular/core';
import { QualificationsStore } from '../qualifications-store';
import { Modal } from "../../modal/modal";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-qualifications-list',
  imports: [Modal, ReactiveFormsModule],
  templateUrl: './qualifications-list.html',
  styleUrl: './qualifications-list.css',
})
export class QualificationsList implements OnInit {
  private readonly qualificationStore = inject(QualificationsStore);
  private readonly fb = inject(FormBuilder);

  qualifications = this.qualificationStore.filteredQualifications;
  errorMessage = this.qualificationStore.error;
  selectedQualifications = this.qualificationStore.selectedQualifications;
  editQualification = signal<null | number>(null);

  isEditModalOpen = signal(false);

  editForm = this.fb.group({
    skill: [''],
  })

  ngOnInit(): void {
    this.qualificationStore.startPoll();
  }

  onSelectChange(event: Event, id: number): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.qualificationStore.selectQualification(id);
    } else {
      this.qualificationStore.deselectQualification(id);
    }
  }

  onClickDelete(id: number): void {
    this.qualificationStore.delete(id);
  }

  onClickEdit(id: number): void {
    this.editQualification.set(id);
    this.editForm.patchValue({
      skill: this.qualifications().find(q => q.id === id)?.skill || ''
    });
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.isEditModalOpen.set(false);
  }

  onEditConfirm(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.qualificationStore.update(this.editQualification()!, {
      skill: this.editForm.value.skill!
    });
    this.closeEditModal();
    this.editQualification.set(null);
  }
}
