import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionTypeFormComponent } from './admission-type-form.component';

describe('AdmissionTypeFormComponent', () => {
  let component: AdmissionTypeFormComponent;
  let fixture: ComponentFixture<AdmissionTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
