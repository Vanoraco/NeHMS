import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEmployeeRolesComponent } from './add-edit-employee-roles.component';

describe('AddEditEmployeeRolesComponent', () => {
  let component: AddEditEmployeeRolesComponent;
  let fixture: ComponentFixture<AddEditEmployeeRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEmployeeRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEmployeeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
