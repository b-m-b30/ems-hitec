import {computed, DestroyRef, inject, Injectable, signal} from '@angular/core';
import {
  EmployeeQualificationDTO,
  EmployeeRequestDTO,
  EmployeeRequestPutDTO,
  EmployeeResponseDTO,
  EmployeeService
} from './employee-service';
import {interval, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStore {
  private readonly _employees = signal<EmployeeResponseDTO[]>([]);
  private readonly _selectedEmployee = signal<EmployeeResponseDTO | null>(null);
  private readonly _employeeQualifications =
    signal<EmployeeQualificationDTO[]>([]);

  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  private readonly _firstNameFilter = signal('');
  private readonly _lastNameFilter = signal('');
  private readonly _cityFilter = signal('');
  private readonly _qualificationIdFilter = signal(<number | null>null);

  readonly employees = this._employees.asReadonly();
  readonly selectedEmployee = this._selectedEmployee.asReadonly();
  readonly employeeQualifications = this._employeeQualifications.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly firstNameFilter = this._firstNameFilter.asReadonly();
  readonly lastNameFilter = this._lastNameFilter.asReadonly();
  readonly cityFilter = this._cityFilter.asReadonly();
  readonly qualificationFilter = this._qualificationIdFilter.asReadonly();

  readonly filteredEmployees = computed(() => {
    const first = this._firstNameFilter().toLowerCase().trim();
    const last = this._lastNameFilter().toLowerCase().trim();
    const city = this._cityFilter().toLowerCase().trim();
    const qualId = this._qualificationIdFilter();
    return this._employees()
      .filter(e =>
        (!first || e.firstName.toLowerCase().includes(first)) &&
        (!last || e.lastName.toLowerCase().includes(last)) &&
        (!city || e.city.toLowerCase().includes(city)) &&
        (!qualId || e.skillSet?.some(skill => skill.id === qualId))
      )
      .map(employee => ({
        ...employee,
        skillSet: employee.skillSet
          ? [...employee.skillSet].sort((a, b) => a.skill.localeCompare(b.skill))
          : employee.skillSet
      }));
  });

  private readonly api = inject(EmployeeService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly REFRESH_INTERVAL_MS = 30000;
  private _errorTimeout: any;

  private setError(message: string): void {
    this._error.set(message);
    if (this._errorTimeout) {
      clearTimeout(this._errorTimeout);
    }
    this._errorTimeout = setTimeout(() => {
      this._error.set(null);
      this._errorTimeout = null;
    }, 5000);
  }

  load(): void {
    if (this._loading()) {
      return;
    }

    this._loading.set(true);
    this._error.set(null);

    this.api.getAll().subscribe({
      next: data => {
        this._employees.set(data);
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this.setError(`Fehler beim Laden der Mitarbeiter: ${err.message || err.statusText || 'Unbekannter Fehler'}`);
        this._loading.set(false);
      },
    });
  }

  startPoll(): void {
    interval(this.REFRESH_INTERVAL_MS)
      .pipe(
        startWith(0),
        switchMap(() => this.api.getAll()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: data => this._employees.set(data),
        error: err => {
          console.error(err);
          this._error.set('Fehler beim Polling der Mitarbeiter.');
        },
      });
  }

  create(dto: EmployeeRequestDTO): void {
    this._loading.set(true);

    this.api.postEmployee(dto).subscribe({
      next: employee => {
        this._employees.update(list => [...list, employee]);
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this.setError(`Fehler beim Erstellen des Mitarbeiters: ${err.message || 'Unbekannter Fehler'}`);
        this._loading.set(false);
      },
    });
  }

  update(id: number, dto: EmployeeRequestPutDTO): void {
    this._loading.set(true);

    this.api.putById(id, dto).subscribe({
      next: updated => {
        this._employees.update(list =>
          list.map(e => (e.id === id ? updated : e))
        );

        if (this._selectedEmployee()?.id === id) {
          this._selectedEmployee.set(updated);
        }

        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this.setError('Fehler beim Aktualisieren des Mitarbeiters.');
        this._loading.set(false);
      },
    });
  }

  delete(id: number): void {
    this._loading.set(true);

    this.api.delete(id).subscribe({
      next: () => {
        this._employees.update(list =>
          list.filter(e => e.id !== id)
        );
        this._selectedEmployee.set(null);
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this.setError('Fehler beim Löschen des Mitarbeiters.');
        this._loading.set(false);
      },
    });
  }

  clearFilter(): void {
    this._firstNameFilter.set('');
    this._lastNameFilter.set('');
    this._cityFilter.set('');
    this._qualificationIdFilter.set(null);
  }
  
  selectEmployee(id: number): void {
    this._loading.set(true);

    // Also load qualifications to ensure we have the correct list (sync issue fix)
    this.loadQualifications(id);

    this.api.getById(id).subscribe({
      next: employee => {
        this._selectedEmployee.set(employee);
        this._loading.set(false);
      },
      error: err => {
        console.error(err);
        this.setError('Fehler beim Laden des Mitarbeiters.');
        this._loading.set(false);
      },
    });
  }

  setFirstNameFilter(value: string) {
    this._firstNameFilter.set(value);
  }

  setLastNameFilter(value: string) {
    this._lastNameFilter.set(value);
  }

  setCityFilter(value: string) {
    this._cityFilter.set(value);
  }
  
  loadQualifications(employeeId: number): void {
    this.api.getEmployeeQualificationsById(employeeId).subscribe({
      next: data => this._employeeQualifications.set(data),
      error: err => {
        console.error(err);
        this.setError('Fehler beim Laden der Qualifikationen des Mitarbeiters.');
      },
    });
  }

  addQualification(employeeId: number, skill: string): void {
    this.api
      .postEmployeeNameAndSkillDataById(employeeId, skill)
      .subscribe({
        next: qualification => {
          this.selectEmployee(employeeId);
        },
        error: err => {
          console.error(err);
          const msg = (err.message || '').toLowerCase();
          // Be extra broad with the check for "already has it"
          if (msg.includes('already') && msg.includes('qualification')) {
             this.selectEmployee(employeeId);
             this._error.set(null);
          } else {
             this.setError(`Fehler beim Hinzufügen der Qualifikation: ${err.message || 'Unbekannter Fehler'}`);
          }
        },
      });
  }

  removeQualification(employeeId: number, qualificationId: number): void {
    this.api
      .deleteEmployeeQualificationById(employeeId, qualificationId)
      .subscribe({
        next: () => {
          // Refresh the selected employee to update skillSet, which drives the UI lists
          this.selectEmployee(employeeId);
        },
        error: err => {
          console.error(err);
          this.setError(`Fehler beim Entfernen der Qualifikation: ${err.message || 'Unbekannter Fehler'}`);
        },
      });
  }

  setQualificationFilter(id: number | null) {
    this._qualificationIdFilter.set(id);
  }

  clearError(): void {
    this._error.set(null);
  }

  clearSelection(): void {
    this._selectedEmployee.set(null);
  }
}
