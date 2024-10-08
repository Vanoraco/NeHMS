import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAllowanceDeductionComponent } from './add-edit-allowance-deduction.component';

describe('AddEditAllowanceDeductionComponent', () => {
  let component: AddEditAllowanceDeductionComponent;
  let fixture: ComponentFixture<AddEditAllowanceDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAllowanceDeductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAllowanceDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
