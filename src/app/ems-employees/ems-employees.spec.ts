import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsEmployees } from './ems-employees';

describe('EmsEmployees', () => {
  let component: EmsEmployees;
  let fixture: ComponentFixture<EmsEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmsEmployees]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsEmployees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
