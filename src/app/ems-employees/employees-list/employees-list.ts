import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {catchError, interval, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EmployeeResponseDTO, EmployeeService} from '../employee-service';

@Component({
  selector: 'app-employees-list',
  imports: [],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.css',
})
export class EmployeesList implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly destroyRef = inject(DestroyRef);

  employees = signal<EmployeeResponseDTO[]>([]);

  private readonly REFRESH_INTERVAL_MS = 30000;

  ngOnInit(): void {
    console.log(localStorage.getItem('access_token'));

    interval(this.REFRESH_INTERVAL_MS)
      .pipe(
        startWith(0),
        switchMap(() => {
          console.log('Polling employees...');
          return this.employeeService.getAll();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this.employees.set(data);
      });
  }
}
