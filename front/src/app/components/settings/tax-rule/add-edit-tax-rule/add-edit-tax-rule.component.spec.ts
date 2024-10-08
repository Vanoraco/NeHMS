import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaxRuleComponent } from './add-edit-tax-rule.component';

describe('AddEditTaxRuleComponent', () => {
  let component: AddEditTaxRuleComponent;
  let fixture: ComponentFixture<AddEditTaxRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTaxRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTaxRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
