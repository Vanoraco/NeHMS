import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicalInterviewAllergiesComponent } from './add-edit-medical-interview-allergies.component';

describe('AddEditMedicalInterviewAllergiesComponent', () => {
  let component: AddEditMedicalInterviewAllergiesComponent;
  let fixture: ComponentFixture<AddEditMedicalInterviewAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMedicalInterviewAllergiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMedicalInterviewAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
