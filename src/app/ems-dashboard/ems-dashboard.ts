import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeStore } from '../ems-employees/employee-store';
import { QualificationsStore } from '../ems-qualifications/qualifications-store';

@Component({
  selector: 'app-ems-dashboard',
  imports: [RouterLink],
  templateUrl: './ems-dashboard.html',
  styleUrl: './ems-dashboard.css',
})
export class EmsDashboard implements OnInit {
  private readonly employeeStore = inject(EmployeeStore);
  private readonly qualificationsStore = inject(QualificationsStore);

  readonly employees = this.employeeStore.employees;
  readonly qualifications = this.qualificationsStore.qualifications;

  readonly hoveredCard = signal<'employees' | 'qualifications' | null>(null);

  ngOnInit(): void {
    this.employeeStore.load();
    this.qualificationsStore.load();
  }

  setHoveredCard(card: 'employees' | 'qualifications' | null): void {
    this.hoveredCard.set(card);
  }
}
