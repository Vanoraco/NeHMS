import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInterviewSocratesFormComponent } from './medical-interview-socrates-form.component';

describe('MedicalInterviewSocratesFormComponent', () => {
  let component: MedicalInterviewSocratesFormComponent;
  let fixture: ComponentFixture<MedicalInterviewSocratesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalInterviewSocratesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalInterviewSocratesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
