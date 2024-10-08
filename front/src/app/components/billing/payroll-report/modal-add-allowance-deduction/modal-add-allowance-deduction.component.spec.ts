import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddAllowanceDeductionComponent } from './modal-add-allowance-deduction.component';

describe('ModalAddAllowanceDeductionComponent', () => {
  let component: ModalAddAllowanceDeductionComponent;
  let fixture: ComponentFixture<ModalAddAllowanceDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddAllowanceDeductionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddAllowanceDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
