import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyExpenseFormComponent } from './pharmacy-expense-form.component';

describe('PharmacyExpenseFormComponent', () => {
  let component: PharmacyExpenseFormComponent;
  let fixture: ComponentFixture<PharmacyExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyExpenseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
