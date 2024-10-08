import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceDeductionTypeComponent } from './allowance-deduction-type.component';

describe('AllowanceDeductionTypeComponent', () => {
  let component: AllowanceDeductionTypeComponent;
  let fixture: ComponentFixture<AllowanceDeductionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowanceDeductionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowanceDeductionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
