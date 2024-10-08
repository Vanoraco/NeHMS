import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidPatientScheduleComponent } from './unpaid-patient-schedule.component';

describe('UnpaidPatientScheduleComponent', () => {
  let component: UnpaidPatientScheduleComponent;
  let fixture: ComponentFixture<UnpaidPatientScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpaidPatientScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpaidPatientScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
