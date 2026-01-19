import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, interval, startWith, switchMap } from 'rxjs';
import { QualificationGetDTO, QualificationsService } from '../qualifications-service';

@Component({
  selector: 'app-qualifications-list',
  imports: [],
  templateUrl: './qualifications-list.html',
  styleUrl: './qualifications-list.css',
})
export class QualificationsList implements OnInit {
  private readonly qualificationsService = inject(QualificationsService);
  private readonly destroyRef = inject(DestroyRef);

  qualifications = signal<QualificationGetDTO[]>([]);

  private readonly REFRESH_INTERVAL_MS = 30000;

  ngOnInit(): void {
    console.log(localStorage.getItem('access_token'));

    interval(this.REFRESH_INTERVAL_MS)
      .pipe(
        startWith(0),
        switchMap(() => {
          console.log('Polling qualifications...');
          return this.qualificationsService.getAll();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.qualifications.set(data);
      });
  }
}
