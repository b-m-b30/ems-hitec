import { Component, inject, signal, effect, computed } from '@angular/core';
import { QualificationsFilter } from "./qualifications-filter/qualifications-filter";
import { QualificationsList } from "./qualifications-list/qualifications-list";
import { QualificationsStore } from './qualifications-store';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-ems-qualifications',
  imports: [QualificationsFilter, QualificationsList, Modal],
  templateUrl: './ems-qualifications.html',
  styleUrl: './ems-qualifications.css',
})
export class EmsQualifications {
  private readonly qualificationStore = inject(QualificationsStore);

  isModalOpen = signal(false);
  isErrorModalOpen = signal(false);

  skill = signal('');
  skillValid = computed(() => this.skill().trim().length > 0);

  jsonImportText = signal('');
  errorMessage = this.qualificationStore.error;

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
    this.skill.set('');
    this.jsonImportText.set('');
  }

  closeErrorModal() {
    this.isErrorModalOpen.set(false);
    this.qualificationStore.clearError();
  }

  onCreateQualification() {
    if (!this.skillValid()) {
      return;
    }
    this.qualificationStore.create({ skill: this.skill() });
    this.closeModal();
  }

  onImportJson() {
    try {
      const data = JSON.parse(this.jsonImportText());
      if (Array.isArray(data)) {
        let importedCount = 0;
        for (const item of data) {
          const skill = item.skill;
          if (skill) {
            this.qualificationStore.create({ skill });
            importedCount++;
          }
        }
        if (importedCount > 0) {
          this.jsonImportText.set('');
          this.closeModal();
        }
      } else if (data.skill) {
        this.skill.set(data.skill);
        this.jsonImportText.set('');
      }
    } catch (e) {
      console.error('Invalid JSON', e);
    }
  }

  onDeleteSelected() {
    for (const id of this.qualificationStore.selectedQualifications()) {
      this.qualificationStore.delete(id);
    }
  }
}
