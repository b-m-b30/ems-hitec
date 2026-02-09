import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { EmployeeStore } from '../ems-employees/employee-store';
import { EmployeeRequestDTO } from '../ems-employees/employee-service';
import { QualificationsStore } from '../ems-qualifications/qualifications-store';
import { QualificationGetDTO } from '../ems-qualifications/qualifications-service';
import { LucideAngularModule, PlusIcon, XIcon } from 'lucide-angular';

@Component({
  selector: 'app-ems-assign-qualifications',
  imports: [LucideAngularModule],
  templateUrl: './ems-assign-qualifications.html',
  styleUrl: './ems-assign-qualifications.css',
})
export class EmsAssignQualifications implements OnInit {
  readonly PlusIcon = PlusIcon;
  readonly XIcon = XIcon;
  
  // Use the store instead of direct service access
  readonly employeeStore = inject(EmployeeStore);
  readonly qualificationsStore = inject(QualificationsStore);

  // Expose the signal directly or via a computed property
  employees = this.employeeStore.employees;
  isLoading = computed(() => this.employeeStore.loading() || this.qualificationsStore.loading());
  error = computed(() => this.employeeStore.error() || this.qualificationsStore.error());

  // Computed columns based on selected employee
  // heavily relying on employeeStore.employeeQualifications which is fetched separately
  readonly empQualifications = this.employeeStore.employeeQualifications;

  availableQualifications = computed(() => {
    const allQuals = this.qualificationsStore.qualifications();
    const selectedEmp = this.employeeStore.selectedEmployee();
    const assignedFromStore = this.empQualifications();

    if (!selectedEmp) {
      return [];
    }

    const assignedIds = new Set<number>();

    // 1. Add from detailed list (normalized to numbers)
    // Be extra defensive: check if it's actually an array
    if (Array.isArray(assignedFromStore)) {
      assignedFromStore.forEach((q: any) => {
        if (q && q.id !== undefined) assignedIds.add(Number(q.id));
      });
    }

    // 2. Add from skillSet
    if (selectedEmp.skillSet && Array.isArray(selectedEmp.skillSet)) {
      selectedEmp.skillSet.forEach((item: any) => {
        if (typeof item === 'number') {
          assignedIds.add(item);
        } else if (item && typeof item === 'object' && item.id !== undefined) {
          assignedIds.add(Number(item.id));
        } else if (typeof item === 'string') {
          assignedIds.add(Number(item));
        }
      });
    }

    return allQuals.filter(q => !assignedIds.has(Number(q.id)));
  });

  assignedQualifications = computed(() => {
    const allQuals = this.qualificationsStore.qualifications();
    const selectedEmp = this.employeeStore.selectedEmployee();
    const assignedFromStore = this.empQualifications();

    if (!selectedEmp) {
      return [];
    }

    const assignedIds = new Set<number>();

    if (Array.isArray(assignedFromStore)) {
      assignedFromStore.forEach((q: any) => {
        if (q && q.id !== undefined) assignedIds.add(Number(q.id));
      });
    }

    if (selectedEmp.skillSet && Array.isArray(selectedEmp.skillSet)) {
      selectedEmp.skillSet.forEach((item: any) => {
        if (typeof item === 'number') {
          assignedIds.add(item);
        } else if (item && typeof item === 'object' && item.id !== undefined) {
          assignedIds.add(Number(item.id));
        } else if (typeof item === 'string') {
          assignedIds.add(Number(item));
        }
      });
    }

    return allQuals.filter(q => assignedIds.has(Number(q.id)));
  });

  constructor() {
    effect(() => {
      console.log('Geladene Mitarbeiter:', this.employees());
    });
  }

  ngOnInit(): void {
    // Reset selection when entering this page to ensure lists are empty until a user is picked
    this.employeeStore.clearSelection();
    // Ensure data is loaded
    this.employeeStore.load();
    this.qualificationsStore.load();
  }

  onEmployeeSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const id = Number(target.value);
    if (id) {
      this.employeeStore.selectEmployee(id);
    }
  }

  assignQualification(qualification: QualificationGetDTO) {
    const emp = this.employeeStore.selectedEmployee();
    if (emp && emp.id) {
      this.employeeStore.addQualification(emp.id, qualification.skill);
    }
  }

  unassignQualification(qualification: QualificationGetDTO) {
    const emp = this.employeeStore.selectedEmployee();
    if (emp && emp.id) {
      this.employeeStore.removeQualification(emp.id, qualification.id);
    }
  }

  createTestEmployee() {
    console.log('Test-Mitarbeiter anlegen geklickt');
    const testEmployee: EmployeeRequestDTO = {
      firstName: 'Max',
      lastName: 'Mustermann',
      street: 'Musterstraße 1',
      postcode: '12345',
      city: 'Musterstadt',
      phone: '0123456789',
      skillSet: []
    };
    this.employeeStore.create(testEmployee);
  }
}
