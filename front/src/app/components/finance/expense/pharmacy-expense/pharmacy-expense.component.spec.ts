import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyExpenseComponent } from './pharmacy-expense.component';

describe('PharmacyExpenseComponent', () => {
  let component: PharmacyExpenseComponent;
  let fixture: ComponentFixture<PharmacyExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyExpenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
