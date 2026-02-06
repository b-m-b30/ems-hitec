import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesEdit } from './employees-edit';

describe('EmployeesEdit', () => {
  let component: EmployeesEdit;
  let fixture: ComponentFixture<EmployeesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
