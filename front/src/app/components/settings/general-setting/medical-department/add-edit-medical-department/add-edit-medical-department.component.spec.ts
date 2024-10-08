import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicalDepartmentComponent } from './add-edit-medical-department.component';

describe('AddEditMedicalDepartmentComponent', () => {
  let component: AddEditMedicalDepartmentComponent;
  let fixture: ComponentFixture<AddEditMedicalDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMedicalDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMedicalDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
