import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAllowanceDeductionTypeComponent } from './add-edit-allowance-deduction-type.component';

describe('AddEditAllowanceDeductionTypeComponent', () => {
  let component: AddEditAllowanceDeductionTypeComponent;
  let fixture: ComponentFixture<AddEditAllowanceDeductionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAllowanceDeductionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAllowanceDeductionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
