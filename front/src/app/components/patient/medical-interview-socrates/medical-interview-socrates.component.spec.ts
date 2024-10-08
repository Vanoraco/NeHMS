import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInterviewSocratesComponent } from './medical-interview-socrates.component';

describe('MedicalInterviewSocratesComponent', () => {
  let component: MedicalInterviewSocratesComponent;
  let fixture: ComponentFixture<MedicalInterviewSocratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalInterviewSocratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalInterviewSocratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
