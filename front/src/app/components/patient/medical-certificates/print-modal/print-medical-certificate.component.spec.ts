import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalCertificatePrintComponent } from './print-medical-certificate.component';

describe('MedicalCertificatePrintComponent', () => {
  let component: MedicalCertificatePrintComponent;
  let fixture: ComponentFixture<MedicalCertificatePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalCertificatePrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalCertificatePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
