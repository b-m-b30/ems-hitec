import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsQualifications } from './ems-qualifications';

describe('EmsQualifications', () => {
  let component: EmsQualifications;
  let fixture: ComponentFixture<EmsQualifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmsQualifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsQualifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
