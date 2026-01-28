import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStore } from './employee-store';

describe('EmployeeStore', () => {
  let component: EmployeeStore;
  let fixture: ComponentFixture<EmployeeStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
