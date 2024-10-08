import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicalCertificatesComponent } from './add-edit-medical-certificates.component';

describe('AddEditMedicalCertificatesComponent', () => {
  let component: AddEditMedicalCertificatesComponent;
  let fixture: ComponentFixture<AddEditMedicalCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMedicalCertificatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMedicalCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
