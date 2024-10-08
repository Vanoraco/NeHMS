import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPatientFormComponent } from './in-patient-form.component';

describe('InPatientFormComponent', () => {
  let component: InPatientFormComponent;
  let fixture: ComponentFixture<InPatientFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InPatientFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
