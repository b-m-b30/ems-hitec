import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, interval, startWith, switchMap } from 'rxjs';
import { QualificationGetDTO, QualificationsService } from '../qualifications-service';
import { QualificationsStore } from '../qualifications-store';

@Component({
  selector: 'app-qualifications-list',
  imports: [],
  templateUrl: './qualifications-list.html',
  styleUrl: './qualifications-list.css',
})
export class QualificationsList implements OnInit {
  private readonly qualificationStore = inject(QualificationsStore);
  private readonly destroyRef = inject(DestroyRef);

  qualifications = this.qualificationStore.qualifications;
  errorMessage = this.qualificationStore.error;

  private readonly REFRESH_INTERVAL_MS = 30000;

  ngOnInit(): void {
    this.qualificationStore.startPoll();
  }

  onClickDelete(id: number): void {
    this.qualificationStore.delete(id);
  }
}
