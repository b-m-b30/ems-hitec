import { Component, inject } from '@angular/core';
import { QualificationsFilter } from "./qualifications-filter/qualifications-filter";
import { QualificationsList } from "./qualifications-list/qualifications-list";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QualificationsStore } from './qualifications-store';

@Component({
  selector: 'app-ems-qualifications',
  imports: [QualificationsFilter, QualificationsList, ReactiveFormsModule],
  templateUrl: './ems-qualifications.html',
  styleUrl: './ems-qualifications.css',
})
export class EmsQualifications {

  private readonly qualificationStore = inject(QualificationsStore);

  onAddQualification() {
    if (this.qualificationForm.invalid) {
      return;
    }

    this.qualificationStore.create({ skill: this.qualificationForm.value.skill! });
    this.qualificationForm.reset();
  }

  onDeleteSelected() {
    for (const id of this.qualificationStore.selectedQualifications()) {
      this.qualificationStore.delete(id);
    }
  }

  private readonly fb = inject(FormBuilder);

  qualificationForm = this.fb.group({
    skill: ['', Validators.required],
  })

}
