import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsHome } from './ems-home';

describe('EmsHome', () => {
  let component: EmsHome;
  let fixture: ComponentFixture<EmsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmsHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
