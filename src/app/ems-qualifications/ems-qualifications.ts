import { Component, inject } from '@angular/core';
import { QualificationsFilter } from "./qualifications-filter/qualifications-filter";
import { QualificationsList } from "./qualifications-list/qualifications-list";
import { FormBuilder, Validators } from '@angular/forms';
import { QualificationPostDTO, QualificationsService } from './qualifications-service';
import { switchMap } from 'rxjs';
import { QualificationsStore } from './qualifications-store';

@Component({
  selector: 'app-ems-qualifications',
  imports: [QualificationsFilter, QualificationsList],
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

  private readonly fb = inject(FormBuilder);

  qualificationForm = this.fb.group({
    skill: ['', Validators.required],
  })

}
