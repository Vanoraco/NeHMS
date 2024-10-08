import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleFormComponent } from './patient-schedule-form.component';

describe('PatientScheduleFormComponent', () => {
  let component: PatientScheduleFormComponent;
  let fixture: ComponentFixture<PatientScheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientScheduleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
