import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleDetailComponent } from './patient-schedule-detail.component';

describe('PatientScheduleDetailComponent', () => {
  let component: PatientScheduleDetailComponent;
  let fixture: ComponentFixture<PatientScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientScheduleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
