import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsFilter } from './qualifications-filter';

describe('QualificationsFilter', () => {
  let component: QualificationsFilter;
  let fixture: ComponentFixture<QualificationsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
