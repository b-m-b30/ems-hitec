import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationsList } from './qualifications-list';

describe('QualificationsList', () => {
  let component: QualificationsList;
  let fixture: ComponentFixture<QualificationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualificationsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
