import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInterviewAllergiesComponent } from './medical-interview-allergies.component';

describe('MedicalInterviewAllergiesComponent', () => {
  let component: MedicalInterviewAllergiesComponent;
  let fixture: ComponentFixture<MedicalInterviewAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalInterviewAllergiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalInterviewAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
