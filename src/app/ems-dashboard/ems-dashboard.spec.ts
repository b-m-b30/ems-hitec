import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsDashboard } from './ems-dashboard';

describe('EmsDashboard', () => {
  let component: EmsDashboard;
  let fixture: ComponentFixture<EmsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
