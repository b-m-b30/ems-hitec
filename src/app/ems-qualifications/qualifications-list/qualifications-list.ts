import { Component, inject, OnInit, signal } from '@angular/core';
import { QualificationsStore } from '../qualifications-store';

@Component({
  selector: 'app-qualifications-list',
  imports: [],
  templateUrl: './qualifications-list.html',
  styleUrl: './qualifications-list.css',
})
export class QualificationsList implements OnInit {
  private readonly qualificationStore = inject(QualificationsStore);

  qualifications = this.qualificationStore.filteredQualifications;
  errorMessage = this.qualificationStore.error;
  selectedQualifications = this.qualificationStore.selectedQualifications;

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
}
