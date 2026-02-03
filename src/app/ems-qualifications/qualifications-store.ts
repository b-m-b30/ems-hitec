import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { QualificationGetDTO, QualificationPostDTO, QualificationsService } from './qualifications-service';
import { QualificationsList } from './qualifications-list/qualifications-list';
import { interval, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class QualificationsStore {
  private readonly _qualifications = signal<QualificationGetDTO[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _filterText = signal<string>('');
  private readonly _selectedQualifications = signal<Set<number>>(new Set<number>())

  readonly qualifications = this._qualifications.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filterText = this._filterText.asReadonly();
  readonly selectedQualifications = this._selectedQualifications.asReadonly();

  readonly filteredQualifications = computed(() => {
    const filter = this._filterText().toLowerCase().trim();
    if (!filter) {
      return this._qualifications();
    }
    return this._qualifications().filter(q =>
      q.skill.toLowerCase().includes(filter)
    );
  });

  readonly count = computed(() => this._qualifications().length);
  readonly filteredCount = computed(() => this.filteredQualifications().length);

  private readonly api = inject(QualificationsService);
  private readonly destroyref = inject(DestroyRef);

  private readonly REFRESH_INTERVAL_MS = 30000;

  load(): void {
    if (this._loading()) {
      return;
    };

    this._loading.set(true);
    this._error.set(null);

    this.api.getAll().subscribe({
      next: data => this._qualifications.set(data),
      error: err => {
        console.error(err);
        this._error.set('Fehler beim Laden der Qualifikationen.');
      },
      complete: () => this._loading.set(false),
    });
  }

  startPoll(): void {
    interval(this.REFRESH_INTERVAL_MS).pipe(
      startWith(0),
      switchMap(() => this.api.getAll()),
      takeUntilDestroyed(this.destroyref)
    ).subscribe({
      next: data => this._qualifications.set(data),
      error: err => {
        console.error(err);
        this._error.set('Fehler beim Polling')
      }
    })
  }

  create(dto : QualificationPostDTO): void {
    this._loading.set(true);

    this.api.create(dto).subscribe({
      next: newQualification => {
        this._qualifications.update(qualifications => [...qualifications, newQualification]);
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this._error.set('Fehler beim Erstellen der Qualifikation.');
        this._loading.set(false);
      }
    })
  }

  update(id: number, dto: QualificationPostDTO): void {
    this._loading.set(true);

    this.api.update(id, dto).subscribe({
      next: updatedQualification => {
        this._qualifications.update(qualifications =>
          qualifications.map(q => q.id === id ? updatedQualification : q)
        );
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this._error.set('Fehler beim Aktualisieren der Qualifikation.');
        this._loading.set(false);
      }
    })
  }

  setFilter(text: string): void {
    this._filterText.set(text);
  }

  clearFilter(): void {
    this._filterText.set('');
  }

  clearError(): void {
    this._error.set(null);
  }

  delete(id: number): void {
    this._loading.set(true);

    this.api.delete(id).subscribe({
      next: () => {
        this._qualifications.update(qualifications =>
          qualifications.filter(q => q.id !== id)
        );
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this._error.set('Fehler beim Löschen der Qualifikation.');
        this._loading.set(false);
      }
    })
  }

  selectQualification(id: number): void {
    this._selectedQualifications.update(set => set.add(id));
  }

  deselectQualification(id: number): void {
    this._selectedQualifications.update(set => {
      set.delete(id);
      return set;
    });
  }
}
