import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidPatientScheduleComponent } from './paid-patient-schedule.component';

describe('PaidPatientScheduleComponent', () => {
  let component: PaidPatientScheduleComponent;
  let fixture: ComponentFixture<PaidPatientScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidPatientScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidPatientScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
