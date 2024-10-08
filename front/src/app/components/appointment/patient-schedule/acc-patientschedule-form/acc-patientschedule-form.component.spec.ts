import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccPatientscheduleFormComponent } from './acc-patientschedule-form.component';

describe('AccPatientscheduleFormComponent', () => {
  let component: AccPatientscheduleFormComponent;
  let fixture: ComponentFixture<AccPatientscheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccPatientscheduleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccPatientscheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
